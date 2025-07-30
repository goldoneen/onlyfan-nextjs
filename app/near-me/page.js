"use client";

import { useState, useEffect, useCallback } from "react";
import countryList from "../utils/countryList"; // Ensure this path is correct
import { ModelCard } from "../components/FeaturedModels"; // Ensure this path is correct

// Helper function (unchanged)
function slugifyCountry(country) {
  return country.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function NearMePage() {
  // State variables
  const [detectedCountry, setDetectedCountry] = useState(""); // Country detected by geolocation
  const [detecting, setDetecting] = useState(false); // True while geolocation is in progress
  const [error, setError] = useState(""); // Stores any error messages
  const [selectedCountry, setSelectedCountry] = useState(""); // The country explicitly chosen or confirmed
  const [showModal, setShowModal] = useState(false); // Controls visibility of the country selection modal
  const [models, setModels] = useState([]); // Stores the list of models
  const [loading, setLoading] = useState(false); // True while initial models are loading
  const [loadingMore, setLoadingMore] = useState(false); // True while subsequent models are loading ("Load more" button)
  const [hasMore, setHasMore] = useState(true); // True if there's potentially more data to load

  // Memoized function to fetch models for a given country
  const fetchModels = useCallback(
    async (country, skip = 0, limit = 40) => { // Default limit for subsequent loads is 40
      if (!country) return [];
      const res = await fetch("/api/location-models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: country, skip, limit }),
      });
      const data = await res.json();
      // IMPORTANT: If your backend consistently returns 15 models when 40 are requested,
      // the issue is in your /api/location-models backend endpoint.
      // Ensure your backend code respects the 'limit' parameter and fetches the requested number of models.
      return data.models || [];
    },
    []
  );

  // Function to handle location detection using browser's Geolocation API
  const handleUseMyLocation = useCallback(async () => {
    setDetecting(true);
    setError("");
    setModels([]); // Clear any previously loaded models
    setSelectedCountry(""); // Clear selected country until detection is confirmed
    setHasMore(true); // Reset hasMore state

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setDetecting(false);
      setShowModal(true); // Open modal for manual selection if geolocation is not supported
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Reverse geocoding using OpenStreetMap Nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            { headers: { "Accept-Language": "en" } }
          );
          const data = await res.json();
          const country = data.address?.country;

          if (country) {
            setDetectedCountry(country);
            if (countryList.includes(country)) {
              setSelectedCountry(country); // Set as selected, which will trigger initial model load via useEffect
              setShowModal(false);
              setError("");
            } else {
              setError("Detected country is not supported. Please choose your country manually.");
              setShowModal(true);
            }
          } else {
            setError("Could not detect country from your location.");
            setShowModal(true);
          }
        } catch (err) {
          console.error("Geolocation reverse lookup failed:", err);
          setError("Failed to detect location. Please choose manually.");
          setShowModal(true);
        } finally {
          setDetecting(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Failed to get your location. Please choose manually.");
        setDetecting(false);
        setShowModal(true);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, [countryList]);

  // Effect to call handleUseMyLocation when the component mounts
  useEffect(() => {
    handleUseMyLocation();
  }, [handleUseMyLocation]);

  // Function to handle manual country selection from the modal
  const handleCountrySelect = (country) => {
    setSelectedCountry(country); // Set the manually selected country, which will trigger initial model load via useEffect
    setShowModal(false);
    setError("");
    setModels([]); // Clear models when a new country is selected
    setHasMore(true); // Reset hasMore for the new country
  };

  // NEW: Effect to automatically load the first 20 models when selectedCountry changes
  useEffect(() => {
    if (!selectedCountry) {
      setModels([]);
      setHasMore(false);
      return;
    }

    setLoading(true); // Set loading for the initial fetch
    setModels([]); // Clear previous models
    setHasMore(true); // Reset hasMore for new country

    // Fetch the first 20 models automatically
    fetchModels(selectedCountry, 0, 20) // Requesting 20 models for the initial load
      .then((initialModels) => {
        setModels(initialModels);
        // If we got fewer than 20 models, there might not be more
        setHasMore(initialModels.length === 20);
        setLoading(false); // Reset loading state
      })
      .catch(err => {
        console.error("Error fetching initial models:", err);
        setLoading(false);
        setError("Failed to load models for this country.");
      });
  }, [selectedCountry, fetchModels]); // Trigger this effect when selectedCountry or fetchModels changes

  // This function now handles ONLY subsequent "Load more" clicks
  const handleLoadMore = async () => {
    // Prevent multiple simultaneous loads or loading if no country is selected
    if (!selectedCountry || loading || loadingMore || !hasMore) return;

    setLoadingMore(true); // Set loading more state

    try {
      // For subsequent loads, request 40 models
      const fetchedModels = await fetchModels(selectedCountry, models.length, 40);
      setModels((prev) => [...prev, ...fetchedModels]); // Append new models
      setHasMore(fetchedModels.length === 40); // Update hasMore based on fetched count
    } catch (err) {
      console.error("Error loading more models:", err);
      setError("Failed to load more models.");
      setHasMore(false); // Assume no more data on error
    } finally {
      setLoadingMore(false); // Reset loading more state
    }
  };

  // Removed: Infinite scroll logic (useEffect that listens for scroll events)
  // This functionality is now entirely removed as per your request.

  return (
    <section className="pb-12 bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] min-h-screen">
      <div className="bg-white py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-center">Find OnlyFans Models Near You</h1>
        <div className="flex flex-col sm:flex-row items-center py-6 justify-center gap-4">
          <div>
            <button
              onClick={handleUseMyLocation}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-bold text-xl shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200"
              disabled={detecting}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {detecting ? "Detecting..." : "Use My Location"}
            </button>
          </div>
          <div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-400 text-blue-500 rounded-full font-bold text-xl shadow hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {selectedCountry ? `Choose Location (${selectedCountry})` : "Choose Location"}
            </button>
          </div>
        </div>

        {error && <div className="text-red-500 mb-4 text-lg font-semibold">{error}</div>}
        {detectedCountry && (
          <div className="mb-4 text-blue-700 font-bold text-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Detected country: {detectedCountry}
          </div>
        )}
      </div>

      <div className="container mx-auto">
        {/* Modal for country selection */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-center">Select your country</h2>
              <div className="max-h-80 overflow-y-auto">
                {countryList.map((country) => (
                  <button
                    key={country}
                    onClick={() => handleCountrySelect(country)}
                    className={`block w-full text-left px-4 py-2 rounded-lg mb-1 hover:bg-blue-100 focus:bg-blue-200 transition-colors ${selectedCountry === country ? 'bg-blue-200 font-semibold' : ''}`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Models grid and load more button */}
        {selectedCountry ? ( // Only show this section if a country is selected
          <div className="mt-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">OnlyFans Models in {selectedCountry}</h2>
              <p className="text-lg text-gray-600">Discover OnlyFans creators near you in {selectedCountry}</p>
            </div>

            {loading ? ( // Show initial loading spinner
              <div className="text-center text-lg text-gray-500 py-8">Loading models...</div>
            ) : models.length > 0 ? ( // Show models grid if models are loaded
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  {models.map((model, idx) => (
                    <ModelCard key={model.model_name + (model.id || idx)} model={model} />
                  ))}
                </div>
                {hasMore && ( // Show "Load more" button if there's potentially more data
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleLoadMore} // Now explicitly calls handleLoadMore for subsequent loads
                      className="px-8 py-3 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-full font-semibold text-lg shadow hover:from-blue-500 hover:to-cyan-600 transition-all duration-300"
                      disabled={loadingMore || loading} // Disable if any loading is in progress
                    >
                      {loadingMore ? "Loading..." : "Load more"}
                    </button>
                  </div>
                )}
              </>
            ) : ( // No models found after initial load attempt, and no more expected (hasMore is false)
              <div className="text-center text-lg text-gray-500 py-8">No models found for {selectedCountry}.</div>
            )}
          </div>
        ) : ( // If no country is selected yet
          <div className="text-center text-lg text-gray-500 py-8">
            Please use your location or choose a country to find models.
          </div>
        )}
      </div>
    </section>
  );
}
