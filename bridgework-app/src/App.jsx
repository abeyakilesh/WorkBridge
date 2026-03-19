import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import PostJob from "./pages/PostJob";
import Match from "./pages/Match";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="font-sans min-h-screen text-text-dark bg-bg-light flex flex-col selection:bg-primary-light selection:text-primary-dark">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/match" element={<Match />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        {/* Simple Footer */}
        <footer className="bg-white border-t border-gray-100 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-text-dark tracking-tight">
                Bridge<span className="text-primary">Work</span>
              </span>
              <span className="text-text-muted text-sm mx-2">|</span>
              <p className="text-sm text-text-muted">© {new Date().getFullYear()} All rights reserved.</p>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-text-muted">
              <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-primary cursor-pointer transition-colors">Support</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
