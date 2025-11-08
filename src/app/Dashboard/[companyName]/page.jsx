// 'use client';

// import { useState, useEffect } from 'react';

// export default function Page({ params }) {
//   // Get company name from dynamic route
//   const companyName = params.companyName;
// //   const { companyName } = use(props.params);
//   const [company, setCompany] = useState(null);
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [issuesLoading, setIssuesLoading] = useState(false);

//   useEffect(() => {
//     if (companyName) {
//       fetchCompanyData();
//     }
//     // eslint-disable-next-line
//   }, [companyName]);

//   const fetchCompanyData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Fetch company data from your backend
//       const response = await fetch(`http://127.0.0.1:5000/api/organizations/${encodeURIComponent(companyName)}`);

//       if (!response.ok) {
//         throw new Error('Company not found');
//       }

//       const data = await response.json();
//       setCompany(data);

//       // If GitHub repo exists, fetch issues
//       if (data.github_repo) {
//         await fetchGitHubIssues(data.github_repo);
//       } else {
//         setIssues([]); // No repo, no issues
//       }
//     } catch (err) {
//       setError(err.message);
//       setCompany(null);
//       setIssues([]);
//       console.error('Error fetching company data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchGitHubIssues = async (githubRepoUrl) => {
//     try {
//       setIssuesLoading(true);

//       // Extract owner and repo from GitHub URL
//       const urlParts = githubRepoUrl.replace('https://github.com/', '').split('/');
//       const owner = urlParts[0];
//       const repo = urlParts[1];

//       if (!owner || !repo) {
//         throw new Error('Invalid GitHub repository URL');
//       }

//       // Fetch good first issues from GitHub API
//       const response = await fetch(
//         `https://api.github.com/repos/${owner}/${repo}/issues?labels=good%20first%20issue&state=open&per_page=20`,
//         {
//           headers: {
//             'Accept': 'application/vnd.github.v3+json',
//             // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` // Optional: Rate limit
//           }
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch GitHub issues');
//       }

//       const githubIssues = await response.json();
//       setIssues(githubIssues);
//     } catch (err) {
//       console.error('Error fetching GitHub issues:', err);
//       setIssues([]);
//     } finally {
//       setIssuesLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return date.toLocaleDateString('en-US', options);
//   };

