export default function Footer() {
  return (
    <footer className="w-full mt-20 py-12 border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <span className="text-base font-bold text-white">GSoC Organizations</span>
              <p className="text-xs text-slate-500">Google Summer of Code 2024</p>
            </div>
          </div>
          
          <p className="text-sm text-slate-400 text-center max-w-md">
            Discover and contribute to 200+ open source projects from around the world
          </p>
          
          <div className="flex items-center space-x-8 text-sm">
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors font-medium flex items-center space-x-1">
              <span>About</span>
            </a>
            <div className="w-1 h-1 rounded-full bg-slate-700"></div>
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors font-medium flex items-center space-x-1">
              <span>GitHub</span>
            </a>
            <div className="w-1 h-1 rounded-full bg-slate-700"></div>
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors font-medium flex items-center space-x-1">
              <span>Documentation</span>
            </a>
            <div className="w-1 h-1 rounded-full bg-slate-700"></div>
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors font-medium flex items-center space-x-1">
              <span>Contact</span>
            </a>
          </div>
          
          <div className="pt-6 border-t border-slate-800/50 w-full text-center">
            <p className="text-xs text-slate-600">
              © 2024 Google Summer of Code. Built with passion for open source.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
