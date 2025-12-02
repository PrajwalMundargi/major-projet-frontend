'use client';

import { useState } from 'react';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const addRecentSearch = () => {
    if (searchTerm.trim() && !recentSearches.includes(searchTerm)) {
      setRecentSearches([searchTerm, ...recentSearches.slice(0, 4)]);
    }
  };

  return (
    <div className="w-full">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-teal-500/10 rounded-xl blur-xl opacity-50"></div>
        
        <div className="relative">
          {/* Search Icon */}
          <svg 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors duration-200"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search organizations by name, description, or tags..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={(e) => e.key === 'Enter' && addRecentSearch()}
            className={`w-full pl-12 pr-12 py-3 md:py-4 rounded-xl border
                       bg-slate-900/90 backdrop-blur-xl
                       text-white text-sm md:text-base
                       placeholder-slate-500
                       transition-all duration-300 shadow-lg shadow-black/5
                       ${isFocused 
                         ? 'border-emerald-500/50 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10' 
                         : 'border-slate-800/50 hover:border-slate-700/50'
                       }`}
          />

          {/* Clear Button */}
          {searchTerm && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-700/50 rounded-lg transition-all duration-200 group"
              aria-label="Clear search"
            >
              <svg 
                className="w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Recent Searches & Suggestions */}
      {isFocused && recentSearches.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-slate-800/50 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800/50">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Recent Searches</p>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {recentSearches.map((search, idx) => (
              <button
                key={idx}
                onClick={() => setSearchTerm(search)}
                className="w-full px-4 py-3 text-left hover:bg-slate-800/50 transition-colors duration-200 flex items-center gap-3 group"
              >
                <svg className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{search}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Stats */}
      {searchTerm && (
        <div className="mt-4 flex items-center gap-2">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-xs text-emerald-400 font-medium">Searching for: "{searchTerm}"</span>
          </div>
        </div>
      )}
    </div>
  );
}