//   const getDifficultyFromLabels = (labels) => {
//     const labelNames = labels.map(l => l.name.toLowerCase());
//     if (labelNames.some(l => l.includes('easy') || l.includes('beginner'))) return 'Easy';
//     if (labelNames.some(l => l.includes('medium') || l.includes('intermediate'))) return 'Medium';
//     if (labelNames.some(l => l.includes('hard') || l.includes('advanced'))) return 'Hard';
//     return 'Beginner Friendly';
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch(difficulty.toLowerCase()) {
//       case 'easy':
//       case 'beginner friendly':
//         return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
//       case 'medium':
//         return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
//       case 'hard':
//         return 'text-red-400 bg-red-500/10 border-red-500/20';
//       default:
//         return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-400 text-lg">Loading company details...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
//         <div className="max-w-md text-center px-4">
//           <div className="text-6xl mb-4">❌</div>
//           <h2 className="text-3xl font-bold mb-3">Error</h2>
//           <p className="text-slate-400 mb-6">{error}</p>
//           <button 
//             onClick={fetchCompanyData}
//             className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors font-medium"
//           >
//             Try Again
//           </button>
//           <div className="mt-4">
//             <a href="/dashboard" className="text-emerald-400 hover:text-emerald-300 transition-colors">
//               ← Back to Dashboard
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Company not found
//   if (!company) {
//     return (
//       <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
//         <div className="text-center px-4">
//           <div className="text-6xl mb-4">🔍</div>
//           <h2 className="text-3xl font-bold mb-3">Company Not Found</h2>
//           <p className="text-slate-400 mb-6">The company "{companyName}" could not be found.</p>
//           <a 
//             href="/dashboard"
//             className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors font-medium"
//           >
//             Back to Dashboard
//           </a>
//         </div>
//       </div>
//     );
//   }

//   // Main render
//   return (
//     <div className="min-h-screen bg-slate-900 text-white">
//       {/* Header */}
//       <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <a 
//               href="/Dashboard" 
//               className="flex items-center gap-2 text-slate-300 hover:text-emerald-500 transition-colors"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               <span className="font-medium">Back to Dashboard</span>
//             </a>
//             <div className="text-sm text-slate-400">GSoC Preparation</div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
//         {/* Company Overview Card */}
//         <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-8 md:mb-12">
//           <div className="flex items-start gap-4 md:gap-6">
//             {/* Company Logo/Icon */}
//             <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 text-slate-900 font-bold text-2xl md:text-3xl shadow-lg">
//               {company.name?.substring(0, 2).toUpperCase()}
//             </div>

//             {/* Company Info */}
//             <div className="flex-1 min-w-0">
//               <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent break-words">
//                 {company.name}
//               </h1>

//               {company.github_repo && (
//                 <div className="mb-4">
//                   <a 
//                     href={company.github_repo} 
//                     target="_blank" 
//                     rel="noopener noreferrer" 
//                     className="inline-flex items-center gap-2 text-slate-300 hover:text-emerald-500 transition-colors"
//                   >
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-sm md:text-base">View on GitHub</span>
//                   </a>
//                 </div>
//               )}

//               <p className="text-slate-300 leading-relaxed text-base md:text-lg">
//                 {company.description || company.desc || 'No description available.'}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Good First Issues Section */}
//         <div>
//           <div className="flex items-center gap-3 mb-6">
//             <h2 className="text-2xl md:text-3xl font-bold text-white">Good First Issues</h2>
//             {!issuesLoading && (
//               <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm border border-emerald-500/30">
//                 {issues.length} {issues.length === 1 ? 'issue' : 'issues'}
//               </span>
//             )}
//           </div>

//           {issuesLoading ? (
//             <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-12 text-center">
//               <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-slate-400">Loading issues from GitHub...</p>
//             </div>
//           ) : issues.length === 0 ? (
//             <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-12 text-center">
//               <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               <h3 className="text-xl font-semibold text-slate-300 mb-2">No open Good First Issues right now.</h3>
//               <p className="text-slate-500">Check back later or explore other organizations!</p>
//             </div>
//           ) : (
//             <div className="grid gap-6">
//               {issues.map((issue) => (
//                 <div 
//                   key={issue.id} 
//                   className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
//                 >
//                   <div className="flex flex-col gap-4">
//                     {/* Issue Header */}
//                     <div className="flex items-start justify-between gap-4">
//                       <div className="flex-1 min-w-0">
//                         <div className="flex flex-wrap items-center gap-2 mb-3">
//                           <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(getDifficultyFromLabels(issue.labels))}`}>
//                             {getDifficultyFromLabels(issue.labels)}
//                           </span>
//                           <span className="text-slate-500 text-sm">#{issue.number}</span>
//                         </div>

//                         <a 
//                           href={issue.html_url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-xl font-semibold text-white hover:text-emerald-400 transition-colors block mb-2 break-words"
//                         >
//                           {issue.title}
//                         </a>

//                         {/* Issue Metadata */}
//                         <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
//                           <span className="flex items-center gap-1">
//                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                               <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//                             </svg>
//                             {issue.user?.login || 'Unknown'}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                             </svg>
//                             {formatDate(issue.created_at)}
//                           </span>
//                           {issue.comments > 0 && (
//                             <span className="flex items-center gap-1">
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                               </svg>
//                               {issue.comments}
//                             </span>
//                           )}
//                         </div>

//                         {/* Labels */}
//                         {issue.labels && issue.labels.length > 0 && (
//                           <div className="flex flex-wrap gap-2">
//                             {issue.labels.slice(0, 5).map((label) => (
//                               <span 
//                                 key={label.id} 
//                                 className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs border border-slate-600"
//                               >
//                                 {label.name}
//                               </span>
//                             ))}
//                             {issue.labels.length > 5 && (
//                               <span className="px-2 py-1 text-slate-400 text-xs">
//                                 +{issue.labels.length - 5} more
//                               </span>
//                             )}
//                           </div>
//                         )}
//                       </div>

//                       {/* View Issue Button */}
//                       <a 
//                         href={issue.html_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center gap-2 transition-colors flex-shrink-0 text-sm font-medium"
//                       >
//                         View
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                         </svg>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Footer (Optional: copy your footer component if required) */}
//     </div>
//   );
// }








// 'use client';

// import { useState, useEffect } from 'react';

