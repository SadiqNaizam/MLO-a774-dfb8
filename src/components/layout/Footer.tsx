import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer component loaded');

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-gray-600 mb-2">
          &copy; {new Date().getFullYear()} AuthApp. All rights reserved.
        </p>
        <nav className="flex justify-center space-x-4 text-sm">
          <Link to="#" className="text-gray-500 hover:text-gray-800 hover:underline">
            Privacy Policy
          </Link>
          <span className="text-gray-500">&bull;</span>
          <Link to="#" className="text-gray-500 hover:text-gray-800 hover:underline">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;