import { useState, useEffect } from "react";
import { MapPin, Bus, UserPlus, PlusCircle, Wrench, Route, User, LogOut } from "lucide-react";
import BharatTransitLogo from "../components/Logo";
import busIcon from "../assets/busicon.png";

export default function AgencyDashboard() {
  const [assignedBuses, setAssignedBuses] = useState([
    { id: "WB 45D 1234", route: "SD5: Khariberia → Sonarpur", driver: "Rajesh", status: "Active", lat: 22.5726, lng: 88.3639 },
    { id: "WB 41B 9101", route: "41B: Dum Dum → Garia", driver: "Amit", status: "Inactive", lat: 22.6414, lng: 88.4372 },
    { id: "WB 22C 5678", route: "22C: Howrah → Sealdah", driver: "Suresh", status: "Active", lat: 22.5958, lng: 88.2636 },
    { id: "WB 30A 7890", route: "30A: Esplanade → Garia", driver: "Ramesh", status: "Active", lat: 22.5675, lng: 88.3758 },
    { id: "WB 12B 3456", route: "12B: Shyambazar → Tollygunge", driver: "Mukesh", status: "Inactive", lat: 22.5448, lng: 88.3426 }
  ]);
  const [showProfile, setShowProfile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const activeBuses = assignedBuses.filter(bus => bus.status === 'Active');
  
  useEffect(() => {
    const handleClickOutside = () => setShowProfile(false);
    if (showProfile) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showProfile]);

  return (
    <div className={`w-full min-h-screen transition-colors ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 flex items-center justify-between p-3 lg:p-6 shadow transition-colors ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center">
          <BharatTransitLogo size="sm" theme={darkMode ? 'dark' : 'light'} />
          <span className={`ml-2 text-xs lg:text-sm font-medium ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Agency</span>
        </div>
        <div className="relative">
          <button 
            onClick={(e) => { e.stopPropagation(); setShowProfile(!showProfile); }}
            className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            <User className="w-4 h-4 text-white" />
          </button>
          {showProfile && (
            <div className={`absolute right-0 top-8 rounded-lg shadow-lg border p-2 w-40 z-[60] transition-colors ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
            }`}>
              <div className={`flex items-center justify-between p-2 rounded transition-colors ${
                darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50'
              }`}>
                <span className="text-xs">Dark Mode</span>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-8 h-4 rounded-full flex items-center transition-colors ${
                    darkMode ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                    darkMode ? 'translate-x-4' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>
              <button 
                onClick={() => alert('Signing out...')}
                className={`w-full flex items-center p-2 text-red-500 rounded text-xs transition-colors ${
                  darkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
                }`}
              >
                <LogOut className="w-3 h-3 mr-2" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Map Section */}
      <div className="relative w-full h-48 lg:h-96 overflow-hidden">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=88.2000%2C22.4500%2C88.4500%2C22.7000&layer=mapnik"
          className="w-full h-full border-0"
          title="Kolkata Map"
        ></iframe>
        
        {/* Bus Icons Overlay */}
        {activeBuses.map((bus, idx) => {
          // Map bounds for the embedded map
          const mapBounds = {
            west: 88.2000,
            east: 88.4500,
            north: 22.7000,
            south: 22.4500
          };
          
          // More precise coordinate mapping
          const x = Math.max(0, Math.min(100, ((bus.lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100));
          const y = Math.max(0, Math.min(100, ((mapBounds.north - bus.lat) / (mapBounds.north - mapBounds.south)) * 100));
          
          return (
            <div
              key={bus.id}
              className="absolute pointer-events-none"
              style={{ 
                left: `calc(${x}% - 12px)`, 
                top: `calc(${y}% - 12px)`,
                transform: 'none'
              }}
            >
              <div className="relative pointer-events-auto cursor-pointer" title={`${bus.id} - ${bus.route}`}>
                <img 
                  src={busIcon} 
                  alt="Bus" 
                  className="w-6 h-6 drop-shadow-lg hover:scale-110 transition-transform"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-xs px-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity z-10">
                  {bus.id}
                </div>
              </div>
            </div>
          );
        })}
        
        <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium shadow transition-colors ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          Active Buses: {activeBuses.length}
        </div>
        <button className={`absolute bottom-2 right-2 p-2 rounded-full shadow transition-colors ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <MapPin className="w-4 h-4 text-blue-500" />
        </button>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-6 p-3 lg:p-6">
        <ActionCard darkMode={darkMode} icon={<UserPlus className="w-6 h-6 text-blue-600" />} title="Assign Drivers" />
        <ActionCard darkMode={darkMode} icon={<PlusCircle className="w-6 h-6 text-green-600" />} title="Add Vehicles" />
        <ActionCard darkMode={darkMode} icon={<Bus className="w-6 h-6 text-purple-600" />} title="Manage Buses" />
        <ActionCard darkMode={darkMode} icon={<Wrench className="w-6 h-6 text-orange-600" />} title="Update Vehicle Info" />
        <ActionCard darkMode={darkMode} icon={<Route className="w-6 h-6 text-red-600" />} title="Add / Update Routes" />
      </div>

      {/* Assigned Buses List */}
      <section className="p-3 lg:p-6">
        <h2 className="text-sm lg:text-base font-semibold mb-2 lg:mb-4">Assigned Buses</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4">
          {assignedBuses.map((bus, idx) => (
            <div key={idx} className={`p-2.5 lg:p-4 rounded-lg shadow flex justify-between items-center transition-colors ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div>
                <p className="text-xs lg:text-sm font-bold">{bus.route}</p>
                <p className={`text-xs lg:text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>{bus.id} • Driver: {bus.driver}</p>
              </div>
              <span
                className={`text-xs lg:text-sm font-semibold px-2 py-1 rounded-full ${
                  bus.status === "Active" 
                    ? "bg-green-100 text-green-700" 
                    : darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                }`}
              >
                {bus.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ActionCard({ icon, title, darkMode }) {
  return (
    <button className={`p-3 lg:p-4 rounded-lg shadow flex flex-col items-center justify-center text-center h-20 lg:h-24 transition-colors ${
      darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
    }`}>
      {icon}
      <span className="mt-1 text-xs lg:text-sm font-medium">{title}</span>
    </button>
  );
}
