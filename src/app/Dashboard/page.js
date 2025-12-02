'use client';

import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import SearchBar from './Components/SearchBar';
import FilterTags from './Components/FilterTags';
import OrganizationList from './Components/OrganizationList';
import ProfileOverview from './Components/ProfileOverview';
import Footer from './Components/Footer';

export default function HomePage() {
  const [organizations, setOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Flask backend
  useEffect(() => {
    fetch('http://localhost:5000/api/organizations')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch organizations');
        return res.json();
      })
      .then((data) => setOrganizations(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Create list of all tags dynamically
  const allTags = Array.from(new Set(organizations.flatMap((org) => org.tech_tags || [])));

  // --- Filtering + Search ---
  const filteredOrganizations = organizations.filter((org) => {
    const nameMatch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
    const tagMatch =
      activeFilters.length === 0 ||
      (org.tech_tags || []).some((tag) => activeFilters.includes(tag));
    return nameMatch && tagMatch;
  });

  const handleTagToggle = (tag) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setActiveFilters([]);
  };

  // --- Render Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-300 text-lg font-medium">Loading organizations...</p>
            <p className="text-slate-400 text-sm mt-2">Fetching GSoC data</p>
          </div>
        </div>
      </div>
    );
  }

  // --- Render Error State ---
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="max-w-md text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Unable to Load Data</h2>
            <p className="text-red-400 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Overview with subtle enhancement */}
        <div className="mb-8">
          <ProfileOverview />
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Stats & Filter Bar */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-slate-300 text-sm">
                  <span className="font-semibold text-white">{filteredOrganizations.length}</span>
                  {' '}of{' '}
                  <span className="font-semibold text-white">{organizations.length}</span>
                  {' '}organizations
                </span>
              </div>
              {activeFilters.length > 0 && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span className="text-emerald-400 text-sm font-medium">
                    {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} active
                  </span>
                </div>
              )}
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || activeFilters.length > 0) && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <span
                    key={filter}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm border border-emerald-500/30"
                  >
                    {filter}
                    <button
                      onClick={() => handleTagToggle(filter)}
                      className="hover:text-emerald-300 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredOrganizations.length === 0 ? (
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No organizations found</h3>
            <p className="text-slate-400 mb-6">
              Try adjusting your search or filters to find what you're looking for
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <OrganizationList organizations={filteredOrganizations} />
        )}
      </div>

      <Footer />
    </div>
  );
}