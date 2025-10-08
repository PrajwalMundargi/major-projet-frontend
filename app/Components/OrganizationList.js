// // components/OrganizationList.js
// export default function OrganizationList({ organizations }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {organizations.map(org => (
//         <div 
//           key={org.id} 
//           className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl 
//                      bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
//         >
//           <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
//             {org.name}
//           </h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             A brief description of {org.name}'s focus areas...
//           </p>
//           <div className="mt-3 flex flex-wrap gap-1">
//             {org.tags.map(tag => (
//               <span 
//                 key={tag} 
//                 className="px-2 py-0.5 text-xs bg-indigo-100 text-indigo-800 rounded-full dark:bg-indigo-900 dark:text-indigo-200"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       ))}
      
//       {organizations.length === 0 && (
//         <p className="col-span-full text-center text-gray-500 dark:text-gray-400 mt-10">
//           No organizations match your current search and filters.
//         </p>
//       )}
//     </div>
//   );
// }



// components/OrganizationList.js

import OrganizationCard from './OrganizationCard'; // Import the new component

export default function OrganizationList({ organizations }) {
  return (
    // Responsive Grid: 1 column on mobile, 2 on medium, 3 on large screens
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {organizations.map(org => (
        <OrganizationCard key={org.id} organization={org} />
      ))}
      
      {organizations.length === 0 && (
        <p className="col-span-full text-center text-gray-500 dark:text-gray-400 mt-10">
          No organizations match your current search and filters.
        </p>
      )}
    </div>
  );
}