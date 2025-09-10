import { FaUserCircle } from "react-icons/fa";

const Header = () => (
  <header className="absolute top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-10 max-w-sm mx-auto">
    <h1 className="text-xl font-bold text-gray-800">Bharat Transit</h1>
    <button>
      <FaUserCircle className="text-3xl text-gray-600" />
    </button>
  </header>
);

export default Header;

