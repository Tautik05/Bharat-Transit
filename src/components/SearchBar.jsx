import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDirectionsBus } from "react-icons/md";

// Use your popularBuses data
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

const SearchBar = ({ onBusSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const {value} = e.target;
    setQuery(value);

    if (value.length > 0) {
      const filtered = popularBuses.filter((bus) =>
        bus.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (bus) => {
    setQuery(bus.name);
    setSuggestions([]);
    onBusSelect(bus);
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Input */}
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search buses, stops..."
          className="w-full bg-transparent outline-none text-gray-800"
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-200 rounded-lg mt-2 z-20 shadow-lg max-h-64 overflow-y-auto">
          {suggestions.map((bus) => (
            <li
              key={bus.id}
              onClick={() => handleSuggestionClick(bus)}
              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <MdDirectionsBus className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{bus.name}</div>
                <div className="text-xs text-gray-500">{bus.vehicle}</div>
              </div>
              <div className="text-right text-xs text-gray-400">
                ETA: {bus.eta}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
