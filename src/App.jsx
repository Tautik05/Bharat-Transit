import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";

export default function App() {
    return (
        <Router>
            <div className="p-4">
                <nav className="flex gap-4 mb-4">
                    <Link to="/" className="text-blue-500">
                        Home
                    </Link>
                    <Link to="/about" className="text-blue-500">
                        About
                    </Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    );
}
