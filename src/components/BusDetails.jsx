import React, { useState } from 'react';
import { ArrowLeft, Bell, Clock, MapPin, Phone } from 'lucide-react';

const BusDetails = ({ bus, onBack, onSubscribe, theme = 'light' }) => {
  const darkMode = theme === 'dark';
  const [phone, setPhone] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      onSubscribe({ busId: bus.id, phone });
      // Maybe show a success message
    }
  };

  return (
    <div className="p-4">
      {/* Back Button and Bus Name */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className={`p-2 rounded-full mr-3 transition-colors ${darkMode ? 'hover:bg-zinc-700' : 'hover:bg-gray-100'}`}
          aria-label="Go back"
        >
          <ArrowLeft size={24} className={darkMode ? 'text-white' : 'text-black'} />
        </button>
        <div>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>{bus.name}</h2>
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{bus.vehicle}</p>
        </div>
      </div>

      {/* Route Info & ETA Card -- Redesigned */}
      <div className="flex justify-between items-center mb-6">
        {/* Left side: Route details */}
        <div className="space-y-2">
          <div className="flex items-center">
            <MapPin size={18} className="mr-3 text-blue-500 flex-shrink-0" />
            <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{bus.start.join(', ')}</p>
          </div>
          <div className="pl-1">
            <div className={`h-5 border-l-2 border-dotted ml-[8px] ${darkMode ? 'border-zinc-600' : 'border-gray-300'}`}></div>
          </div>
          <div className="flex items-center">
            <MapPin size={18} className="mr-3 text-red-500 flex-shrink-0" />
            <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{bus.end.join(', ')}</p>
          </div>
        </div>

        {/* Right side: ETA Card */}
        <div className={`flex-shrink-0 text-center p-4 rounded-2xl w-28 ${darkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
          <p className={`text-4xl font-bold tracking-tighter ${darkMode ? 'text-white' : 'text-black'}`}>{bus.duration}</p>
          <p className={`text-base font-medium -mt-1 ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>min</p>
          <p className={`text-xs mt-2 px-2 py-0.5 rounded-full ${darkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-200 text-gray-600'}`}>
            ETA {bus.eta}
          </p>
        </div>
      </div>

      {/* Start Time */}
      <div className={`flex items-center p-4 rounded-xl border mb-8 ${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'}`}>
        <Clock size={20} className="mr-3 text-green-500 flex-shrink-0" />
        <p className={`${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Started at <span className="font-semibold">{bus.startTime}</span> from <span className="font-semibold">{bus.start[0]}</span>
        </p>
      </div>

      {/* SMS Subscription */}
      <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center mb-3">
          <Bell size={20} className="mr-3 text-yellow-500" />
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Get Live Updates</h3>
        </div>
        <p className={`text-sm mb-4 ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
          Enter your phone number to receive SMS alerts for this bus.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Phone size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-zinc-400' : 'text-gray-400'}`} />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile number"
              className={`w-full rounded-lg py-2.5 pl-10 pr-3 border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400'
                  : 'bg-white border-gray-300'
              }`}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={phone.length !== 10}
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusDetails;