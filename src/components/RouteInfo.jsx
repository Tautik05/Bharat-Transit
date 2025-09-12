import StopCard from "./StopCard";

export default function RouteInfo({ busStands, isDarkMode }) {
  return (
    <div className={`rounded-t-3xl shadow-2xl p-4 space-y-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
      <h2 className={`text-base font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Route Information</h2>

      <StopCard 
        title="Next Stop"
        stop={busStands[0]}
        gradient="from-blue-500 to-blue-600"
        icon="📍"
      />

      <StopCard 
        title="Following Stop"
        stop={busStands[1]}
        gradient="from-green-500 to-green-600"
        icon="➡️"
      />

      <div className="h-6" />
    </div>
  );
}
