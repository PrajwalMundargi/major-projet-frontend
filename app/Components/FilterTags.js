// components/FilterTags.js
export default function FilterTags({ allTags, activeFilters, onTagToggle }) {
  return (
    <div className="flex flex-wrap gap-2 py-2">
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2">
        Filter by tags:
      </span>
      {allTags.map(tag => {
        const isActive = activeFilters.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-150
              ${isActive
                ? 'bg-green-300 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`
            }
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}






// // components/FilterTags.js
// export default function FilterTags({ allTags, activeFilters, onTagToggle }) {
//   return (
//     <div className="flex flex-wrap gap-2 py-2">
//       <span className="text-sm font-semibold text-gh-dark dark:text-gh-light mr-2">
//         Filter by tags:
//       </span>
//       {allTags.map(tag => {
//         const isActive = activeFilters.includes(tag);
//         return (
//           <button
//             key={tag}
//             onClick={() => onTagToggle(tag)}
//             className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-150 border
//               ${isActive
//                 ? 'bg-gh-primary text-gh-light border-gh-primary shadow-md'
//                 : 'bg-gh-light-dark text-gh-dark border-gh-light-dark hover:bg-gray-300 dark:bg-gh-dark-light dark:text-gh-light dark:border-gh-dark-light dark:hover:bg-gh-dark'
//               }`
//             }
//           >
//             {tag}
//           </button>
//         );
//       })}
//     </div>
//   );
// }