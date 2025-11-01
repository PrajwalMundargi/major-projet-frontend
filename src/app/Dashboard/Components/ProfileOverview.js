export default function ProfileOverview() {
  const contributions = [
    { date: 'Oct', count: 1, level: 1 },
    { date: 'Nov', count: 0, level: 0 },
    { date: 'Dec', count: 3, level: 2 },
    { date: 'Jan', count: 5, level: 3 },
    { date: 'Feb', count: 2, level: 1 },
    { date: 'Mar', count: 4, level: 2 },
    { date: 'Apr', count: 0, level: 0 },
    { date: 'May', count: 6, level: 4 },
    { date: 'Jun', count: 0, level: 0 },
    { date: 'Jul', count: 1, level: 1 },
    { date: 'Aug', count: 7, level: 4 },
    { date: 'Sep', count: 3, level: 2 },
  ];

  const getContriColor = (level) => {
    switch (level) {
      case 1: return 'bg-emerald-900/50 border border-emerald-800/30';
      case 2: return 'bg-emerald-700/60 border border-emerald-600/40';
      case 3: return 'bg-emerald-600/80 border border-emerald-500/50';
      case 4: return 'bg-emerald-500 border border-emerald-400/60';
      default: return 'bg-slate-800/50 border border-slate-700/30';
    }
  };

  return (
    <div className="py-8 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Card */}
        <div className="w-full lg:w-80">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800/50 p-6 shadow-xl">
              <div className="relative w-28 h-28 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-md opacity-50"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center ring-4 ring-slate-900/50">
                  <span className="text-4xl font-bold text-white">R</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-emerald-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <h1 className="text-xl font-bold text-white text-center mb-1">
                RamyaGururaj
              </h1>
              <p className="text-sm text-slate-400 text-center mb-6">
                @RamyaGururaj
              </p>
              
              <button className="w-full py-2.5 mb-6 rounded-xl text-sm font-semibold 
                               bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600
                               text-white border border-slate-700/50
                               transition-all duration-200 shadow-lg shadow-black/10">
                Edit profile
              </button>

              <div className="flex items-center justify-center text-sm text-slate-400 space-x-4 pt-4 border-t border-slate-800/50">
                <div className="flex items-center space-x-1.5 hover:text-emerald-400 transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-semibold text-white">2</span>
                  <span>followers</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                <div className="flex items-center space-x-1.5 hover:text-emerald-400 transition-colors cursor-pointer">
                  <span className="font-semibold text-white">3</span>
                  <span>following</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Calendar */}
        <div className="flex-1">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800/50 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">
                    Contribution Activity
                  </h2>
                  <p className="text-sm text-slate-400">30 contributions in the last year</p>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span>Total</span>
                  <span className="px-2 py-1 bg-slate-800 rounded-md text-emerald-400 font-semibold">30</span>
                </div>
              </div>
              
              <div className="overflow-x-auto pb-2">
                <div className="flex space-x-2.5 min-w-max">
                  {contributions.map((monthData, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-slate-500 mb-2.5">
                        {monthData.date}
                      </span>
                      <div className="flex flex-col space-y-2">
                        {Array.from({ length: 7 }).map((_, dayIndex) => (
                          <div
                            key={dayIndex}
                            className={`w-4 h-4 rounded-sm ${getContriColor(dayIndex === 2 ? monthData.level : 0)} transition-all hover:scale-110 cursor-pointer`}
                            title={`${monthData.count} contributions`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800/50">
                <a href="#" className="text-xs text-slate-400 hover:text-emerald-400 transition-colors flex items-center space-x-1">
                  <span>Learn how we count contributions</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <div className="flex items-center space-x-2.5">
                  <span className="text-xs text-slate-500 font-medium">Less</span>
                  <div className="flex space-x-1.5">
                    <div className="w-4 h-4 rounded-sm bg-slate-800/50 border border-slate-700/30"></div>
                    <div className="w-4 h-4 rounded-sm bg-emerald-900/50 border border-emerald-800/30"></div>
                    <div className="w-4 h-4 rounded-sm bg-emerald-700/60 border border-emerald-600/40"></div>
                    <div className="w-4 h-4 rounded-sm bg-emerald-600/80 border border-emerald-500/50"></div>
                    <div className="w-4 h-4 rounded-sm bg-emerald-500 border border-emerald-400/60"></div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
