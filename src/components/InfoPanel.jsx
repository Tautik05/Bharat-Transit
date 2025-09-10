const InfoPanel = ({ selectedBus }) => {
  if (!selectedBus) return null;

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-lg text-gray-800">ETA: 12 minutes</p>
          <p className="text-sm text-green-600">Light traffic on your route</p>
        </div>
        <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default InfoPanel;
