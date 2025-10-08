// components/OrganizationCard.js

// import { FaGithub } from 'react-icons/fa'; // Assuming you use a react icon library for GitHub icon

export default function OrganizationCard({ organization }) {
  const { name, tags } = organization;

  return (
    <div 
      className="p-6 border border-gh-light-dark dark:border-gh-dark-light rounded-xl 
                 bg-gh-light dark:bg-gh-dark-light shadow-lg hover:shadow-xl transition-shadow 
                 flex flex-col h-full" // Use flex-col and h-full for consistent height in the grid
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-3">
        {/* Placeholder for Logo/Icon */}
        <div className="text-4xl text-gh-dark dark:text-gh-light">
          {/* Replace with a real logo component/image */}
          <span className="text-gh-primary">{"{ }"}</span>
        </div>
        
        {/* GitHub Link */}
        <a 
          href={`#${name.toLowerCase().replace(/\s/g, '-')}`} // Placeholder URL
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gh-dark dark:text-gh-light hover:text-gh-primary transition-colors text-xl"
          aria-label={`View ${name} on GitHub`}
        >
          {/* Replace with <FaGithub /> if using react-icons */}
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577 0-.285-.011-1.04-.016-2.04-3.338.724-4.042-1.61-4.042-1.61-.542-1.361-1.325-1.724-1.325-1.724-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.492.998.108-.77.42-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.118-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.293-1.552 3.301-1.23 3.301-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.286 0 .315.194.697.8.576C20.562 21.792 24 17.292 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-semibold mb-2 text-gh-dark dark:text-gh-light">
        {name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow mb-3">
        {/* Placeholder Description */}
        {name} develops and maintains cutting-edge open-source software and frameworks in the areas of {tags.join(', ')}.
      </p>

      {/* Tags (Stuck to the bottom) */}
      <div className="mt-auto flex flex-wrap gap-2 pt-2 border-t border-gh-light-dark dark:border-gh-dark-light/50">
        {tags.map(tag => (
          <span 
            key={tag} 
            className="px-2 py-0.5 text-xs font-medium rounded-full 
                       bg-gh-primary/10 text-gh-primary dark:bg-gh-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}