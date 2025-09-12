import ProfileDropdown from "./ProfileDropdown";

export default function Head({ 
  isDarkMode, setIsDarkMode, 
  isDriverActive, setIsDriverActive, 
  showProfile, setShowProfile 
}) {
  return (
    <header className={`px-4 py-3 flex justify-between items-center shadow-lg sticky top-0 z-[9999] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-emerald-600 text-white'}`}>
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-emerald-700'}`}>
          🚌
        </div>
        <div>
          <h1 className="text-base font-bold">Driver</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-emerald-100'}`}>Bus #24</p>
        </div>
      </div>

      {/* Profile Button */}
      <div className="relative">
        <button 
          onClick={() => setShowProfile(!showProfile)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors ${isDarkMode ? 'bg-gray-700 active:bg-gray-600' : 'bg-emerald-700 active:bg-emerald-800'}`}
        >
          👤
        </button>
        {showProfile && (
          <ProfileDropdown
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            isDriverActive={isDriverActive}
            setIsDriverActive={setIsDriverActive}
          />
        )}
      </div>
    </header>
  );
}