// export default function Page({ params }) {
//   const companyName = params.companyName;
//   const [company, setCompany] = useState(null);
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [issuesLoading, setIssuesLoading] = useState(false);
//   const [fallbackToAll, setFallbackToAll] = useState(false);

//   useEffect(() => {
//     if (companyName) {
//       fetchCompanyData();
//     }
//     // eslint-disable-next-line
//   }, [companyName]);

//   const fetchCompanyData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(
//         `http://127.0.0.1:5000/api/organizations/${encodeURIComponent(companyName)}`
//       );
//       if (!response.ok) throw new Error('Company not found');
//       const data = await response.json();
//       setCompany(data);

//       if (data.github_repo) {
//         await fetchGitHubIssues(data.github_repo);
//       } else {
//         setIssues([]);
//         setFallbackToAll(false);
//       }
//     } catch (err) {
//       setError(err.message);
//       setCompany(null);
//       setIssues([]);
//       setFallbackToAll(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchGitHubIssues = async (githubRepoUrl) => {
//     try {
//       setIssuesLoading(true);

//       // Extract owner and repo from GitHub URL
//       const urlParts = githubRepoUrl.replace('https://github.com/', '').split('/');
//       const owner = urlParts[0];
//       const repo = urlParts[1];
//       if (!owner || !repo) throw new Error('Invalid GitHub repository URL');

//       // Fetch good first issues from GitHub API - limit to 15
//       let response = await fetch(
//         `https://api.github.com/repos/${owner}/${repo}/issues?labels=good%20first%20issue&state=open&per_page=15`,
//         {
//           headers: { 'Accept': 'application/vnd.github.v3+json' }
//         }
//       );

//       let githubIssues = [];
//       if (response.ok) {
//         githubIssues = await response.json();
//         githubIssues = githubIssues.filter(issue => !issue.pull_request);
//       }

//       // If no good first issues, fallback to top open issues (exclude PRs, limit to 15)
//       if (!Array.isArray(githubIssues) || githubIssues.length === 0) {
//         setFallbackToAll(true);
//         response = await fetch(
//           `https://api.github.com/repos/${owner}/${repo}/issues?state=open&per_page=15`,
//           {
//             headers: { 'Accept': 'application/vnd.github.v3+json' }
//           }
//         );
//         if (response.ok) {
//           githubIssues = await response.json();
//           githubIssues = githubIssues.filter(issue => !issue.pull_request);
//         }
//       } else {
//         setFallbackToAll(false);
//       }
//       setIssues(githubIssues.slice(0, 15));
//     } catch (err) {
//       setIssues([]);
//       setFallbackToAll(false);
//     } finally {
//       setIssuesLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return date.toLocaleDateString('en-US', options);
//   };

