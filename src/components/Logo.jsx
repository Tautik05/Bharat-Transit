import React from 'react';

const BharatTransitLogo = ({ size = 'md', theme = 'light' }) => {
  const darkMode = theme === 'dark';
  
  const sizes = {
    sm: { container: 'h-8', text: 'text-lg', accent: 'text-base' },
    md: { container: 'h-12', text: 'text-2xl', accent: 'text-xl' },
    lg: { container: 'h-16', text: 'text-4xl', accent: 'text-3xl' },
    xl: { container: 'h-20', text: 'text-5xl', accent: 'text-4xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center ${currentSize.container}`}>
      {/* Main Logo */}
      <div className="flex items-baseline">
        {/* "Bharat" with Indian flag colors accent */}
        <div className="relative">
          <span className={`font-bold tracking-tight ${currentSize.text} ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Bharat
          </span>
          {/* Tricolor accent dots */}
          <div className="absolute -top-1 -right-1 flex space-x-0.5">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white border border-gray-300 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
          </div>
        </div>
        
        {/* "Transit" with movement accent */}
        <div className="relative ml-1">
          <span className={`font-bold tracking-tight ${currentSize.text} bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent`}>
            Transit
          </span>
          {/* Motion lines */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-3 flex flex-col space-y-0.5">
            <div className="w-2 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
            <div className="w-3 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"></div>
            <div className="w-2 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Tagline for larger sizes */}
      {(size === 'lg' || size === 'xl') && (
        <div className={`ml-4 border-l-2 border-gray-300 pl-3 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
          <span className={`${currentSize.accent} font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          } tracking-wide`}>
            Journey. Connected.
          </span>
        </div>
      )}
    </div>
  );
};

export default BharatTransitLogo;