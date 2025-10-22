// 'use client';

// import { useEffect, useState } from 'react';

// const THEME_KEY = 'gsoc-theme';

// export default function ThemeToggle() {
//   // `null` means "not initialized yet" — prevents SSR/CSR hydration mismatch
//   const [theme, setTheme] = useState(null);

//   // On mount: read stored theme or system preference and initialize state
//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     const stored = localStorage.getItem(THEME_KEY);
//     if (stored === 'light' || stored === 'dark') {
//       setTheme(stored);
//       return;
//     }

//     // No stored preference -> use system preference
//     const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//     setTheme(prefersDark ? 'dark' : 'light');
//   }, []);

//   // Apply theme to <html> and persist to localStorage whenever theme changes
//   useEffect(() => {
//     if (theme === null || typeof document === 'undefined') return;

//     const root = document.documentElement;
//     if (theme === 'dark') {
//       root.classList.add('dark');
//     } else {
//       root.classList.remove('dark');
//     }

//     try {
//       localStorage.setItem(THEME_KEY, theme);
//     } catch (e) {
//       // Ignore localStorage errors (e.g., in strict privacy modes)
//       // console.warn('Could not persist theme', e);
//     }
//   }, [theme]);

//   // Toggle between light and dark
//   const toggleTheme = () => {
//     setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
//   };

//   // If not initialized yet, render a placeholder to avoid mismatched markup
//   if (theme === null) {
//     return (
//       <button
//         className="p-2 rounded-md transition-colors text-lg bg-gray-100 dark:bg-gray-700"
//         aria-hidden="true"
//       >
//         {/* lightweight placeholder */}
//         🌗
//       </button>
//     );
//   }

//   return (
//     <button
//       onClick={toggleTheme}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter' || e.key === ' ') {
//           e.preventDefault();
//           toggleTheme();
//         }
//       }}
//       aria-pressed={theme === 'dark'}
//       aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
//       className="p-2 rounded-md transition-colors text-lg
//                  bg-gh-light-dark hover:bg-gray-300 text-gh-dark
//                  dark:bg-gh-dark-light dark:hover:bg-gh-dark dark:text-gh-light"
//     >
//       {theme === 'light' ? '🌙' : '☀️'}
//     </button>
//   );
// }
