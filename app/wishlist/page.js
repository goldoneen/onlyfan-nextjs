"use client";

import { useState, useEffect } from "react";
import AffiliateButton from '../components/AffiliateButton';

const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const setCookie = (name, value, days) => {
  if (typeof document === 'undefined') return;
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${value}${expires}; path=/; SameSite=Strict`;
};

const ModelCard = ({ model, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(true);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    onToggleFavorite(model, newIsFavorite);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 relative">
      <div className="relative h-80 w-full">
        {model.image_url ? (
          <img src={model.image_url} alt={model.model_name || model.name} className="object-cover w-full h-full" />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Image placeholder</span>
          </div>
        )}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-70 backdrop-blur-sm hover:bg-opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Toggle wishlist"
        >
          {isFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>
      <div className="p-6 flex flex-col justify-between"> 
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex-grow min-w-0 pr-2">
              <h3 className="text-xl font-bold truncate">{model.model_name || model.name}</h3>
              <p className="text-blue-500">{model.text_small || model.username}</p>
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0">
              {model.price}
            </span>
          </div>
          <p className="text-gray-600 line-clamp-2 min-h-12">
            {model.model_description || model.description || '\u00A0'} 
          </p>
        </div>
        <div className="mt-auto pt-4"> 
          <AffiliateButton
            text="View Profile"
            variant="primary"
            size="medium"
            obfuscatedUrl={model.affiliateUrl || '#'}
            className="w-full"
            profile={model.profile || '#'}
          />
        </div>
      </div>
    </div>
  );
};

export default function WishlistPage() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlistModels = async (modelIds) => {
    try {
      if (modelIds.length > 0) {
        const res = await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ modelIds }),
        });
        const data = await res.json();
        if (res.ok) {
          return data.models || [];
        } else {
          console.error("Error from API:", data.error);
          return [];
        }
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch wishlist models:", error);
      return [];
    }
  };

  // Handler for when a model's favorite status is toggled
  const handleToggleFavorite = (model, isNowFavorite) => {
    const modelId = model.id || model.model_name;

    let wishlist = [];
    try {
      const wishlistCookie = getCookie('wishlist');
      if (wishlistCookie) {
        wishlist = JSON.parse(decodeURIComponent(wishlistCookie));
      }
    } catch (e) {
      console.error("Failed to parse wishlist cookie, resetting:", e);
      wishlist = [];
    }

    let newWishlist;
    if (isNowFavorite) {
      newWishlist = [...wishlist, modelId];
    } else {
      newWishlist = wishlist.filter(id => id !== modelId);
      setModels(prevModels => prevModels.filter(m => (m.id || m.model_name) !== modelId));
    }

    // Save the updated wishlist back to the cookie
    const cookieValue = JSON.stringify(newWishlist);
    setCookie('wishlist', encodeURIComponent(cookieValue), 30);
  };

  // useEffect for initial data load
  useEffect(() => {
    setLoading(true);
    const wishlistCookie = getCookie('wishlist');
    const modelIds = wishlistCookie ? JSON.parse(decodeURIComponent(wishlistCookie)) : [];
    fetchWishlistModels(modelIds).then((fetchedModels) => {
      setModels(fetchedModels);
      setLoading(false);
    });
  }, []);

  return (
    <section className="pb-12 bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] min-h-screen">
      <div className="bg-white py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-center">OnlyFans Models in Your Wishlist</h1>
        <h1 className="text-xl font-medium mb-8 text-center">Your curated list of creators to follow.</h1>
      </div>

      <div className="container mx-auto">
        {loading ? (
          <div className="text-center text-lg text-gray-500 py-8">Loading your wishlist...</div>
        ) : models.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {models.map((model, idx) => {
              const modelId = model.id || model.model_name || idx;
              return (
                <ModelCard 
                  key={modelId} 
                  model={model} 
                  onToggleFavorite={handleToggleFavorite} 
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center text-lg text-gray-500 py-8">
            <p>Your wishlist is empty.</p>
            <p className="mt-2">Go to the <a href="/best" className="text-blue-500 hover:text-blue-700 font-medium">all models page</a> to add some models!</p>
          </div>
        )}
      </div>
    </section>
  );
}
