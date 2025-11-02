'use client';

import { useRouter } from 'next/navigation';

export default function OrganizationCard({ organization }) {
  const router = useRouter();
  const {
    name,
    tagline,
    logo_url,
    tech_tags = [],
    github_url,
    website_url,
    slug, // Optional: if your org has a specific slug, prefer using this
  } = organization;

  // On card click, navigate to the dynamic route for the company
  const handleCardClick = () => {
    // Prefer slug if available, else encode company name for URL
    const orgParam = slug || name;
    router.push(`/Dashboard/${encodeURIComponent(orgParam)}`);
  };

  return (
    <div
      className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl 
                 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow 
                 flex flex-col h-full cursor-pointer"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
      title={name}
    >
      <div className="flex justify-between items-start mb-3">
        <img
          src={logo_url || 'https://via.placeholder.com/80?text=No+Logo'}
          alt={name}
          className="w-16 h-16 object-contain rounded-md"
        />
        {github_url ? (
          <a
            href={github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-100 hover:text-blue-500 transition-colors"
            aria-label={`View ${name} on GitHub`}
            onClick={e => e.stopPropagation()} // Prevents opening both links (card and GitHub)
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58 0-.29-.01-1.04-.02-2.04-3.34.72-4.04-1.61-4.04-1.61-.54-1.36-1.32-1.72-1.32-1.72-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.53-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.23 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.93.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.19.7.8.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
            </svg>
          </a>
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400 italic">No GitHub</span>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex-grow">
        {tagline || 'No description available.'}
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
        {tech_tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs font-medium rounded-full 
                      bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
