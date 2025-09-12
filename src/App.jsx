import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import UserDashboard from './pages/User';
import DriverDashboard from "./pages/DriverDashboard";
import AgencyDashboard from "./pages/Agency";

// A generic placeholder component for the different dashboards
const Dashboard = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="w-full max-w-4xl text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{title}</h1>
      <p className="text-lg text-gray-600 mb-8">
        This is a placeholder page for the {title.toLowerCase()}.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
      >
        ← Back to Home
      </Link>
    </div>
  </div>
);

// Specific dashboard components
// const UserDashboard = () => <Dashboard title="User Dashboard" />;
// const DriverDashboard = () => <Dashboard title="Driver Dashboard" />;
const DepotDashboard = () => <Dashboard title="Depot Dashboard" />;
// const AgencyDashboard = () => <Dashboard title="Agency Dashboard" />;
const AdminDashboard = () => <Dashboard title="Admin Dashboard" />;

// The main landing page component
const LandingPage = () => {
  const navLinks = [
    { to: '/user', text: 'User Dashboard' },
    { to: '/driver', text: 'Driver Dashboard' },
    { to: '/depot', text: 'Depot Dashboard' },
    { to: '/agency', text: 'Agency Dashboard' },
    { to: '/admin', text: 'Admin Dashboard' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">
          Bharat Transit
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Your Real-Time Public Bus Tracking Service
        </p>
      </header>

      <nav className="w-full max-w-lg">
        <div className="grid grid-cols-1 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="w-full text-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </nav>

      <footer className="mt-12 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Bharat Transit. All rights reserved.</p>
      </footer>
    </div>
  );
};

// The main App component that handles routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/driver" element={<DriverDashboard />} />  {/* real one */}
        <Route path="/depot" element={<DepotDashboard />} />
        <Route path="/agency" element={<AgencyDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;