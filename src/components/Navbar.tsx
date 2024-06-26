import React from 'react';
import NavbarButton from './NavbarButton';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 sticky top-0 w-full z-10">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex space-x-8">
          <NavbarButton title="home" destination="/" />
          <NavbarButton title="articles" destination="/articles" />
          <NavbarButton title="acknowledgements" destination="/acknowledgements" />
        </div>
      </div>
    </nav>
  );
}

// function Navbar() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Hello, Tailwind CSS!</h1>
//         <p className="text-gray-700">This is a simple example of using Tailwind CSS with React.</p>
//       </div>
//     </div>
//   );
// }

export default Navbar;