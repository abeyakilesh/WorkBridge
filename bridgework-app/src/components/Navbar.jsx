import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem('userRole') || 'Client');

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/match", label: "Find Match" },
    { path: "/post-job", label: "Post Job" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
    // Option to reload or mutate state if using context
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold text-text-dark tracking-tight hidden sm:block">
              Bridge<span className="text-primary">Work</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-primary text-white shadow-md transform scale-105"
                    : "text-text-muted hover:text-primary hover:bg-primary-light/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
             {/* Role Switcher */}
             <div className="relative border rounded-lg bg-gray-50 flex items-center shadow-sm hover:border-primary transition-colors">
               <span className="pl-3 text-xs text-gray-500 font-bold uppercase tracking-wider">Role:</span>
               <select 
                 className="bg-transparent text-sm font-bold text-gray-800 py-2 pl-2 pr-6 outline-none appearance-none cursor-pointer"
                 value={role}
                 onChange={handleRoleChange}
               >
                 <option value="Client">Client / Employer</option>
                 <option value="Worker">Worker / Helper</option>
                 <option value="Admin">Admin</option>
               </select>
               <div className="absolute right-2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
               </div>
             </div>
             
             <div className="h-6 w-px bg-gray-200"></div>

             <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-primary transition-colors">Login</Link>
             <Link to="/register" className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gray-900 text-white shadow-md hover:bg-gray-800 transition-colors transform hover:-translate-y-0.5">Register</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-text-muted hover:text-primary hover:bg-primary-light transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-down shadow-xl absolute w-full">
          <div className="px-4 py-4 space-y-2">
            
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex flex-col mb-4">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Switch Role</span>
              <select 
                 className="bg-white border rounded-lg text-sm font-bold text-gray-800 py-2.5 px-3 outline-none w-full"
                 value={role}
                 onChange={handleRoleChange}
              >
                 <option value="Client">Client / Employer</option>
                 <option value="Worker">Worker / Helper</option>
                 <option value="Admin">Admin</option>
              </select>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-primary hover:bg-primary-light/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2 mt-2">
               <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-center text-base font-bold border border-gray-200 text-gray-600">Login</Link>
               <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-center text-base font-bold bg-gray-900 text-white">Register via Document Scan</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
