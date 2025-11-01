export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl blur-xl opacity-50"></div>
      <div className="relative">
        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search organizations by name, description, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-800/50
                   bg-slate-900/90 backdrop-blur-xl
                   text-white text-sm
                   placeholder-slate-500
                   focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                   transition-all duration-200 shadow-lg shadow-black/5"
        />
      </div>
    </div>
  );
}