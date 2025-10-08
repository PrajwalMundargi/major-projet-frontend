// // components/Footer.js

// export default function Footer() {
//   // Use Tailwind classes for styling, themeing, and layout
//   return (
//     <footer className="w-full mt-10 p-4 border-t border-gray-200 dark:border-gray-700 
//                        bg-white dark:bg-gray-800 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto text-center">
//         <p className="text-sm text-gray-600 dark:text-gray-400">
//           Google Summer of Code Organizations Directory
//         </p>
//         <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
//           Discover open source projects and contribute to the community.
//         </p>
//         <div className="flex justify-center space-x-4 mt-2">
//           {/* Example Links/Icons */}
//           <a href="#" className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 text-sm">
//             About
//           </a>
//           <span className="text-gray-400 dark:text-gray-600">|</span>
//           <a href="#" className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 text-sm">
//             GitHub
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }




// components/Footer.js

export default function Footer() {
  return (
    <footer className="w-full mt-10 p-4 border-t border-gh-light-dark dark:border-gh-dark-light 
                       bg-gh-light dark:bg-gh-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Google Summer of Code Organizations Directory
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Discover open source projects and contribute to the community.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-gray-500 hover:text-gh-primary dark:hover:text-gh-primary text-sm">
            About
          </a>
          <span className="text-gray-400 dark:text-gray-600">|</span>
          <a href="#" className="text-gray-500 hover:text-gh-primary dark:hover:text-gh-primary text-sm">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}