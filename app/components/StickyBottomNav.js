"use client";

import { useState } from 'react';
import Link from 'next/link';
import SearchModal from './SearchModal'; // Import the new SearchModal component

export default function StickyBottomNav() {
  const [activeTab, setActiveTab] = useState('search'); // Initial active tab
  const [showSearchModal, setShowSearchModal] = useState(false); // State to control modal visibility

  // Function to handle opening the search modal
  const handleSearchClick = (e) => {
    e.preventDefault(); // Prevent Link from navigating immediately
    setShowSearchModal(true);
    setActiveTab('search'); // Set active tab to search
  };

  // Function to handle closing the search modal
  const handleCloseSearchModal = () => {
    setShowSearchModal(false);
  };

  // Function to handle regular link clicks (for other tabs)
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
          {/* Search Link - now opens the modal */}
          <Link 
            href="/search" // Keep href for accessibility/SEO, but onClick handles navigation
            className={`flex flex-col items-center justify-center w-1/4 h-full ${activeTab === 'search' ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={handleSearchClick} // Call the handler to open modal
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs mt-1">Search</span>
          </Link>
          
          {/* Near Me Link */}
          <Link 
            href="/near-me"
            className={`flex flex-col items-center justify-center w-1/4 h-full ${activeTab === 'near-me' ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleTabClick('near-me')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs mt-1">Near Me</span>
          </Link>
          
          {/* Best Link */}
          <Link 
            href="/best"
            className={`flex flex-col items-center justify-center w-1/4 h-full ${activeTab === 'best' ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleTabClick('best')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="text-xs mt-1">Best</span>
          </Link>
          
          {/* Wishlist Link */}
          <Link 
            href="/wishlist"
            className={`flex flex-col items-center justify-center w-1/4 h-full ${activeTab === 'wishlist' ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleTabClick('wishlist')}
          >
            <svg className="w-6 h-6 sm:w-6 sm:h-6 text-red-200 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            {/* <span className="text-xs mt-1">Wishlist</span> */}
          </Link>
        </div>
      </div>

      {/* Render the SearchModal component */}
      <SearchModal showModal={showSearchModal} onClose={handleCloseSearchModal} />
    </>
  );
}
