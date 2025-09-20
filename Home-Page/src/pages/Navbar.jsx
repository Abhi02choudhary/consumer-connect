import { useState, useEffect } from 'react';
import { Home, Info, FileText, Search, Lock } from 'lucide-react';
import weblogo from '../logos/weblogo.png';
import ccname from '../logos/ccname.png'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`w-full z-50 transition-all duration-300 ease-in-out bg-white border-b border-gray-100 ${
        isScrolled ? 'h-14' : 'h-20'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo placeholder */}
        <div className="flex items-center space-x-3">
          <img
            src={weblogo}
            alt="Logo Icon"
            className="h-22 w-20" // adjust size if needed
          />
          <img
            src={ccname}
            alt="Logo Text"
            className="h-8 w-auto" // logo name like "ConsumerConnect"
          /> 
        </div>


        
        {/* Navigation Links - centered */}
        <div className="flex items-center justify-center flex-1">
          <div className="flex items-center space-x-8">
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
              <Home size={18} />
              <span className="font-medium">Home</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
              <Info size={18} />
              <span className="font-medium">About Us</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
              <FileText size={18} />
              <span className="font-medium">Complaints</span>
            </a>
          </div>
        </div>
        
        {/* Right side - Search and Login with proper spacing */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="search" 
              className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 focus:bg-white"
              placeholder="Search complaints..."
            />
          </div>
          
          {/* Login Button */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-colors"
            >
              <Lock size={16} />
              <span>Login</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <ul className="text-sm text-gray-700">
                  {[
                    'BranchLogin',
                    'BranchSignUp',
                    'CustomerLogin',
                    'CustomerSignUp',
                    'OrgLogin',
                    'OrgSignUp',
                  ].map((label) => (
                    <li key={label}>
                      <a
                        href={`http://localhost:5173/${label}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center ml-4">
          <button className="text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;