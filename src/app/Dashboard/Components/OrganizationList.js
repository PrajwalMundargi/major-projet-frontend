'use client';

import { useState } from 'react';
import OrganizationCard from './OrganizationCard';

export default function OrganizationList({ organizations }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Extract all unique categories
  const allCategories = ['all', ...new Set(organizations.flatMap(org => org.categories || []))];

  // Filter organizations by selected category
  const filteredOrganizations = selectedCategory === 'all' 
    ? organizations 
    : organizations.filter(org => org.categories?.includes(selectedCategory));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-16 bg-gradient-to-r from-emerald-600/10 to-blue-600/10 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-8 mb-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Organizations
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                Explore {organizations.length} amazing open source organizations participating in Google Summer of Code
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl border border-emerald-500/30">
              <span className="text-4xl font-bold text-emerald-400">{organizations.length}</span>
            </div>
          </div>

          {/* Category Filter */}
          {allCategories.length > 1 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-slate-400 mr-2">Filter by category:</span>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                      selectedCategory === category
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredOrganizations.length === 0 ? (
          // Empty State
          <div className="col-span-full py-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-700/50 mb-6">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No organizations found</h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              {selectedCategory !== 'all'
                ? `No organizations match the "${selectedCategory}" category. Try selecting a different filter.`
                : 'No organizations match your current search and filters.'}
            </p>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Results Counter */}
            <div className="mb-8 flex items-center justify-between">
              <p className="text-slate-400 text-sm">
                Showing <span className="font-bold text-emerald-400">{filteredOrganizations.length}</span> of <span className="font-bold text-slate-300">{organizations.length}</span> organizations
              </p>
              <div className="flex gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                </span>
              </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
              {filteredOrganizations.map((org, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredId(idx)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="h-full"
                >
                  <OrganizationCard 
                    organization={org} 
                    isHovered={hoveredId === idx}
                  />
                </div>
              ))}
            </div>

            {/* Bottom Stats */}
            <div className="mt-16 pt-12 border-t border-slate-700/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">
                    {organizations.length}
                  </div>
                  <p className="text-sm text-slate-400">Total Organizations</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {new Set(organizations.flatMap(org => org.categories || [])).size}
                  </div>
                  <p className="text-sm text-slate-400">Categories</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {new Set(organizations.flatMap(org => org.tech_tags || [])).size}
                  </div>
                  <p className="text-sm text-slate-400">Technologies</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {new Set(organizations.flatMap(org => org.year || [])).size}
                  </div>
                  <p className="text-sm text-slate-400">Program Years</p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}