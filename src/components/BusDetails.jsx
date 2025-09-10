import React, { useState, useEffect } from "react";
import { ArrowLeft, Clock, Bell, MapPin, Bus } from "lucide-react";
import { MdDirectionsBus } from "react-icons/md";

const BusDetails = ({ bus, onSubscribe, onBack }) => {
  const [notifyBefore, setNotifyBefore] = useState(15);
  const [etaMinutes, setEtaMinutes] = useState(null);

  // Calculate ETA based on bus times
  useEffect(() => {
    if (bus?.startTime && bus?.eta) {
      const parseTime = (t) => {
        const [time, period] = t.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };

      const start = parseTime(bus.startTime);
      const end = parseTime(bus.eta);
      setEtaMinutes(end - start);
    }
  }, [bus]);

  if (!bus) return null;

  const getETAColor = () => {
    if (!etaMinutes) return "text-gray-400";
    if (etaMinutes < 20) return "text-green-500";
    if (etaMinutes < 40) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-medium">Bus Details</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Info Card */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MdDirectionsBus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{bus.name}</h2>
                <p className="text-sm text-gray-500">{bus.vehicle}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-1">ETA</p>
              <p className={`text-2xl font-bold ${getETAColor()}`}>
                {etaMinutes ? `${etaMinutes}m` : "—"}
              </p>
            </div>
          </div>
          
          {/* Route */}
          <div className="flex items-center gap-2 text-sm ">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">{bus.start?.join(", ")}</span>
          </div>
          <div className="w-px h-4 bg-gray-300 ml-1 my-1"></div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">{bus.end?.join(", ")}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 ">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Departure</p>
            <p className="font-medium text-sm">{bus.startTime || "—"}</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <MapPin className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Expected At</p>
            <p className="font-medium text-sm">{bus.eta || "—"}</p>
          </div>
        </div>

        {/* Notification */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-4 h-4 text-gray-600" />
            <h3 className="font-medium">Get SMS Alert</h3>
          </div>
          
          <p className="text-sm text-gray-500 mb-3">Notify me before bus arrives</p>
          
          <div className="flex gap-2 mb-4">
            {[15, 30, 60].map((minutes) => (
              <button
                key={minutes}
                onClick={() => setNotifyBefore(minutes)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
                  notifyBefore === minutes
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {minutes}m
              </button>
            ))}
          </div>

          <button
            onClick={() => onSubscribe({ type: "one-time", minutes: notifyBefore })}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Subscribe to Alerts
          </button>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-medium mb-3">Additional Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Route Type</span>
              <span>Express</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Frequency</span>
              <span>Every 15-20 min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Fare</span>
              <span>₹25-40</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetails;