import React from "react";
import { FaBus } from "react-icons/fa";

const popularBuses = [
  { id: 1, name: "Route 101: Metro Center to Downtown" },
  { id: 2, name: "Route 202: North Park to South Bay" },
  { id: 3, name: "Route 303: East Village to West End" },
  { id: 4, name: "Route 404: Airport Express" },
];

const BottomSheet = ({ onBusSelect, theme }) => {
  return (
    <div
      className="
        bg-white
        rounded-t-3xl
        shadow-xl
        z-10
        text-gray-800
        p-4
      "
    >
      {/* Handle */}
      <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />

      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        🔥 Popular / Recent
      </h3>

      <div className="space-y-3">
        {popularBuses.map((bus) => (
          <button
            key={bus.id}
            onClick={() => onBusSelect(bus)}
            className={`w-full text-left flex items-center gap-3 p-3 rounded-lg ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition`}
          >
            <FaBus className="text-yellow-500 text-xl" />
            <div>
              <div className="text-sm font-medium">{bus.name}</div>
              <div className="text-xs text-gray-500">Recent • 2 mins ago</div>
            </div>
          </button>
        ))}

        {/* filler */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
            Suggestion {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomSheet;
