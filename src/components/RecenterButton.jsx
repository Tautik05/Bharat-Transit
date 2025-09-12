import React from 'react';
import { MdMyLocation } from 'react-icons/md';

const RecenterButton = ({ onClick, theme = 'light' }) => {
  const darkMode = theme === 'dark';

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-11 h-11 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${
        darkMode
          ? 'bg-zinc-700 text-white hover:bg-zinc-600'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
      aria-label="Recenter map"
    >
      <MdMyLocation size={22} />
    </button>
  );
};

export default RecenterButton;