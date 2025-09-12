import React, { useState, useEffect, useRef } from "react";
import { 
  Home, Building2, Bus, MapPin, Users, Settings, 
  Plus, Bell, Menu, X, Clock, Route,
  Truck, CheckCircle, Navigation, User, LogOut
} from "lucide-react";
import BharatTransitLogo from "../components/Logo.jsx";


const BusDepot = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [newRoute, setNewRoute] = useState("");
  const [routes, setRoutes] = useState([]);

  // Sample Data
  const [agencies, setAgencies] = useState([
    { 
      id: 1, 
      name: "SD5", 
      contact: "Mr. Sharma", 
      phone: "+91 98765 43210",
      totalBuses: 15,
      activeBuses: 12,
      maintenanceBuses: 3,
      routes: ["Route 45A", "Route 67B", "Route 23C"]
    },
    { 
      id: 2, 
      name: "41A", 
      contact: "Ms. Priya Das", 
      phone: "+91 87654 32109",
      totalBuses: 8,
      activeBuses: 7,
      maintenanceBuses: 1,
      routes: ["Route 12X", "Route 34Y"]
    },
    { 
      id: 3, 
      name: "S9", 
      contact: "Mr. Raj Kumar", 
      phone: "+91 76543 21098",
      totalBuses: 22,
      activeBuses: 20,
      maintenanceBuses: 2,
      routes: ["Route 89D", "Route 56E", "Route 78F", "Route 90G"]
    }
  ]);

  const [incomingBuses, setIncomingBuses] = useState([
    {
      id: 1,
      vehicleNo: "WB10X4321",
      agency: "SD5",
      driver: "Amit Kumar",
      route: "Route 45A",
      currentLocation: "Salt Lake Sector V",
      distanceFromDepot: 8.5,
      eta: "25 mins",
      speed: 35,
      lastUpdate: "2 mins ago",
      status: "on-route"
    },
    {
      id: 2,
      vehicleNo: "WB19Z8765",
      agency: "Metro Connect",
      driver: "Rohit Das",
      route: "Route 12X",
      currentLocation: "Park Street",
      distanceFromDepot: 3.2,
      eta: "8 mins",
      speed: 28,
      lastUpdate: "1 min ago",
      status: "approaching"
    },
    {
      id: 3,
      vehicleNo: "WB15B3456",
      agency: "City Riders",
      driver: "Suresh Singh",
      route: "Route 89D",
      currentLocation: "Howrah Bridge",
      distanceFromDepot: 12.8,
      eta: "35 mins",
      speed: 42,
      lastUpdate: "3 mins ago",
      status: "on-route"
    }
  ]);

  const [newAgency, setNewAgency] = useState({
    name: '',
    contact: '',
    phone: '',
    totalBuses: '',
    routes: []
  });

  const [routeInput, setRouteInput] = useState('');

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setShowProfile(false);
    if (showProfile) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showProfile]);

  const handleRouteChange = (e) => {
    setRouteInput(e.target.value);
  };

  const handleRouteKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newRoute = routeInput.trim();
      if (newRoute && !newAgency.routes.includes(newRoute)) {
        setNewAgency({ ...newAgency, routes: [...newAgency.routes, newRoute] });
      }
      setRouteInput('');
    }
  };

