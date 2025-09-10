import React, { useState } from "react";
import BusDetails from "./BusDetails";

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
  },
];

const BottomSheet = ({ selectedBus, onBusSelect, onRecenter, theme }) => {
  const getTrafficColor = (traffic) => {
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
    <div className="bg-white rounded-t-2xl shadow-lg z-10">
      <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />

      {selectedBus ? (
        <BusDetails
          bus={selectedBus}
          onBack={handleBack}
          onSubscribe={(data) => console.log("📩 SMS subscribe:", data)}
        />
      ) : (
        <div className="px-4 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Routes
          </h3>

          <div className="space-y-2">
            {popularBuses.map((bus) => (
              <button
                key={bus.id}
                onClick={() => handleBusClick(bus)}
                className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10M6.5 17.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5M5 11V6h14v5H5z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 mb-1">
                        {bus.name}
                      </div>
                      <div className="text-xs text-gray-500">
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
                    <div className="text-xs text-gray-500">
                      45-60 min
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