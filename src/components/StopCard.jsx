export default function StopCard({ title, stop, gradient, icon }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} p-4 rounded-2xl text-white shadow-lg`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            {icon}
          </div>
          <span className="font-semibold">{title}</span>
        </div>
        <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
          <span className="text-sm font-bold text-black">{stop.eta}</span>
        </div>
      </div>
      <h3 className="font-bold text-lg mb-1">{stop.name}</h3>
      <p className="text-blue-100 text-sm mb-2">{stop.location}</p>
      <div className="flex items-center gap-1">
        <span className="text-sm">🚌</span>
        <span className="text-sm font-medium">{stop.distance} away</span>
      </div>
    </div>
  );
}