//   const getDifficultyFromLabels = (labels) => {
//     const labelNames = (labels || []).map(l => l.name.toLowerCase());
//     if (labelNames.some(l => l.includes('easy') || l.includes('beginner'))) return 'Easy';
//     if (labelNames.some(l => l.includes('medium') || l.includes('intermediate'))) return 'Medium';
//     if (labelNames.some(l => l.includes('hard') || l.includes('advanced'))) return 'Hard';
//     return 'Beginner Friendly';
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch ((difficulty || '').toLowerCase()) {
//       case 'easy':
//       case 'beginner friendly':
//         return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
//       case 'medium':
//         return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
//       case 'hard':
//         return 'text-red-400 bg-red-500/10 border-red-500/20';
//       default:
//         return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-400 text-lg">Loading company details...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
//         <div className="max-w-md text-center px-4">
//           <div className="text-6xl mb-4">❌</div>
//           <h2 className="text-3xl font-bold mb-3">Error</h2>
//           <p className="text-slate-400 mb-6">{error}</p>
//           <button
//             onClick={fetchCompanyData}
//             className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors font-medium"
//           >
//             Try Again
//           </button>
//           <div className="mt-4">
//             <a href="/Dashboard" className="text-emerald-400 hover:text-emerald-300 transition-colors">
//               ← Back to Dashboard
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Company not found
//   if (!company) {
//     return (
//       <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
//         <div className="text-center px-4">
//           <div className="text-6xl mb-4">🔍</div>
//           <h2 className="text-3xl font-bold mb-3">Company Not Found</h2>
//           <p className="text-slate-400 mb-6">The company "{companyName}" could not be found.</p>
//           <a
//             href="/Dashboard"
//             className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors font-medium"
//           >
//             Back to Dashboard
//           </a>
//         </div>
//       </div>
//     );
//   }

//   // Main render
//   return (
//     <div className="min-h-screen bg-slate-900 text-white">
//       {/* Header */}
//       <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <a
//               href="/Dashboard"
//               className="flex items-center gap-2 text-slate-300 hover:text-emerald-500 transition-colors"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               <span className="font-medium">Back to Dashboard</span>
//             </a>
//             <div className="text-sm text-slate-400">GSoC Preparation</div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
//         {/* Company Overview Card */}
//         <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-8 md:mb-12">
//           <div className="flex items-start gap-4 md:gap-6">
//             {/* Company Logo/Icon */}
//             <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 text-slate-900 font-bold text-2xl md:text-3xl shadow-lg">
//               {company.name?.substring(0, 2).toUpperCase()}
//             </div>

//             {/* Company Info */}
//             <div className="flex-1 min-w-0">
//               <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent break-words">
//                 {company.name}
//               </h1>
//               {company.github_repo && (
//                 <div className="mb-4">
//                   <a
//                     href={company.github_repo}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 text-slate-300 hover:text-emerald-500 transition-colors"
//                   >
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-sm md:text-base">View on GitHub</span>
//                   </a>
//                 </div>
//               )}
//               <p className="text-slate-300 leading-relaxed text-base md:text-lg">
//                 {company.description || company.desc || 'No description available.'}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Good First Issues Section */}
//         <div>
//           <div className="flex items-center gap-3 mb-6">
//             <h2 className="text-2xl md:text-3xl font-bold text-white">Good First Issues</h2>
//             {!issuesLoading && (
//               <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm border border-emerald-500/30">
//                 {issues.length} {issues.length === 1 ? 'issue' : 'issues'}
//               </span>
//             )}
//           </div>

//           {/* Fallback warning */}
//           {fallbackToAll && issues.length > 0 && (
//             <div className="mb-4 text-yellow-300 text-base font-medium">
//               No <span className="italic text-emerald-400">good first issues</span> found. Showing latest open issues instead:
//             </div>
//           )}

//           {issuesLoading ? (
//             <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-12 text-center">
//               <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-slate-400">Loading issues from GitHub...</p>
//             </div>
//           ) : issues.length === 0 ? (
//             <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-12 text-center">
//               <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               <h3 className="text-xl font-semibold text-slate-300 mb-2">No open issues right now.</h3>
//               <p className="text-slate-500">Check back later or explore other organizations!</p>
//             </div>
//           ) : (
//             <div className="grid gap-6">
//               {issues.map((issue) => (
//                 <div key={issue.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
//                   <div className="flex flex-col gap-4">
//                     {/* Issue Header */}
//                     <div className="flex items-start justify-between gap-4">
//                       <div className="flex-1 min-w-0">
//                         <div className="flex flex-wrap items-center gap-2 mb-3">
//                           <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(getDifficultyFromLabels(issue.labels))}`}>
//                             {getDifficultyFromLabels(issue.labels)}
//                           </span>
//                           <span className="text-slate-500 text-sm">#{issue.number}</span>
//                         </div>

//                         <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-white hover:text-emerald-400 transition-colors block mb-2 break-words">
//                           {issue.title}
//                         </a>

//                         {/* Issue Metadata */}
//                         <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
//                           <span className="flex items-center gap-1">
//                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                               <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//                             </svg>
//                             {issue.user?.login || 'Unknown'}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                             </svg>
//                             {formatDate(issue.created_at)}
//                           </span>
//                           {issue.comments > 0 && (
//                             <span className="flex items-center gap-1">
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                               </svg>
//                               {issue.comments}
//                             </span>
//                           )}
//                         </div>

//                         {/* Labels */}
//                         {issue.labels && issue.labels.length > 0 && (
//                           <div className="flex flex-wrap gap-2">
//                             {issue.labels.slice(0, 5).map((label) => (
//                               <span key={label.id} className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs border border-slate-600">
//                                 {label.name}
//                               </span>
//                             ))}
//                             {issue.labels.length > 5 && (
//                               <span className="px-2 py-1 text-slate-400 text-xs">
//                                 +{issue.labels.length - 5} more
//                               </span>
//                             )}
//                           </div>
//                         )}
//                       </div>

//                       {/* View Issue Button */}
//                       <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center gap-2 transition-colors flex-shrink-0 text-sm font-medium">
//                         View
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                         </svg>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Footer (Optional) */}
//     </div>
//   );
// }











