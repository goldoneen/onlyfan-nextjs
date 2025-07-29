'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AffiliateButton from './AffiliateButton';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const selectRef = useRef(null);
  const router = useRouter();

  // Fetch categories when input is focused
  const handleInputFocus = async () => {
    setShowSelect(true);
    if (categories.length === 0) {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        setCategories([]);
      }
    }
  };

  // Hide select when clicking outside
  const handleBlur = (e) => {
    setTimeout(() => setShowSelect(false), 150);
  };

  // Slugify category for URL
  const slugify = (cat) =>
    cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // When a category is selected, navigate to the new page
  const handleCategorySelect = (cat) => {
    setSearchQuery(cat);
    setShowSelect(false);
    const slug = slugify(cat);
    router.push(`/best-${slug}-onlyfans`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Logique de recherche à implémenter
    console.log('Recherche pour:', searchQuery);
  };

  return (
    <section className="pt-16 pb-12 px-4 bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge de type */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              ONLYFANS FINDER • SEARCH ENGINE
            </span>
          </div>
          {/* Titre principal */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            OnlyFans Search Finder: The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Ultimate</span>
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">OnlyFans Account Finder</span> &
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Search Engine
          </h1>
          {/* Sous-titre */}
          <p className="text-xl mb-8 text-gray-600">
            Search by name, username, category, location or interests
          </p>
          {/* Barre de recherche */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Try 'asian', 'blonde milf', 'New York', 'tattoo'..."
              className="w-full px-6 py-4 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleBlur}
              autoComplete="off"
            />
            {showSelect && categories.length > 0 && (
              <div
                ref={selectRef}
                className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
              >
                {categories.map((cat, idx) => (
                  <div
                    key={cat + idx}
                    className="px-6 py-2 hover:bg-blue-100 cursor-pointer text-left"
                    onMouseDown={() => handleCategorySelect(cat)}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white p-3 rounded-full hover:shadow-lg transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
