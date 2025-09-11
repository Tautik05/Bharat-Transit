import React, { useState, useEffect, useRef } from "react";
import { UserCircle, Sun, Moon, LogOut } from "lucide-react";
import BharatTransitLogo from "./Logo";

const Header = ({ onThemeChange, theme = "light" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const darkMode = theme === "dark";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    setMenuOpen(false);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <BharatTransitLogo size="md" theme={theme} />
      
      <div className="relative">
        <button
          ref={buttonRef}
          className={`focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 transition-colors duration-150 ${darkMode ? 'hover:bg-zinc-700' : 'hover:bg-gray-100'}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Profile menu"
          aria-expanded={menuOpen}
        >
          <UserCircle className={`w-8 h-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>

        {menuOpen && (
          <>
            {/* Backdrop overlay */}
            <div className="fixed inset-0 z-[9998]" onClick={() => setMenuOpen(false)} />
            
            {/* Dropdown menu */}
            <div 
              ref={dropdownRef}
              className={`absolute right-0 top-12 w-56 rounded-xl shadow-xl border p-4 z-[9999] animate-in fade-in slide-in-from-top-2 duration-200 ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-200'}`}
            >
              {/* User info section */}
              <div className={`flex items-center gap-3 pb-3 border-b ${darkMode ? 'border-zinc-700' : 'border-gray-100'}`}>
                <UserCircle className={`w-10 h-10 ${darkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>User Name</p>
                  <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>user@example.com</p>
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <div className={`py-3 border-b ${darkMode ? 'border-zinc-700' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                    Dark Mode
                  </span>
                  <div
                    className={`relative w-12 h-6 rounded-full flex items-center cursor-pointer transition-colors duration-200 ${darkMode ? 'bg-zinc-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={onThemeChange}
                    role="switch"
                    aria-checked={darkMode}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onThemeChange();
                      }
                    }}
                  >
                    <Sun className="absolute left-1 w-3 h-3 text-yellow-500 z-10" />
                    <Moon className="absolute right-1 w-3 h-3 text-gray-600 z-10" />
                    <div
                      className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
                        darkMode
                          ? "translate-x-6 bg-zinc-900"
                          : "translate-x-0.5"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-2">
                <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 text-left text-sm ${darkMode ? 'text-zinc-300 hover:bg-zinc-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <UserCircle className="w-4 h-4" />
                  Profile Settings
                </button>
              </div>

              {/* Logout Button */}
              <div className="pt-2">
                <button 
                  onClick={handleLogout}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-colors duration-150 text-sm font-medium ${darkMode ? 'bg-red-900/50 text-red-400 hover:bg-red-900/70' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;