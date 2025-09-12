// UserDashboard.jsx
import React, { useState, useEffect } from "react";
import LocationPopup from "../components/LocationPopup";
import MapView from "../components/MapView";
import BottomSheet from "../components/BottomSheet";
import RecenterButton from "../components/RecenterButton";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const popularBuses = [
  {
    id: 1,
    name: "SD5: Khariberia to Sonarpur",
    vehicle: "WB SD 1234",
    start: ["Khariberia", "Sector V"],
    end: ["Sonarpur", "Junction"],
    startTime: "06:30 AM",
    eta: "07:15 AM",
    traffic: "Moderate",
    duration: "45",
  },
  {
    id: 2,
    name: "41A: Howrah Station to Ultadanga",
    vehicle: "WB 41A 5678",
    start: ["Howrah", "Station"],
    end: ["Ultadanga", "More"],
    startTime: "07:00 AM",
    eta: "07:50 AM",
    traffic: "Heavy",
    duration: "50",
  },
  {
    id: 3,
    name: "41B: Dum Dum to Garia",
    vehicle: "WB 41B 9101",
    start: ["Dum Dum", "Metro"],
    end: ["Garia", "Station"],
    startTime: "06:45 AM",
    eta: "07:35 AM",
    traffic: "Light",
    duration: "50",
  },
  {
    id: 4,
    name: "S9: Shyambazar to New Town",
    vehicle: "WB S9 1112",
    start: ["Shyambazar", "5 Point"],
    end: ["New Town", "Action Area"],
    startTime: "06:50 AM",
    eta: "07:40 AM",
    traffic: "Moderate",
    duration: "50",
  },
  {
    id: 5,
    name: "C11: Belgachia to Howrah Maidan",
    vehicle: "WB C11 1314",
    start: ["Belgachia", "More"],
    end: ["Howrah", "Maidan"],
    startTime: "07:10 AM",
    eta: "08:00 AM",
    traffic: "Heavy",
    duration: "50",
  },
];

const UserDashboard = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [mapCenter, setMapCenter] = useState([22.5726, 88.3639]); // Kolkata
  const [theme, setTheme] = useState("light");

  const handleAllowLocation = () => {
    setLocationAllowed(true);
    setShowPopup(false);
    localStorage.setItem("locationAllowed", "true");
  };

  const handleDenyLocation = () => {
    setLocationAllowed(false);
    setShowPopup(false);
  };

  const handleBusSelection = (bus) => {
    setSelectedBus(bus);
  };

  const handleRecenter = () => {
    setMapCenter([22.5726, 88.3639]);
  };

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const MAP_AREA_HEIGHT = 300; // The visible height of the map
  const TOP_OFFSET = 130; // Combined height of Header and SearchBar

  return (
<>
<style>{`
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>
<div className={`min-h-screen md:flex md:justify-center md:items-center md:p-4 md:py-10 transition-colors duration-300 ${
  theme === "dark" 
    ? "bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black" 
    : "bg-gray-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-gray-100"
}`}>
  {/* Mobile frame container */}
  <div className={`w-full md:max-w-sm md:shadow-2xl overflow-hidden h-screen md:rounded-3xl relative ${
    theme === "dark" ? "bg-zinc-900 text-white border border-zinc-700" : "bg-white"
  }`}>
    
    {/* Location Popup always on reload */}
    {showPopup && (
      <LocationPopup
        theme={theme}
        onAllow={handleAllowLocation}
        onDeny={handleDenyLocation}
      />
    )}

    {/* Fixed Header */}
{!showPopup && (
      <>
        <div className={`absolute top-0 left-0 right-0 z-50 flex items-center px-4 h-[60px] transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
          <Header onThemeChange={handleThemeChange} theme={theme} />
        </div>
        {/* Fixed SearchBar below Header */}
        <div className={`absolute top-[60px] left-0 right-0 z-30 p-3 shadow-sm transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
          <SearchBar onBusSelect={handleBusSelection} theme={theme} popularBuses={popularBuses} />
        </div>

        {/* Map container - fixed position under header/search */}
        <div
          className="absolute left-0 right-0 z-10 rounded-b-2xl overflow-hidden"
          style={{ top: TOP_OFFSET, height: MAP_AREA_HEIGHT }}
        >
          <MapView
            selectedBus={selectedBus}
            center={mapCenter}
            setCenter={setMapCenter}
            theme={theme}
          />
          <div className="absolute bottom-4 right-4 z-20">
            <RecenterButton onClick={handleRecenter} theme={theme} />
          </div>
        </div>

        {/* Scrollable content container */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto no-scrollbar">
          {/* This spacer pushes the content down below the map */}
          <div style={{ height: TOP_OFFSET + MAP_AREA_HEIGHT }} />
          
          <div className="relative z-20">
            <BottomSheet
              selectedBus={selectedBus}
              onBusSelect={handleBusSelection}
              theme={theme}
              popularBuses={popularBuses}
            />
          </div>
        </div>
      </>
    )}
  </div>
</div>
</>
  );
};

export default UserDashboard;
