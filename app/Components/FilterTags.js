'use client';

import { useState, useRef, useEffect } from 'react';


export default function FilterTags({ allTags, activeFilters, onTagToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative inline-block w-full sm:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between items-center w-full sm:w-72 px-5 py-4 text-sm font-medium
                   text-slate-300 bg-slate-900/90 backdrop-blur-xl
                   border border-slate-800/50 rounded-xl
                   hover:bg-slate-800/90 hover:border-slate-700/50 transition-all duration-200 shadow-lg shadow-black/5"
      >
        <span className="flex items-center space-x-2.5">
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span className="text-white">
            {activeFilters.length > 0
              ? `${activeFilters.length} tag${activeFilters.length > 1 ? 's' : ''} selected`
              : 'Filter by tags'}
          </span>
        </span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full sm:w-72 bg-slate-900/95 backdrop-blur-xl rounded-xl shadow-2xl
                     border border-slate-800/50 max-h-96 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-slate-800/50">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-800/50
                           text-white placeholder-slate-500 border border-slate-700/30
                           focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1">
            {filteredTags.length === 0 ? (
              <p className="text-sm text-slate-500 p-4 text-center">
                No tags found
              </p>
            ) : (
              <ul className="py-1">
                {filteredTags.map((tag) => {
                  const isActive = activeFilters.includes(tag);
                  return (
                    <li
                      key={tag}
                      className="flex items-center justify-between px-4 py-3 hover:bg-slate-800/50 
                                 cursor-pointer transition-colors text-sm group"
                      onClick={() => onTagToggle(tag)}
                    >
                      <span className="text-slate-300 group-hover:text-white transition-colors">{tag}</span>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                                    ${isActive 
                                      ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/30' 
                                      : 'border-slate-600 group-hover:border-slate-500'}`}>
                        {isActive && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
