import { useState } from "react";
import LocationPopup from "../components/LocationPopup";
import ProfileDropdown from "../components/ProfileDropdown";
import Map from "../components/Map";
import RouteInfo from "../components/RouteInfo";

export default function DriverDashboard() {
  const [isDriverActive, setIsDriverActive] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(true);

  // Example bus stands with detailed info
  const busStands = [
    { 
      name: "Central Bus Terminal", 
      coords: [22.585, 88.4],
      location: "Park Street, Kolkata",
      distance: "2.3 km",
      eta: "8 mins"
    },
    { 
      name: "Salt Lake Sector V", 
      coords: [22.6, 88.42],
      location: "IT Hub, Salt Lake City",
      distance: "5.7 km",
      eta: "15 mins"
    },
  ];

  // Hardcoded bus location
  const busLocation = [22.5805, 88.392];
  const busRoute = [busLocation, busStands[0].coords, busStands[1].coords];

  const handleAllow = () => setShowLocationPopup(false);
  const handleDeny = () => setShowLocationPopup(false);

  return (
    <div className={`min-h-screen flex flex-col max-w-sm mx-auto relative ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {showLocationPopup && (
        <LocationPopup onAllow={handleAllow} onDeny={handleDeny} />
      )}

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

      <Map busLocation={busLocation} busStands={busStands} busRoute={busRoute} />

      <RouteInfo busStands={busStands} isDarkMode={isDarkMode} />
    </div>
  );
}

