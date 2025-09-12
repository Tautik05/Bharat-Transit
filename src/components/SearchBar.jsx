import React, { useState, useEffect, useRef } from "react";
import { Search, Bus } from "lucide-react";

const SearchBar = ({ onBusSelect, theme = 'light', popularBuses = [] }) => {
  const darkMode = theme === 'dark';
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef(null);

  // Filter buses based on query
  useEffect(() => {
    if (query.length > 1) {
      const filteredBuses = popularBuses.filter(bus =>
        bus.name.toLowerCase().includes(query.toLowerCase()) ||
        bus.vehicle.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredBuses);
    } else {
      setResults([]);
    }
  }, [query, popularBuses]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectBus = (bus) => {
    onBusSelect(bus);
    setQuery(""); // Clear query
    setResults([]); // Clear results
    setIsFocused(false); // Hide dropdown
  };

  return (
    <div className="relative" ref={searchContainerRef}>
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder="Search for a bus or route..."
        className={`w-full border rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
          darkMode
            ? 'bg-zinc-800 border-zinc-700 text-white placeholder-gray-400'
            : 'bg-gray-100 border-gray-200 text-gray-800'
        }`}
      />
      {isFocused && results.length > 0 && (
        <div className={`absolute top-full mt-2 w-full rounded-xl shadow-lg border z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 ${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'}`}>
          <ul className={`divide-y ${darkMode ? 'divide-zinc-700' : 'divide-gray-100'}`}>
            {results.map(bus => (
              <li key={bus.id}>
                <button onClick={() => handleSelectBus(bus)} className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${darkMode ? 'hover:bg-zinc-700' : 'hover:bg-gray-100'}`}>
                  <Bus size={18} className={darkMode ? 'text-zinc-400' : 'text-gray-500'} />
                  <div>
                    <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bus.name}</p>
                    <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{bus.vehicle}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;