'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AffiliateButton from './AffiliateButton';

// A simple utility function to get a cookie value by name
const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// A simple utility function to set a cookie
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

// The ModelCard component
export function ModelCard({ model }) {
  // Use model's id as a unique identifier for the wishlist
  const modelId = model.id || model.model_name;
  const [isFavorite, setIsFavorite] = useState(false);

  // useEffect to load the wishlist state from the cookie when the component mounts
  useEffect(() => {
    try {
      const wishlistCookie = getCookie('wishlist');
      if (wishlistCookie) {
        const wishlist = JSON.parse(decodeURIComponent(wishlistCookie));
        setIsFavorite(wishlist.includes(modelId));
      }
    } catch (e) {
      console.error("Failed to parse wishlist cookie:", e);
      setIsFavorite(false);
    }
  }, [modelId]);

  const handleFavoriteClick = (e) => {
    // Prevent the click from triggering any other events on the card
    e.stopPropagation();

    // Get the current wishlist from the cookie or an empty array if none exists
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
    let newIsFavorite;

    if (isFavorite) {
      // If it's already a favorite, remove it from the list
      newWishlist = wishlist.filter(id => id !== modelId);
      newIsFavorite = false;
    } else {
      // If it's not a favorite, add it to the list
      newWishlist = [...wishlist, modelId];
      newIsFavorite = true;
    }

    // Save the updated wishlist back to the cookie
    const cookieValue = JSON.stringify(newWishlist);
    setCookie('wishlist', encodeURIComponent(cookieValue), 30); // Set cookie for 30 days

    // Update the local state to change the icon
    setIsFavorite(newIsFavorite);
    console.log(`Model ${model.model_name || model.name} is now ${newIsFavorite ? 'favorited' : 'not favorited'}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 relative">
      <div className="relative h-80 w-full">
        {/* Placeholder for the image - to be replaced with actual images */}
        {model.image_url ? (
          <img src={model.image_url} alt={model.model_name || model.name} className="object-cover w-full h-full" />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Image placeholder</span>
          </div>
        )}

        {/* Wishlist Heart Icon */}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-70 backdrop-blur-sm hover:bg-opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Toggle wishlist"
        >
          {isFavorite ? (
            // Filled heart icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            // Stroked heart icon
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
}

// Données de démonstration for FeaturedModels component
const featuredModelsData = [
  {
    id: 1,
    name: 'Your princess �',
    username: '@yoourpriincess',
    description: 'I really want to find a love as strong as the ones in books and prove to the world that it exists 🥰',
    image: '/models/model1.jpg',
    price: 'FREE',
    affiliateUrl: 'https://onlyfans.com/yoourpriincess/c346'
  },
  {
    id: 2,
    name: 'Baby Riley',
    username: '@baby_riley',
    description: 'Hey there! I\'m Riley. Natural beauty and shiny smile are things to describe me 💖',
    image: '/models/model2.jpg',
    price: 'FREE',
    affiliateUrl: 'https://onlyfans.com/baby_riley'
  },
  {
    id: 3,
    name: 'Katya Sun 💋',
    username: '@katyasun',
    description: 'Subscribe to my profile and become a part of my exciting life! 🤗',
    image: '/models/model3.jpg',
    price: 'FREE',
    affiliateUrl: 'https://onlyfans.com/katyasun'
  }
];

export default function FeaturedModels() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Models</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check out our most popular creators
          </p>
          <div className="mt-4">
            <a 
              href="/best-models" 
              className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center transition-colors"
            >
              View All Models
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredModelsData.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>
    </section>
  );
}
