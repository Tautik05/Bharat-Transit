const LocationPopup = ({ onAllow, onDeny }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
    <div className="bg-white w-full max-w-sm mx-4 mb-6 rounded-lg p-6 shadow-lg text-center">
      <h3 className="font-bold text-lg mb-2">
        Allow "Bharat Transit" to use your location?
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Your precise location is used to show your position on the map, calculate
        ETAs, and find nearby buses.
      </p>
      <div className="flex justify-around">
        <button
          onClick={onDeny}
          className="text-blue-500 font-semibold px-4 py-2"
        >
          Don't Allow
        </button>
        <button
          onClick={onAllow}
          className="text-blue-500 font-semibold px-4 py-2"
        >
          Allow
        </button>
      </div>
    </div>
  </div>
);

export default LocationPopup;
