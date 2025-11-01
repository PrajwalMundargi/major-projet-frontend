// components/OrganizationList.js

import OrganizationCard from './OrganizationCard'; // Import the new component

export default function OrganizationList({ organizations }) {
  return (
    // Responsive Grid: 1 column on mobile, 2 on medium, 3 on large screens
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {organizations.map((org, idx)=> (
        <OrganizationCard key={idx} organization={org} />
      ))}
      
      {organizations.length === 0 && (
        <p className="col-span-full text-center text-gray-500 dark:text-gray-400 mt-10">
          No organizations match your current search and filters.
        </p>
      )}
    </div>
  );
}