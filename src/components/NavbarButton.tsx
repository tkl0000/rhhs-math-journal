import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarButtonProps {
  title: string;
  destination: string;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ title, destination }) => {
  return (
    <Link to={destination} className="text-slate-200 hover:text-white px-3 py-2 rounded-md text-xl font-medium">
        <h1>{title}</h1>
    </Link>
  );
}

// function NavbarButton() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Hello, Tailwind CSS!</h1>
//         <p className="text-gray-700">This is a simple example of using Tailwind CSS with React.</p>
//       </div>
//     </div>
//   );
// }

export default NavbarButton;