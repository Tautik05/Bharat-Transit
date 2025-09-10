import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const busData = [
  { id: 1, name: "Route 101: Metro Center to Downtown" },
  { id: 2, name: "Route 202: North Park to South Bay" },
  { id: 3, name: "Route 303: East Village to West End" },
  { id: 4, name: "Route 404: Airport Express" },
];

const SearchBar = ({ onBusSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value.length > 0) {
      const filtered = busData.filter((bus) =>
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

      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-200 rounded-lg mt-2 z-20 shadow-lg">
          {suggestions.map((bus) => (
            <li
              key={bus.id}
              onClick={() => handleSuggestionClick(bus)}
              className="p-3 hover:bg-gray-100 cursor-pointer"
            >
              {bus.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