'use client';

import { useState, useEffect } from 'react';

// A typewriter/count-up effect for numbers
function useTypewriterNumber(target, delay = 400, duration = 1000) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let timeout = setTimeout(() => {
      let startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        const progress = ts - startTime;
        const percent = Math.min(progress / duration, 1);
        const value = Math.floor(target * percent);
        setDisplay(value);
        if (percent < 1) requestAnimationFrame(step);
        else setDisplay(target);
      }
      if (typeof target === 'number' && isFinite(target)) {
        requestAnimationFrame(step);
      } else {
        setDisplay(target ?? '—');
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay, duration]);
  return display;
}

// Big animated metric card with improved UI
function AnimatedMetricCard({ title, value, unit }) {
  const animated = typeof value === "number" && isFinite(value);
  const display = animated ? useTypewriterNumber(value) : value ?? '—';
  return (
    <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl border border-emerald-500/30 px-12 py-12 flex flex-col items-center justify-center mx-auto min-w-[220px] min-h-[140px] backdrop-blur-sm hover:border-emerald-400/60 hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span className="relative text-sm uppercase tracking-wider text-slate-400 font-bold mb-5 text-center">{title}</span>
      <span className="relative text-6xl font-extrabold text-emerald-400 tabular-nums flex items-baseline drop-shadow-lg">
        {display}
        {unit && <span className="ml-2 text-2xl font-bold text-emerald-500/60">{unit}</span>}
      </span>
    </div>
  );
}

