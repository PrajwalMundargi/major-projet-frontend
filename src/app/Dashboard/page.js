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
    fetch('http://127.0.0.1:5000/api/organizations')
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

  // --- Render ---
  if (loading)
    return <p className="text-center mt-10 text-gray-600 dark:text-gray-400">Loading organizations...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileOverview />

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <FilterTags
          allTags={allTags}
          activeFilters={activeFilters}
          onTagToggle={handleTagToggle}
        />

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 mb-6">
          Showing {filteredOrganizations.length} of {organizations.length} organizations
        </p>

        <OrganizationList organizations={filteredOrganizations} />
      </div>

      <Footer />
    </div>
  );
}
