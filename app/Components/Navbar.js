import { useState, useRef, useEffect } from 'react';

// Navbar Component
export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800/50 sticky top-0 z-50 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
                <span>GSoC Organizations</span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30">2024</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Explore 200+ Open Source Projects</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-6 mr-4">
              <a href="#" className="text-sm text-slate-300 hover:text-white transition-colors font-medium">About</a>
            </div>
            <button className="relative px-5 py-2 rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <span className="relative text-white text-sm font-semibold">Get Started</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}





