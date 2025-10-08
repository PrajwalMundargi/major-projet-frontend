// components/ProfileOverview.js

// NO IMPORT NEEDED: The React Icon import is removed.

export default function ProfileOverview() {
  const contributions = [
    // Placeholder data for the calendar grid (Year 2024 is the example)
    { date: 'Oct-23', count: 1, level: 1 },
    { date: 'Nov-23', count: 0, level: 0 },
    { date: 'Dec-23', count: 3, level: 2 },
    { date: 'Jan-24', count: 5, level: 3 },
    { date: 'Feb-24', count: 2, level: 1 },
    { date: 'Mar-24', count: 4, level: 2 },
    { date: 'Apr-24', count: 0, level: 0 },
    { date: 'May-24', count: 6, level: 4 },
    { date: 'Jun-24', count: 0, level: 0 },
    { date: 'Jul-24', count: 1, level: 1 },
    { date: 'Aug-24', count: 7, level: 4 },
    { date: 'Sep-24', count: 3, level: 2 },
  ];

  // Helper function for contribution square color based on level
  const getContriColor = (level) => {
    switch (level) {
      case 1: return 'bg-gh-primary/20';
      case 2: return 'bg-gh-primary/50';
      case 3: return 'bg-gh-primary/75';
      case 4: return 'bg-gh-primary';
      default: return 'bg-gh-light-dark dark:bg-gh-dark-light/50'; // Level 0 or no contribution
    }
  };

  return (
    <div className="py-6 border-b border-gh-light-dark dark:border-gh-dark-light mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Profile Card */}
        <div className="w-full lg:w-1/4">
          <div className="p-4 rounded-xl bg-gh-light dark:bg-gh-dark-light border border-gh-light-dark dark:border-gh-dark-light">
            {/* Profile Avatar */}
            <div className="w-24 h-24 mx-auto mb-4 bg-gh-primary/50 rounded-full border-4 border-gh-primary/70 dark:border-gh-primary/80 flex items-center justify-center text-4xl text-gh-light">
              R
            </div>
            
            <h1 className="text-xl font-bold text-gh-dark dark:text-gh-light text-center">RamyaGururaj</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">RamyaGururaj</p>
            
            <button className="w-full py-1.5 mb-4 rounded-md text-sm font-medium 
                             border border-gh-light-dark dark:border-gh-dark-light 
                             bg-gh-light dark:bg-gh-dark-light 
                             
                             hover:bg-gray-200 dark:hover:bg-gh-dark 
                             
                             active:bg-gh-primary/75 active:border-gh-primary 
                             active:text-white dark:active:text-white active:shadow-inner 
                             
                             text-gh-dark dark:text-gh-light transition-colors">
              Edit profile
            </button>

            {/* Followers/Following - Replaced FiUsers with SVG */}
            <div className="flex items-center text-sm text-gh-dark dark:text-gh-light space-x-2">
              <svg 
                className="w-4 h-4 text-gray-500 dark:text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Standard Users/Followers icon path */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V8a2 2 0 00-2-2h-3M6 16v-6a4 4 0 014-4h4a4 4 0 014 4v6M10 20h4M4 12H2M22 12h-2M15 4a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>
                <span className="font-semibold">2</span> followers
              </span>
              <span className="text-gray-400 dark:text-gray-600">·</span>
              <span>
                <span className="font-semibold">3</span> following
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Contribution Calendar */}
        <div className="w-full lg:w-3/4">
          <div className="bg-gh-light dark:bg-gh-dark-light p-4 rounded-xl border border-gh-light-dark dark:border-gh-dark-light">
            <h2 className="text-lg font-semibold mb-3 text-gh-dark dark:text-gh-light">
              30 contributions in the last year
            </h2>
            
            {/* Contribution Grid */}
            <div className="overflow-x-auto pb-2">
              <div className="flex space-x-1">
                {contributions.map((monthData, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {/* Month Label */}
                    <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {monthData.date.split('-')[0]}
                    </span>
                    {/* Placeholder for the 7 days of the week */}
                    <div className="flex flex-col space-y-1">
                      {Array.from({ length: 7 }).map((_, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`w-3 h-3 rounded-sm ${getContriColor(dayIndex === 2 ? monthData.level : 0)}`}
                          title={`Date: ${monthData.date}, Contribs: ${dayIndex === 2 ? monthData.count : 0}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs mt-3">
              <span className="text-gray-600 dark:text-gray-400">
                Learn how we count contributions.
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-gray-600 dark:text-gray-400">Less</span>
                <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-sm bg-gh-light-dark dark:bg-gh-dark-light/50"></div>
                    <div className="w-3 h-3 rounded-sm bg-gh-primary/20"></div>
                    <div className="w-3 h-3 rounded-sm bg-gh-primary/50"></div>
                    <div className="w-3 h-3 rounded-sm bg-gh-primary/75"></div>
                    <div className="w-3 h-3 rounded-sm bg-gh-primary"></div>
                </div>
                <span className="text-gray-600 dark:text-gray-400">More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}