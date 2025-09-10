import { useState } from "react";
import LocationPopup from "../components/LocationPopup"; // ✅ import popup

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ✅ Custom bus icon
import busIconImg from "../assets/busicon.png"; // move your bus.png inside src/assets
const busIcon = new L.Icon({
  iconUrl: busIconImg,
  iconSize: [40, 40], // adjust size
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// ✅ Fix default marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

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

  // Hardcoded bus location (somewhere near Kolkata, on the way to Stand 1)
  const busLocation = [22.5805, 88.392];

  // Route lines (bus → Stand1 → Stand2)
  const busRoute = [busLocation, busStands[0].coords, busStands[1].coords];
    // ✅ Handle location popup actions
  const handleAllow = () => {
    console.log("Location allowed ✅");
    setShowLocationPopup(false);
    // here you can also call `navigator.geolocation.getCurrentPosition(...)`
  };

  const handleDeny = () => {
    console.log("Location denied ❌");
    setShowLocationPopup(false);
  };

  return (
    <div className={`min-h-screen flex flex-col max-w-sm mx-auto relative ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* ✅ Show popup only when true */}
      {showLocationPopup && (
        <LocationPopup onAllow={handleAllow} onDeny={handleDeny} />
      )}
      {/* Mobile Header */}
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

          {/* Small Dropdown Box */}
          {showProfile && (
            <div
              className={`absolute top-12 right-0 w-56 rounded-xl shadow-lg p-4 z-50 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
              style = {{ zIndex:9999 }}
            >
              {/* Driver Status Toggle */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    Driver Status
                  </p>
                </div>
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
                <div>
                  <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    Theme Mode
                  </p>
                </div>
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
          )}
        </div>
      </header>

      {/* Map */}
      <div className="flex-1 p-3">
        <MapContainer
          center={busLocation}
          zoom={15}
          style={{ height: "50vh", width: "100%" }}
          className="rounded-2xl shadow-lg border-2 border-white"
          zoomControl={false}
        >
          {/* Base map */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          />

          {/* Bus Marker */}
          <Marker position={busLocation} icon={busIcon}>
            <Popup>Bus currently here 🚌</Popup>
          </Marker>

          {/* Stand Markers */}
          {busStands.map((stand, idx) => (
            <Marker key={idx} position={stand.coords}>
              <Popup>{stand.name}</Popup>
            </Marker>
          ))}

          {/* Route Polyline */}
          <Polyline positions={busRoute} color="blue" />
        </MapContainer>
      </div>

      {/* Route Info Cards */}
      <div className={`rounded-t-3xl shadow-2xl p-4 space-y-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
        <h2 className={`text-base font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Route Information</h2>
        
        {/* Next Stop Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                📍
              </div>
              <span className="font-semibold">Next Stop</span>
            </div>
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <span className="text-sm font-bold text-black">{busStands[0].eta}</span>
            </div>
          </div>
          <h3 className="font-bold text-lg mb-1">{busStands[0].name}</h3>
          <p className="text-blue-100 text-sm mb-2">{busStands[0].location}</p>
          <div className="flex items-center gap-1">
            <span className="text-sm">🚌</span>
            <span className="text-sm font-medium">{busStands[0].distance} away</span>
          </div>
        </div>
        
        {/* Following Stop Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                ➡️
              </div>
              <span className="font-semibold">Following Stop</span>
            </div>
            <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <span className="text-sm font-bold text-black">{busStands[1].eta}</span>
            </div>
          </div>
          <h3 className="font-bold text-lg mb-1">{busStands[1].name}</h3>
          <p className="text-green-100 text-sm mb-2">{busStands[1].location}</p>
          <div className="flex items-center gap-1">
            <span className="text-sm">🚌</span>
            <span className="text-sm font-medium">{busStands[1].distance} away</span>
          </div>
        </div>
        
        {/* Safe area for iPhone home indicator */}
        <div className="h-6" />
      </div>
    </div>
  );
}
