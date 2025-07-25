'use client';

import { useState } from 'react';
import Image from 'next/image';
import AffiliateButton from './AffiliateButton';

// Données de démonstration pour les modèles en vedette
const featuredModelsData = [
  {
    id: 1,
    name: 'Your princess 👑',
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
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
              href="/best" 
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
            <div key={model.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-80 w-full">
                {/* Placeholder pour l'image - à remplacer par de vraies images */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
                <div className="absolute top-4 right-4 z-20">
                  <button 
                    onClick={() => toggleFavorite(model.id)}
                    className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    {favorites[model.id] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Image placeholder</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{model.name}</h3>
                    <p className="text-blue-500">{model.username}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {model.price}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {model.description}
                </p>
                
                <div className="mt-4">
                  <AffiliateButton 
                    text="View Profile" 
                    variant="primary" 
                    size="medium"
                    customUrl={model.affiliateUrl}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
