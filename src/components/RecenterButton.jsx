// RecenterButton.jsx
import React from "react";
import { MdMyLocation } from "react-icons/md"; 

const RecenterButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-white shadow px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-gray-100 transition"
    aria-label="Recenter"
  >
    <MdMyLocation className="text-blue-500 text-lg" />
    Recenter
  </button>
);


export default RecenterButton;
