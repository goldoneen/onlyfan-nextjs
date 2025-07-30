'use client';

import { useState } from 'react';
import Image from 'next/image';
import AffiliateButton from './AffiliateButton';

export function ModelCard({ model }) {

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-80 w-full">
        {/* Placeholder for the image - to be replaced with actual images */}
        {model.image_url ? (
          <img src={model.image_url} alt={model.model_name || model.name} className="object-cover w-full h-full" />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Image placeholder</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col justify-between"> 
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex-grow min-w-0 pr-2"> {/* Added flex-grow, min-w-0, and pr-2 */}
              <h3 className="text-xl font-bold truncate">{model.model_name || model.name}</h3>
              <p className="text-blue-500">{model.text_small || model.username}</p>
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0"> {/* Added flex-shrink-0 */}
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
            // profile="https://onlyfans.com/bosnianprincessx"
          />
        </div>
      </div>
    </div>
  );
}

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
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>
    </section>
  );
}