const removeRoute = (route) => {
  setNewAgency(prev => ({
    ...prev,
    routes: prev.routes.filter(r => r !== route),
  }));
};


  const addAgency = () => {
    if (newAgency.name && newAgency.contact && newAgency.phone) {
      const agency = {
        id: Date.now(),
        name: newAgency.name,
        contact: newAgency.contact,
        phone: newAgency.phone,
        totalBuses: parseInt(newAgency.totalBuses) || 0,
        activeBuses: parseInt(newAgency.totalBuses) || 0,
        maintenanceBuses: 0,
        routes: newAgency.routes.filter(r => r)
      };
      setAgencies([...agencies, agency]);
      setNewAgency({ name: '', contact: '', phone: '', totalBuses: '', routes: [] });
      setRouteInput('');
    }
  };

  const getStatusColor = (status) => {
    if (darkMode) {
      switch (status) {
        case 'approaching': return 'bg-green-900/50 text-green-300 border-green-800';
        case 'on-route': return 'bg-blue-900/50 text-blue-300 border-blue-800';
        case 'delayed': return 'bg-red-900/50 text-red-300 border-red-800';
        default: return 'bg-gray-700 text-gray-300 border-gray-600';
      }
    }
    switch (status) {
      case 'approaching': return 'bg-green-100 text-green-800 border-green-200';
      case 'on-route': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delayed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDistanceColor = (distance) => {
    if (darkMode) {
      if (distance <= 5) return 'text-green-400';
      if (distance <= 10) return 'text-yellow-400';
      return 'text-red-400';
    }
    if (distance <= 5) return 'text-green-600';
    if (distance <= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'agencies', label: 'Agencies', icon: Building2 },
    { id: 'tracking', label: 'Live Tracking', icon: MapPin },
    { id: 'add-agency', label: 'Add Agency', icon: Plus },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const Sidebar = () => (
    <div
  className={`fixed inset-y-0 left-0 z-50 w-64 ${darkMode ? 'bg-zinc-800' : 'bg-white'} shadow-xl transform transition-transform duration-300 ease-in-out ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } lg:translate-x-0 lg:static lg:inset-0`}
>
  {/* Sidebar Header */}
  <div className={`flex items-center justify-between h-16 px-6 ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
    <BharatTransitLogo theme={darkMode ? 'dark' : 'light'} />
    <h1 className={`${darkMode ? 'text-white' : 'text-gray-800'} font-bold text-lg`}>Depot</h1>
    <button
      onClick={() => setSidebarOpen(false)}
      className={`lg:hidden ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
    >
      <X className="w-6 h-6" />
    </button>
  </div>
      
      <nav className="mt-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                currentPage === item.id 
                  ? `text-blue-600 border-r-2 border-blue-600 ${darkMode ? 'bg-blue-900/50' : 'bg-blue-50'}` 
                  : `${darkMode ? 'text-zinc-300 hover:bg-zinc-700' : 'text-gray-600 hover:bg-blue-50'}`
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );

  const Navbar = () => (
    <header className={`${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white'} shadow-sm border-b`}>
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className={`lg:hidden ${darkMode ? 'text-zinc-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mr-4`}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:block">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} capitalize`}>
              {currentPage.replace('-', ' ')}
            </h2>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
          <Bell className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowProfile(!showProfile); }}
              className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <User className="w-5 h-5 text-white" />
            </button>
            {showProfile && (
              <div className={`absolute right-0 top-10 rounded-lg shadow-lg border p-2 w-48 z-10 transition-colors ${
                darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'
              }`}>
                <div className={`flex items-center justify-between p-2 rounded transition-colors ${
                  darkMode ? 'hover:bg-zinc-700' : 'hover:bg-gray-50'
                }`}>
                  <span className="text-sm">Dark Mode</span>
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-10 h-5 rounded-full flex items-center transition-colors ${
                      darkMode ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      darkMode ? 'translate-x-5' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
                <div className={`my-1 border-t ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}></div>
                <button 
                  onClick={() => alert('Signing out...')}
                  className={`w-full flex items-center p-2 text-red-500 rounded text-sm transition-colors ${
                    darkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
                  }`}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  const DashboardPage = () => {
    const totalAgencies = agencies.length;
    const totalBuses = agencies.reduce((sum, agency) => sum + agency.totalBuses, 0);
    const activeBuses = agencies.reduce((sum, agency) => sum + agency.activeBuses, 0);
    const maintenanceBuses = agencies.reduce((sum, agency) => sum + agency.maintenanceBuses, 0);

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white'} rounded-xl p-6 shadow-sm border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Total Agencies</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{totalAgencies}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white'} rounded-xl p-6 shadow-sm border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Total Buses</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{totalBuses}</p>
              </div>
              <Bus className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white'} rounded-xl p-6 shadow-sm border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Active Buses</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activeBuses}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white'} rounded-xl p-6 shadow-sm border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Incoming Buses</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{incomingBuses.length}</p>
              </div>
              <Truck className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white'} rounded-xl p-6 shadow-sm border`}>
            <h3 className="text-lg font-semibold mb-4">Agency Overview</h3>
            <div className="space-y-4">
              {agencies.slice(0, 3).map((agency) => (
                <div key={agency.id} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-zinc-700' : 'bg-gray-50'} rounded-lg`}>
                  <div>
                    <p className="font-medium">{agency.name}</p>
                    <p className="text-sm text-gray-600">{agency.totalBuses} buses total</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">{agency.activeBuses} active</p>
                    {agency.maintenanceBuses > 0 && (
                      <p className="text-sm text-yellow-600">{agency.maintenanceBuses} maintenance</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white'} rounded-xl p-6 shadow-sm border`}>
            <h3 className="text-lg font-semibold mb-4">Incoming Buses Status</h3>
            <div className="space-y-4">
              {incomingBuses.slice(0, 3).map((bus) => (
                <div key={bus.id} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-zinc-700' : 'bg-gray-50'} rounded-lg`}>
                  <div>
                    <p className="font-medium">{bus.vehicleNo}</p>
                    <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{bus.agency}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getDistanceColor(bus.distanceFromDepot)}`}>
                      {bus.distanceFromDepot} km
                    </p>
                    <p className="text-sm text-gray-600">{bus.eta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AgenciesPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">All Agencies</h3>
        <button
          onClick={() => setCurrentPage('add-agency')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Agency
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agencies.map((agency) => (
          <div key={agency.id} className={`${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white'} rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{agency.name}</h4>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Contact: {agency.contact}</p>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{agency.phone}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-500" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Total Buses</span>
                <span className="font-semibold">{agency.totalBuses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Active</span>
                <span className={`font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{agency.activeBuses}</span>
              </div>
              {agency.maintenanceBuses > 0 && (
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Maintenance</span>
                  <span className={`font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{agency.maintenanceBuses}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Routes:</p>
              <div className="flex flex-wrap gap-2">
                {agency.routes.map((route, index) => (
                  <span key={index} className={`${
                    darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                  } text-xs px-2 py-1 rounded-full`}>
                    {route}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TrackingPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Live Bus Tracking</h3>
        <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live Updates
        </div>
      </div>

      <div className="grid gap-6">
        {incomingBuses.map((bus) => (
          <div key={bus.id} className={`${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white'} rounded-xl p-6 shadow-sm border`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bus Info */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Bus className="w-6 h-6 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">{bus.vehicleNo}</h4>
                    <p className="text-sm text-gray-600">{bus.agency}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{bus.driver}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Route className="w-4 h-4 text-gray-400" />
                    <span>{bus.route}</span>
                  </div>
                </div>
              </div>

              {/* Location & Status */}
              <div>
                <div className="mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getStatusColor(bus.status)}`}>
                    <div className="w-2 h-2 bg-current rounded-full mr-2"></div>
                    {bus.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-gray-400" />
                    <span>{bus.currentLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Updated {bus.lastUpdate}</span>
                  </div>
                </div>
              </div>

              {/* Distance & ETA */}
              <div>
                <div className="mb-3">
                  <p className={`text-2xl font-bold ${getDistanceColor(bus.distanceFromDepot)}`}>
                    {bus.distanceFromDepot} km
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>from depot</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ETA:</span>
                    <span className="font-semibold">{bus.eta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span>{bus.speed} km/h</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{Math.max(10, 100 - (bus.distanceFromDepot * 3))}%</span>
                  </div>
                  <div className={`w-full ${darkMode ? 'bg-zinc-700' : 'bg-gray-200'} rounded-full h-2`}>
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        bus.distanceFromDepot <= 5 ? 'bg-green-500' : 
                        bus.distanceFromDepot <= 10 ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.max(10, 100 - (bus.distanceFromDepot * 3))}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AddAgencyPage = () => (
    <div className="max-w-2xl mx-auto" >
      <div className={`${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white'} rounded-xl p-8 shadow-sm border`}>
        <h3 className="text-xl font-semibold mb-6">Add New Agency</h3>
        
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-gray-700'} mb-2`}>
              Agency Name *
            </label>
            <input
              type="text"
              value={newAgency.name}
              onChange={(e) => setNewAgency({...newAgency, name: e.target.value})}
              className={`w-full border ${darkMode ? 'bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter agency name"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-gray-700'} mb-2`}>
              Contact Person *
            </label>
            <input
              type="text"
              value={newAgency.contact}
              onChange={(e) => setNewAgency({...newAgency, contact: e.target.value})}
              className={`w-full border ${darkMode ? 'bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter contact person name"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-gray-700'} mb-2`}>
              Phone Number *
            </label>
            <input
              type="tel"
              value={newAgency.phone}
              onChange={(e) => setNewAgency({...newAgency, phone: e.target.value})}
              className={`w-full border ${darkMode ? 'bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-gray-700'} mb-2`}>
              Total Number of Buses
            </label>
            <input
              type="number"
              value={newAgency.totalBuses}
              onChange={(e) => setNewAgency({...newAgency, totalBuses: e.target.value})}
              className={`w-full border ${darkMode ? 'bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400' : 'border-gray-300'} rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
              placeholder="Enter total buses"
            />
          </div>

          <div>
  <label className={`block text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-gray-700'} mb-2`}>
    Agency Routes
  </label>
  
  <div className="space-y-4">
    {newAgency.routes.map((route, index) => (
      <div key={index} className="flex items-center gap-3 relative">
        {/* Vertical Line for route visualization */}
        {index > 0 && (
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-blue-300"></div>
        )}
        
        {/* Stop Icon */}
        <div className="w-4 h-4 rounded-full bg-blue-500 z-10"></div>
        
        {/* Route Name */}
        <span className={`flex-1 px-3 py-2 rounded-lg ${darkMode ? 'bg-zinc-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
          {route}
        </span>
        
        {/* Remove */}
        <button 
          onClick={() => removeRoute(route)}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
    ))}

    {/* Add New Stop */}
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 rounded-full border-2 border-dashed border-blue-400"></div>
      <input
        type="text"
        value={routeInput}
        onChange={(e) => setRouteInput(e.target.value)}
        onKeyDown={handleRouteKeyDown}
        placeholder="Add a stop/route name"
        className={`flex-1 border rounded-lg px-3 py-2 ${darkMode ? 'bg-zinc-700 border-zinc-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500`}
      />
      <button 
  onClick={() => {
    if (routeInput.trim()) {
      setNewAgency(prev => ({
        ...prev,
        routes: [...prev.routes, routeInput.trim()],
      }));
      setRouteInput('');
    }
  }}
  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
>
  <Plus className="w-4 h-4" />
</button>

    </div>
  </div>
</div>


          <div className="flex gap-4 pt-4">
            <button
              onClick={addAgency}
              className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add Agency
            </button>
            <button
              onClick={() => setCurrentPage('agencies')}
              className={`flex-1 ${darkMode ? 'bg-zinc-700 text-zinc-100 hover:bg-zinc-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} py-2.5 rounded-lg transition-colors font-medium`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsPage = () => (
    <div className="max-w-4xl mx-auto">
      <div className={`${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white'} rounded-xl p-8 shadow-sm border`}>
        <h3 className="text-xl font-semibold mb-6">Depot Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium mb-4">Notification Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-3" defaultChecked />
                <span className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Bus arrival notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-3" defaultChecked />
                <span className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Maintenance reminders</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-3" />
                <span className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Route delay alerts</span>
              </label>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Display Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-3" defaultChecked />
                <span className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Show real-time updates</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-3" defaultChecked />
                <span className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Auto-refresh tracking</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-3" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                <span className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Dark mode</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'agencies': return <AgenciesPage />;
      case 'tracking': return <TrackingPage />;
      case 'add-agency': return <AddAgencyPage />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className={`flex h-screen transition-colors ${darkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-gray-50'}`}>
      <Sidebar />
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default BusDepot;