export default function Page({ params }) {
  const companyName = params.companyName;
  const [company, setCompany] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [issuesLoading, setIssuesLoading] = useState(false);
  const [fallbackToAll, setFallbackToAll] = useState(false);

  useEffect(() => {
    if (companyName) fetchCompanyData();
    // eslint-disable-next-line
  }, [companyName]);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://127.0.0.1:5000/api/organizations/${encodeURIComponent(companyName)}`
      );
      if (!response.ok) throw new Error('Company not found');
      const data = await response.json();
      setCompany(data);
      if (data.github_repo) {
        await fetchGitHubIssues(data.github_repo);
      } else {
        setIssues([]);
        setFallbackToAll(false);
      }
    } catch (err) {
      setError(err.message);
      setCompany(null);
      setIssues([]);
      setFallbackToAll(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchGitHubIssues = async (githubRepoUrl) => {
    try {
      setIssuesLoading(true);
      const urlParts = githubRepoUrl.replace('https://github.com/', '').split('/');
      const owner = urlParts[0];
      const repo = urlParts[1];
      if (!owner || !repo) throw new Error('Invalid GitHub repository URL');
      let response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues?labels=good%20first%20issue&state=open&per_page=15`,
        { headers: { 'Accept': 'application/vnd.github.v3+json' } }
      );
      let githubIssues = [];
      if (response.ok) {
        githubIssues = await response.json();
        githubIssues = githubIssues.filter(issue => !issue.pull_request);
      }
      if (!Array.isArray(githubIssues) || githubIssues.length === 0) {
        setFallbackToAll(true);
        response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/issues?state=open&per_page=15`,
          { headers: { 'Accept': 'application/vnd.github.v3+json' } }
        );
        if (response.ok) {
          githubIssues = await response.json();
          githubIssues = githubIssues.filter(issue => !issue.pull_request);
        }
      } else {
        setFallbackToAll(false);
      }
      setIssues(githubIssues.slice(0, 15));
    } catch (err) {
      setIssues([]);
      setFallbackToAll(false);
    } finally {
      setIssuesLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getDifficultyFromLabels = (labels) => {
    const labelNames = (labels || []).map(l => l.name.toLowerCase());
    if (labelNames.some(l => l.includes('easy') || l.includes('beginner'))) return 'Easy';
    if (labelNames.some(l => l.includes('medium') || l.includes('intermediate'))) return 'Medium';
    if (labelNames.some(l => l.includes('hard') || l.includes('advanced'))) return 'Hard';
    return 'Beginner Friendly';
  };

  const getDifficultyColor = (difficulty) => {
    switch ((difficulty || '').toLowerCase()) {
      case 'easy':
      case 'beginner friendly':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'hard':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      default:
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-lg">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="max-w-md text-center px-4">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-3xl font-bold mb-3">Error</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={fetchCompanyData}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors font-medium"
          >
            Try Again
          </button>
          <div className="mt-4">
            <a href="/Dashboard" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl font-bold mb-3">Company Not Found</h2>
          <p className="text-slate-400 mb-6">
            The company "{companyName}" could not be found.
          </p>
          <a
            href="/Dashboard"
            className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors font-medium"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const metrics = company.github_metrics || {};

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a
              href="/Dashboard"
              className="flex items-center gap-2 text-slate-300 hover:text-emerald-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back to Dashboard</span>
            </a>
            <div className="text-sm text-slate-400">GSoC Preparation</div>
          </div>
        </div>
      </header>

      {/* Company Overview Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-7 md:p-9 mb-12">
          <div className="flex items-start gap-4 md:gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 text-slate-900 font-bold text-2xl md:text-3xl shadow-lg">
              {company.name?.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent break-words">
                {company.name}
              </h1>
              {company.github_repo && (
                <div className="mb-4">
                  <a
                    href={company.github_repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-emerald-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm md:text-base">View on GitHub</span>
                  </a>
                </div>
              )}
              <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                {company.description || company.desc || 'No description available.'}
              </p>
            </div>
          </div>
        </div>

        
        {/* Large METRIC CARDS row */}
        <div className="w-full flex flex-wrap justify-center gap-10 mb-14">
          <AnimatedMetricCard title="GitHub Repos" value={metrics.github_repos} />
          <AnimatedMetricCard title="Pull Requests" value={metrics.pull_requests} />
          <AnimatedMetricCard title="Merged PRs" value={metrics.merged_prs} />
          <AnimatedMetricCard title="Merge Frequency" value={metrics.merge_frequency} unit={metrics.merge_frequency ? "days" : ""} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Sample Graph placeholder */}
        <div className="mb-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl p-8 flex flex-col items-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
          <h3 className="relative mb-6 font-bold text-xl text-slate-200 tracking-wide">Activity Over Time</h3>
          <div className="relative">
            <svg width="320" height="90">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.6"/>
                  <stop offset="50%" stopColor="#10b981" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0.8"/>
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,60 40,80 80,20 120,60 160,70 200,30 240,60 280,20 320,60"
              />
            </svg>
          </div>
          <span className="relative mt-3 text-xs text-slate-500 font-medium tracking-wider">[Sample Graph]</span>
        </div>

        {/* Issues section */}
        <div>
          <div className="flex items-center gap-3 mb-6 mt-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Good First Issues</h2>
            {!issuesLoading && (
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm border border-emerald-500/30">
                {issues.length} {issues.length === 1 ? 'issue' : 'issues'}
              </span>
            )}
          </div>
          {fallbackToAll && issues.length > 0 && (
            <div className="mb-4 text-yellow-300 text-base font-medium">
              No <span className="italic text-emerald-400">good first issues</span> found. Showing latest open issues instead:
            </div>
          )}
          {issuesLoading ? (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-12 text-center">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-400">Loading issues from GitHub...</p>
            </div>
          ) : issues.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-12 text-center">
              <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No open issues right now.</h3>
              <p className="text-slate-500">Check back later or explore other organizations!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {issues.map((issue) => (
                <div key={issue.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(getDifficultyFromLabels(issue.labels))}`}>
                            {getDifficultyFromLabels(issue.labels)}
                          </span>
                          <span className="text-slate-500 text-sm">#{issue.number}</span>
                        </div>
                        <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-white hover:text-emerald-400 transition-colors block mb-2 break-words">
                          {issue.title}
                        </a>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                            {issue.user?.login || 'Unknown'}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(issue.created_at)}
                          </span>
                          {issue.comments > 0 && (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              {issue.comments}
                            </span>
                          )}
                        </div>
                        {issue.labels && issue.labels.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {issue.labels.slice(0, 5).map((label) => (
                              <span key={label.id} className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs border border-slate-600">
                                {label.name}
                              </span>
                            ))}
                            {issue.labels.length > 5 && (
                              <span className="px-2 py-1 text-slate-400 text-xs">
                                +{issue.labels.length - 5} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center gap-2 transition-colors flex-shrink-0 text-sm font-medium">
                        View
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
