"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchModal({ showModal, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const selectRef = useRef(null);
  const inputRef = useRef(null); // Added ref for the input
  const router = useRouter();

  // Fetch categories when input is focused or component mounts if needed
  const fetchCategories = useCallback(async () => {
    if (categories.length === 0) {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
      }
    }
  }, [categories.length]);

  // Handle input focus to show categories
  const handleInputFocus = () => {
    setShowSelect(true);
    fetchCategories(); // Fetch categories when input is focused
  };

  // Handle input blur to hide categories, with a delay to allow click on options
  const handleInputBlur = (e) => {
    // Check if the related target is within the select dropdown
    // This is crucial to prevent the dropdown from closing immediately when clicking an option
    if (selectRef.current && selectRef.current.contains(e.relatedTarget)) {
      return; // Do not hide if related target is inside the dropdown
    }
    setTimeout(() => setShowSelect(false), 150);
  };

  // Slugify category for URL (utility function, could be moved to a utils file)
  const slugify = (cat) =>
    cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // When a category is selected, navigate to the new page and close modal
  const handleCategorySelect = (cat) => {
    setSearchQuery(cat); // Set search query to selected category
    setShowSelect(false);
    onClose(); // Close the modal
    const slug = slugify(cat);
    router.push(`/best-${slug}-onlyfans`);
  };

  // Handle general search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onClose(); // Close the modal
      router.push(`/search/?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Effect to focus the input when the modal opens
  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);


  if (!showModal) return null; // Don't render if not visible

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose}>
      <div 
        // Adjusted max-w-md to max-w-xl and added lg:max-w-2xl for wider modal on larger screens
        className="bg-white rounded-xl shadow-2xl p-6 max-w-xl lg:max-w-2xl w-full mx-4 relative transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Search OnlyFans</h2>

        <form onSubmit={handleSearch} className="relative">
          <input
            ref={inputRef} // Assign ref to the input
            type="text"
            placeholder="Try 'asian', 'blonde milf', 'New York', 'tattoo'..."
            className="w-full px-6 py-4 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none text-lg transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur} // Changed to handleInputBlur
            autoComplete="off"
          />
          {/* CRITICAL FIX: Directly control visibility and animation based on showSelect state */}
          {showSelect && categories.length > 0 && (
            <div
              ref={selectRef}
              className={`absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 
                ${showSelect ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
              style={{ top: 'calc(100% + 8px)' }} // Position below the input
            >
              {categories.map((cat, idx) => (
                <div
                  key={cat + idx}
                  className="px-6 py-3 hover:bg-blue-100 cursor-pointer text-left text-gray-700 transition-colors duration-150"
                  onMouseDown={() => handleCategorySelect(cat)} // Use onMouseDown to trigger before onBlur
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-3 rounded-full hover:from-blue-600 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
