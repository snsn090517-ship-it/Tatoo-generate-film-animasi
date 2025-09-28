
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-6 md:py-10 border-b border-gray-700 bg-gray-800/50">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
        Veo Animated Film Generator
      </h1>
      <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
        Ciptakan adegan film animasi impian Anda. Pilih karakter, atur suasana, dan biarkan AI mewujudkannya.
      </p>
    </header>
  );
};

export default Header;
