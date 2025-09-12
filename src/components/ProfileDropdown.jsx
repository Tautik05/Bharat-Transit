export default function ProfileDropdown({ isDarkMode, setIsDarkMode, isDriverActive, setIsDriverActive }) {
  return (
    <div
      className={`absolute top-12 right-0 w-56 rounded-xl shadow-lg p-4 z-50 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
      style={{ zIndex: 9999 }}
    >
      {/* Driver Status Toggle */}
      <div className="flex items-center justify-between mb-4">
        <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Driver Status
        </p>
        <button
          onClick={() => setIsDriverActive(!isDriverActive)}
          className={`w-12 h-6 rounded-full transition-colors ${
            isDriverActive ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full transition-transform ${
              isDriverActive ? "translate-x-6" : "translate-x-1"
            } shadow-md`}
          />
        </button>
      </div>

      {/* Theme Mode Toggle */}
      <div className="flex items-center justify-between">
        <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Theme Mode
        </p>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-12 h-6 rounded-full transition-colors ${
            isDarkMode ? "bg-gray-600" : "bg-yellow-400"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full transition-transform ${
              isDarkMode ? "translate-x-6" : "translate-x-1"
            } shadow-md`}
          />
        </button>
      </div>
    </div>
  );
}
