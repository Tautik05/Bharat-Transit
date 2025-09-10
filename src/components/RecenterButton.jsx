// RecenterButton.jsx
import React from "react";
import { FaCrosshairs } from "react-icons/fa";

const RecenterButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
  >
    <FaCrosshairs className="text-blue-500" />
  </button>
);

export default RecenterButton;
