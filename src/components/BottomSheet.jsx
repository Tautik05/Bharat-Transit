import React, { useState } from "react";
import { FaBus } from "react-icons/fa";
import { motion } from "framer-motion";

const popularBuses = [
  { id: 1, name: "Route 101: Metro Center to Downtown" },
  { id: 2, name: "Route 202: North Park to South Bay" },
  { id: 3, name: "Route 404: Airport Express" },
];

const BottomSheet = ({ onBusSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ y: "60%" }}
      animate={{ y: isExpanded ? "20%" : "60%" }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl p-4 z-30 max-w-md mx-auto"
    >
      {/* Handle Bar */}
      <div
        className="w-12 h-1.5 bg-gray-400 rounded-full mx-auto mb-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      ></div>

      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        🔥 Popular Searches
      </h2>

      <ul>
        {popularBuses.map((bus) => (
          <li
            key={bus.id}
            onClick={() => onBusSelect(bus)}
            className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <FaBus className="text-yellow-500 text-xl mr-3" />
            {bus.name}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default BottomSheet;
