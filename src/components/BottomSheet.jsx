import React, { useState } from "react";
import BusDetails from "./BusDetails";

const BottomSheet = ({ selectedBus, onBusSelect, onRecenter, theme, popularBuses = [] }) => {
  const darkMode = theme === "dark";

  const getTrafficColor = (traffic) => {
    if (darkMode) {
      switch (traffic) {
        case "Light": return "text-green-400";
        case "Moderate": return "text-orange-400";
        case "Heavy": return "text-red-400";
        default: return "text-gray-400";
      }
    }
    switch (traffic) {
      case "Light": return "text-green-600";
      case "Moderate": return "text-orange-600";
      case "Heavy": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getTrafficDot = (traffic) => {
    switch (traffic) {
      case "Light": return "bg-green-500";
      case "Moderate": return "bg-orange-500";
      case "Heavy": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleBusClick = (bus) => {
    if (onBusSelect) onBusSelect(bus); // ✅ controlled from outside now
  };

  const handleBack = () => {
    if (onBusSelect) onBusSelect(null);
    if (onRecenter) onRecenter();
  };

  return (
    <div
      className={`${
        darkMode ? "bg-zinc-900" : "bg-white"
      } rounded-t-2xl shadow-lg z-10 transition-colors duration-300 min-h-screen`}
    >
      <div className={`w-10 h-1 ${darkMode ? 'bg-zinc-700' : 'bg-gray-300'} rounded-full mx-auto mt-3 mb-4`} />

      {selectedBus ? (
        <BusDetails
          bus={selectedBus}
          onBack={handleBack}
          onSubscribe={(data) => console.log("📩 SMS subscribe:", data)}
          theme={theme}
        />
      ) : (
        <div className="px-4 pb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'} mb-4`}>
            Popular Routes
          </h3>

          <div className="space-y-2">
            {popularBuses.map((bus) => (
              <button
                key={bus.id}
                onClick={() => handleBusClick(bus)}
                className={`w-full text-left p-3 rounded-xl transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${darkMode ? 'bg-blue-900/60' : 'bg-blue-100'}`}>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10M6.5 17.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5M5 11V6h14v5H5z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${darkMode ? 'text-gray-100' : 'text-black'} mb-1`}>
                        {bus.name}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                        {bus.vehicle} • Departs {bus.startTime}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <div className={`w-2 h-2 rounded-full ${getTrafficDot(bus.traffic)}`}></div>
                      <span className={`text-xs font-medium ${getTrafficColor(bus.traffic)}`}>
                        {bus.traffic}
                      </span>
                    </div>
                    <div className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                      {bus.duration} min
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomSheet;