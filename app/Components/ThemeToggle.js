// 'use client';

// import { useState, useEffect } from 'react';

// // Key for local storage
// const THEME_KEY = 'gsoc-theme';

// export default function ThemeToggle() {
//   // Initialize state based on local storage or system preference
//   const [theme, setTheme] = useState(() => {
//     if (typeof window !== 'undefined') {
//       const storedTheme = localStorage.getItem(THEME_KEY);
//       if (storedTheme) return storedTheme;

//       // Check system preference if no theme is stored
//       if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//         return 'dark';
//       }
//     }
//     return 'light';
//   });

//   // Effect to apply the 'dark' class to the root HTML element
//   useEffect(() => {
//     const root = document.documentElement;
//     if (theme === 'dark') {
//       root.classList.add('dark');
//     } else {
//       root.classList.remove('dark');
//     }
//     localStorage.setItem(THEME_KEY, theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       className="p-2 rounded-md transition-colors 
//                  bg-gray-200 hover:bg-gray-300 text-gray-800
//                  dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
//       aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
//     >
//       {/* Sun or Moon icon based on current theme */}
//       {theme === 'light' ? '🌙' : '☀️'}
//     </button>
//   );
// }




'use client';

import { useState, useEffect } from 'react';

const THEME_KEY = 'gsoc-theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem(THEME_KEY);
      if (storedTheme) return storedTheme;

      // Check system preference if no theme is stored
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  // CRITICAL STEP 1: Apply 'dark' class to the root HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md transition-colors font-bold text-lg
                 bg-gh-light-dark hover:bg-gray-300 text-gh-dark
                 dark:bg-gh-dark-light dark:hover:bg-gh-dark dark:text-gh-light"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}




