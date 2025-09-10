// UserDashboard.jsx
import React, { useState, useEffect } from "react";
import { MdMyLocation } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Header from "../components/Header";
import LocationPopup from "../components/LocationPopup";
import SearchBar from "../components/SearchBar";
import MapView from "../components/MapView";
import InfoPanel from "../components/InfoPanel";
import BottomSheet from "../components/BottomSheet";
import RecenterButton from "../components/RecenterButton";

const UserDashboard = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [mapCenter, setMapCenter] = useState([22.5726, 88.3639]); // Kolkata
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Listen to scroll
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Calculate heights (smooth transition)
    const maxMapHeight = 300;
    const minMapHeight = 0; // fully collapsed when sheet docked
    const mapHeight = Math.max(minMapHeight, maxMapHeight - scrollY);


  return (
<div className={`min-h-screen flex justify-center items-start py-10 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-200"}`}>
  {/* Mobile frame container */}
  <div className={`bg-white w-full md:max-w-sm sm:max-w-full shadow-xl overflow-hidden flex flex-col min-h-screen ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}>
    
    {/* Location Popup always on reload */}
    {showPopup && (
      <LocationPopup
        onAllow={handleAllowLocation}
        onDeny={handleDenyLocation}
      />
    )}

    {/* Fixed Header */}
{!showPopup && (
  <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm bg-white flex items-center justify-between px-4 h-[60px]">
    <Header onThemeChange={handleThemeChange} />
  </div>
)}
    {/* Fixed SearchBar below Header */}
    <div className="fixed top-[60px] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-sm bg-white p-3 shadow-sm">
    <SearchBar onBusSelect={handleBusSelection} />
    </div>

    {/* Spacer for header + search */}
    <div className="h-[95px]" />

{/* Scrollable content */}
<div
  className="flex-1 overflow-y-auto"
  onScroll={(e) => setScrollY(e.target.scrollTop)}
>
  {/* Map */}
  <div
    className="transition-all duration-300 ease-in-out rounded-b-3xl overflow-hidden relative"
    style={{ height: `${Math.max(0, 300 - scrollY)}px` }}
  >
    <MapView
      selectedBus={selectedBus}
      center={mapCenter}
      setCenter={setMapCenter}
    />

    {/* Recenter Button floating over the map */}
    {scrollY < 100 && (
      <div className="absolute bottom-4 right-4 z-20">
        <RecenterButton onClick={handleRecenter} />
      </div>
    )}
  </div>

  {/* Bottom Sheet full height */}
  <div className="flex-1 min-h-[calc(100vh-95px)]">
    <BottomSheet
        selectedBus={selectedBus}
        // onBusSelect={handleBusSelect}
      scrollProgress={scrollY}
      onBusSelect={handleBusSelection}
    />
  </div>
</div>
</div>
</div>

  );
};

export default UserDashboard;
