'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DOMPurify from 'dompurify';

export default function Page() {
  const params = useParams();
  const { companyName } = params || {};

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // GitHub Issues state
  const [issues, setIssues] = useState([]);
  const [issuesLoading, setIssuesLoading] = useState(false);
  const [fallbackToAll, setFallbackToAll] = useState(false);

  useEffect(() => {
    if (companyName) {
      fetchCompanyData();
    }
  }, [companyName]);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `http://localhost:5000/api/organizations/${encodeURIComponent(companyName)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Company not found: ${response.status}`);
      }

      const data = await response.json();
      setCompany(data);
      
      // Fetch GitHub issues if GitHub URL exists
      if (data.github_url) {
        fetchGitHubIssues(data.github_url);
      }
    } catch (err) {
      setError(err.message);
      setCompany(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchGitHubIssues = async (githubRepoUrl) => {
    try {
      setIssuesLoading(true);
      
      // --- 1. Robust URL Parsing ---
      let owner, repo;
      try {
        const url = new URL(githubRepoUrl);
        const parts = url.pathname.split('/').filter(Boolean);
        owner = parts[0];
        repo = parts[1]; // May be undefined for org URLs
      } catch (e) {
        throw new Error("Invalid GitHub URL");
      }
      
      if (!owner) throw new Error("Invalid GitHub URL");

      // --- 2. Prepare headers (OPTIONAL TOKEN) ---
      const headers = {
        "Accept": "application/vnd.github.v3+json",
        ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
        })
      };

      // --- 3. If we have a specific repo, use REST API instead of Search API ---
      if (repo) {
        // Try to fetch issues directly from the repo using REST API
        try {
          let response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/issues?state=open&labels=good first issue&per_page=15&sort=created&direction=desc`,
            { headers }
          );
          
          if (response.ok) {
            let issues = await response.json();
            
            // If no good first issues, try getting all open issues
            if (issues.length === 0) {
              setFallbackToAll(true);
              response = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/issues?state=open&per_page=15&sort=created&direction=desc`,
                { headers }
              );
              
              if (response.ok) {
                issues = await response.json();
              }
            } else {
              setFallbackToAll(false);
            }
            
            // Filter out pull requests
            const filtered = issues.filter(issue => !issue.pull_request);
            setIssues(filtered.slice(0, 15));
            return;
          }
        } catch (error) {
          console.log("REST API failed, trying Search API:", error);
        }
      }

      // --- 4. Fallback to Search API for organizations or if REST API fails ---
      let searchQuery;
      if (repo) {
        searchQuery = `repo:${owner}/${repo} is:issue state:open label:"good first issue"`;
      } else {
        searchQuery = `org:${owner} is:issue state:open label:"good first issue"`;
      }

      let response = await fetch(
        `https://api.github.com/search/issues?q=${encodeURIComponent(searchQuery)}&per_page=15&sort=created&order=desc`,
        { headers }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `GitHub API error: ${response.status}`);
      }
      
      let result = await response.json();

      // Check for API errors
      if (result.errors) {
        throw new Error(result.message || "Unable to fetch issues");
      }

      // --- 5. If no good-first-issues, fallback automatically ---
      if (!result.items || result.items.length === 0) {
        setFallbackToAll(true);
        const fallbackQuery = repo 
          ? `repo:${owner}/${repo} is:issue state:open`
          : `org:${owner} is:issue state:open`;
        
        response = await fetch(
          `https://api.github.com/search/issues?q=${encodeURIComponent(fallbackQuery)}&per_page=15&sort=created&order=desc`,
          { headers }
        );
        
        if (response.ok) {
          result = await response.json();
        }
      } else {
        setFallbackToAll(false);
      }

      // --- 6. Remove PRs (extra safety) ---
      const filtered = result.items ? result.items.filter(issue => !issue.pull_request) : [];
      setIssues(filtered.slice(0, 15));
    } catch (err) {
      console.error("❌ GitHub Issue Error:", err);
      setIssues([]);
      setFallbackToAll(false);
    } finally {
      setIssuesLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-lg">Loading organization details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
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
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl font-bold mb-3">Organization Not Found</h2>
          <p className="text-slate-400 mb-6">The organization could not be found.</p>
          <a href="/Dashboard" className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors font-medium">
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/Dashboard" className="flex items-center gap-2 text-slate-300 hover:text-emerald-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back to Dashboard</span>
            </a>
            <div className="text-sm text-slate-400">Organization</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Organization Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-8">
          <div className="flex items-start gap-6">
            {/* Logo */}
            {company.logo_url && (
              <img
                src={company.logo_url}
                alt={company.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-contain bg-white/10 p-2 flex-shrink-0"
              />
            )}

            {/* Organization Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                {company.name}
              </h1>
              <p className="text-lg text-slate-300 mb-4 leading-relaxed">
                {company.tagline}
              </p>

              {/* Contact Links */}
              {company.contact_links && company.contact_links.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {company.contact_links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-sm"
                    >
                      {link.name}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {company.github_url && (
                  <a
                    href={company.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span>GitHub Repository</span>
                  </a>
                )}
                {company.website_url && (
                  <a
                    href={company.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Issues Section */}
        {company.github_url && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Open Issues</h2>
                {fallbackToAll && (
                  <p className="text-sm text-amber-400 mt-1">
                    No "good first issue" labels found. Showing all open issues.
                  </p>
                )}
              </div>
              {!issuesLoading && issues.length > 0 && (
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                  {issues.length} issues
                </span>
              )}
            </div>

            {issuesLoading ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-slate-400">Loading issues...</p>
              </div>
            ) : issues.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-slate-400">No open issues found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {issues.map((issue) => (
                  <a
                    key={issue.id}
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-slate-700/30 hover:bg-slate-700/50 rounded-lg p-4 transition-colors border border-slate-600/50 hover:border-emerald-500/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                          {issue.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            {issue.comments} comments
                          </span>
                          <span>•</span>
                          <span>#{issue.number}</span>
                          <span>•</span>
                          <span>{formatRelativeTime(issue.created_at)}</span>
                        </div>
                        {issue.labels && issue.labels.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {issue.labels.slice(0, 5).map((label) => (
                              <span
                                key={label.id}
                                className="px-2 py-1 rounded text-xs"
                                style={{
                                  backgroundColor: `#${label.color}20`,
                                  color: `#${label.color}`,
                                  borderColor: `#${label.color}40`,
                                  borderWidth: '1px'
                                }}
                              >
                                {label.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Description Section */}
        {company.description_html && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <div
              className="prose prose-invert max-w-none text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(company.description_html)
              }}
            />
          </div>
        )}

        {/* GitHub Metrics */}
        {company.github_metrics && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">GitHub Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">
                  {company.github_metrics.github_repos || company.github_repos || 0}
                </div>
                <div className="text-sm text-slate-400">Repositories</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">
                  {company.github_metrics.github_followers || company.github_followers || 0}
                </div>
                <div className="text-sm text-slate-400">Followers</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">
                  {company.github_metrics.merged_prs || 0}
                </div>
                <div className="text-sm text-slate-400">Merged PRs</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">
                  {(company.github_metrics.merge_frequency || 0).toFixed(2)}
                </div>
                <div className="text-sm text-slate-400">Merge Frequency</div>
              </div>
            </div>
          </div>
        )}

        {/* GitHub Bio */}
        {company.github_bio && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">GitHub Bio</h2>
            <p className="text-slate-300 leading-relaxed">{company.github_bio}</p>
          </div>
        )}

        {/* Tech Tags */}
        {company.tech_tags && company.tech_tags.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {company.tech_tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm border border-emerald-500/30 capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Topic Tags */}
        {company.topic_tags && company.topic_tags.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Topics</h2>
            <div className="flex flex-wrap gap-3">
              {company.topic_tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-full text-sm border border-slate-600 capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {company.categories && company.categories.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {company.categories.map((category, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-400 text-sm mb-1">Program Year</p>
              <p className="text-lg text-white font-semibold">{company.year || 'N/A'}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Created</p>
              <p className="text-lg text-white font-semibold">{formatDate(company.date_created)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Last Fetched</p>
              <p className="text-lg text-white font-semibold">{formatDate(company.fetched_at)}</p>
            </div>
            {company.ideas_list_url && (
              <div>
                <p className="text-slate-400 text-sm mb-1">Ideas List</p>
                <a
                  href={company.ideas_list_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-2"
                >
                  View Ideas
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}