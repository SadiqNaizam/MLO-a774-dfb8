import React from 'react';
import { Link } from 'react-router-dom';
import { MountainIcon } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header component loaded');

  return (
    <header className="bg-gray-100 dark:bg-gray-800 px-4 lg:px-6 h-14 flex items-center shadow-sm">
      <Link to="/" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-6 w-6 text-green-600" />
        <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-50">AuthApp</span>
      </Link>
      {/* Navigation links could be added here if needed for a more complex header */}
    </header>
  );
};

export default Header;