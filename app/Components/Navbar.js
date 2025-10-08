// components/Navbar.js

import ThemeToggle from './ThemeToggle'; // Imports the client component

export default function Navbar() {
  return (
    <nav className="shadow-md sticky top-0 z-10 
                bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand/Title */}
          <a href="/" 
             className="text-xl font-bold tracking-tight 
                        text-gray-900 dark:text-white">
            GSoC Organizations
          </a>

          {/* Right-aligned items */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}



// // components/Navbar.js

// import ThemeToggle from './ThemeToggle';

// export default function Navbar() {
//   return (
//     <nav className="shadow-lg sticky top-0 z-10 
//                 bg-gh-light dark:bg-gh-dark border-b border-gh-light-dark dark:border-gh-dark-light">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <a href="/" 
//              className="text-xl font-bold tracking-tight 
//                         text-gh-dark dark:text-gh-light">
//             GSoC Organizations
//           </a>
//           <div className="flex items-center space-x-4">
//             <ThemeToggle />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }




// components/Navbar.js

// import ThemeToggle from './ThemeToggle';

// export default function Navbar() {
//   return (
//     // REMOVED: sticky top-0 z-10 
//     <nav className="shadow-lg 
//                 bg-gh-light dark:bg-gh-dark border-b border-gh-light-dark dark:border-gh-dark-light">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Brand/Title */}
//           <a href="/" 
//              className="text-xl font-bold tracking-tight 
//                         text-gh-dark dark:text-gh-light">
//             GSoC Organizations
//           </a>

//           {/* Right-aligned items */}
//           <div className="flex items-center space-x-4">
//             <ThemeToggle />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
