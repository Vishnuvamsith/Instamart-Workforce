import React from 'react';
import swiggyLogo from '../assets/swiggyLogo.png'
import { FiBell, FiUser } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center border-b border-gray-200">
      {/* Left side: logo + title */}
      <div className="flex items-center mr-3">
        <img src={swiggyLogo} alt="Logo" className="h-8 w-auto" />
        <h1 className="text-xl font-semibold text-gray-800">Instamart Workforce Dashboard</h1>
      </div>
    </nav>
  );
};

export default Navbar;
