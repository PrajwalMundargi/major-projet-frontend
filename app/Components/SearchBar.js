// // components/SearchBar.js
// export default function SearchBar({ searchTerm, setSearchTerm }) {
//   return (
//     <input
//       type="text"
//       placeholder="Search organizations by name, description, or tags..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       className="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-600 
//                  bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   );
// }


// components/SearchBar.js
export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search organizations by name, description, or tags..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-3 mb-4 rounded-lg border 
                 border-gh-light-dark dark:border-gh-dark-light
                 bg-gh-light dark:bg-gh-dark-light 
                 text-gh-dark dark:text-gh-light 
                 focus:outline-none focus:ring-2 focus:ring-gh-primary transition-colors"
    />
  );
}