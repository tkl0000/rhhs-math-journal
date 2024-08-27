import React from 'react';
import { Link } from 'react-router-dom';

const base_url = import.meta.env.VITE_BASE_URL;

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 sticky top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name (optional) */}
        <div className="text-slate-200 text-xl font-bold hidden sm:block">
        </div>
        <div className="flex overflow-x-auto space-x-4 sm:space-x-8 scrollbar-hide">
          <NavbarButton title="home" destination={`${base_url}`} />
          <NavbarButton title="articles" destination={`${base_url}articles`} />
          <NavbarButton title="journal" destination={`${base_url}journal`} />
          <NavbarButton title="acknowledgements" destination={`${base_url}acknowledgements`} />
          <NavbarButton title="login" destination={`${base_url}login`} />
        </div>
      </div>
    </nav>
  );
}

interface NavbarButtonProps {
  title: string;
  destination: string;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ title, destination }) => {
  return (
    <Link to={destination} className="text-slate-200 hover:text-white px-2 sm:px-3 py-2 rounded-md text-sm sm:text-xl font-medium whitespace-nowrap">
      <h1>{title}</h1>
    </Link>
  );
}

export default Navbar;
