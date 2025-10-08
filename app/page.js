'use client'; 
// Use the 'use client' directive because this page manages interactive state 
// for search, filters, and passes props down.

import { useState } from 'react';

// Import necessary components (assuming they are in '../components/')
// NOTE: Navbar is typically rendered in the app/layout.js, but including it here 
// for completeness if you choose to render it page-specific.
// If you put Navbar in layout.js (recommended), you can remove this import.
import Navbar from './Components/Navbar';
import SearchBar from './Components/SearchBar';
import FilterTags from './Components/FilterTags';
import OrganizationList from './Components/OrganizationList';
import ProfileOverview from './Components/ProfileOverview';
import Footer from './Components/Footer';

// --- Placeholder Data ---
const dummyOrganizations = [
  { id: 1, name: 'TechCorp Solutions', tags: ['AI', 'Machine Learning', 'Data Science'] },
  { id: 2, name: 'OpenForge Foundation', tags: ['Open Source', 'Developer Tools', 'Cloud'] },
  { id: 3, name: 'Neural Labs', tags: ['AI', 'Deep Learning', 'Research'] },
  { id: 4, name: 'WebSphere Technologies', tags: ['Web', 'Frontend', 'JavaScript'] },
  { id: 5, name: 'DataStream Analytics', tags: ['Data Science', 'Analytics', 'Visualization'] },
  { id: 6, 'name': 'CodeCraft Academy', tags: ['Education', 'Learning', 'Open Source'] },
  { id: 7, 'name': 'CloudNative Systems', tags: ['Cloud', 'DevOps', 'Infrastructure'] },
  { id: 8, 'name': 'QuantumBridge Labs', tags: ['Quantum Computing', 'Research', 'AI'] },
];

// Extract all unique tags for the filter component
const allTags = Array.from(new Set(dummyOrganizations.flatMap(org => org.tags)));
// ------------------------


export default function HomePage() {
  // State to hold the user's search query
  const [searchTerm, setSearchTerm] = useState('');
  // State to hold the tags currently selected by the user
  const [activeFilters, setActiveFilters] = useState([]);
  
  // --- Filtering and Search Logic ---
  
  const filteredOrganizations = dummyOrganizations.filter(org => {
    // 1. Check for search term match (case-insensitive)
    const searchMatch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Check for filter tag match
    // If no filters are active, we consider it a match.
    const tagMatch = activeFilters.length === 0 || 
                     org.tags.some(tag => activeFilters.includes(tag));

    return searchMatch && tagMatch;
  });
  
  // Function to toggle a filter tag on or off
  const handleTagToggle = (tag) => {
    setActiveFilters(prevFilters => 
      prevFilters.includes(tag)
        ? prevFilters.filter(f => f !== tag) // Remove filter
        : [...prevFilters, tag]             // Add filter
    );
  };
  
  // --- Component Rendering ---
  
  return (
    // Apply dark mode transition to the container (if Navbar isn't in layout.js)
    // If Navbar is in layout.js, ensure layout.js handles the dark:bg-gray-900 on the <body>
    <div className="min-h-screen"> 
      
      {/* If you chose to put Navbar in app/layout.js, remove the line below. 
        If you render it here, it will only appear on the homepage.
      */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <ProfileOverview /> 
        
        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Filter Tags */}
        <FilterTags 
          allTags={allTags}
          activeFilters={activeFilters}
          onTagToggle={handleTagToggle}
        />
        
        {/* Results Count */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 mb-6">
          Showing {filteredOrganizations.length} of {dummyOrganizations.length} organizations
        </p>

        {/* Organization List */}
        <OrganizationList organizations={filteredOrganizations} />

      </div>
      <Footer />
    </div>
  );
}