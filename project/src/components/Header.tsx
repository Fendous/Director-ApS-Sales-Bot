import React from 'react';
import { Headphones, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Headphones className="h-8 w-8 text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-900">Director Apps Sales AI Assistant</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;