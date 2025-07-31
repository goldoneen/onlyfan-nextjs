"use client";

import { useState, useEffect, useCallback } from "react";
import { ModelCard } from "../components/FeaturedModels"; 

export default function BestModesPage() {
  
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 40; 

  // useCallback to memoize the fetch function and prevent unnecessary re-creations
  const fetchModelsByPrice = useCallback(
    async (skip = 0) => {
      try {
        const res = await fetch("/api/best-models", { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skip, limit: LIMIT }), 
        });
        const data = await res.json();

        if (res.ok) {
          return data.models || [];
        } else {
          console.error("Error from API:", data.error);
          return [];
        }
      } catch (error) {
        console.error("Failed to fetch models by price:", error);
        return [];
      }
    },
    [] 
  );

  // useEffect for initial data load
  useEffect(() => {
    setLoading(true);
    fetchModelsByPrice(0).then((initialModels) => {
      setModels(initialModels);
      setHasMore(initialModels.length === LIMIT); 
      setLoading(false);
    });
  }, [fetchModelsByPrice]); 

  // Handler for "Load More" button
  const handleLoadMore = async () => {
    setLoadingMore(true);
    const moreModels = await fetchModelsByPrice(models.length); 
    setModels((prev) => [...prev, ...moreModels]); 
    setHasMore(moreModels.length === LIMIT); 
    setLoadingMore(false);
  };

  return (
    <section className="pb-12 bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] min-h-screen">
      <div className="bg-white py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-center">OnlyFans Models in Best Models</h1>
        <h1 className="text-xl font-medium mb-8 text-center">Discover OnlyFans creators near you in Best Models</h1>
      </div>

      <div className="container mx-auto">
        {loading ? (
          <div className="text-center text-lg text-gray-500 py-8">Loading models...</div>
        ) : models.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {models.map((model, idx) => (
                // Using profile_url as a more stable key if available, otherwise fallback
                <ModelCard key={model.profile_url || model.model_name + idx} model={model} />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-full font-semibold text-lg shadow hover:from-blue-500 hover:to-cyan-600 transition-all duration-300"
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-lg text-gray-500 py-8">No paid models found.</div>
        )}
      </div>
    </section>
  );
}
