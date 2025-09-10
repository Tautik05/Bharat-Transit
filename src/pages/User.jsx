// UserDashboard.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import LocationPopup from "../components/LocationPopup";
import SearchBar from "../components/SearchBar";
import MapView from "../components/MapView";
import InfoPanel from "../components/InfoPanel";
import BottomSheet from "../components/BottomSheet";


const UserDashboard = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    const permissions = localStorage.getItem("locationAllowed");
    if (permissions) {
      setShowPopup(false);
      setLocationAllowed(true);
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative pt-20 overflow-hidden">
      {showPopup && (
        <LocationPopup onAllow={handleAllowLocation} onDeny={handleDenyLocation} />
      )}

      <Header />

      <main className="p-4">
        <SearchBar onBusSelect={handleBusSelection} />

        <div className="w-full max-w-md mx-auto relative h-[60vh]">
          <MapView selectedBus={selectedBus} />
          <InfoPanel selectedBus={selectedBus} />
        </div>
      </main>

      <BottomSheet onBusSelect={handleBusSelection} />
    </div>
  );
};

export default UserDashboard;
