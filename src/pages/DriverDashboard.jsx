import { useState } from "react";
import LocationPopup from "../components/LocationPopup";
import Header from "../components/Head";
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

      <Header 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isDriverActive={isDriverActive}
        setIsDriverActive={setIsDriverActive}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
      />

      <Map busLocation={busLocation} busStands={busStands} busRoute={busRoute} />

      <RouteInfo busStands={busStands} isDarkMode={isDarkMode} />
    </div>
  );
}

