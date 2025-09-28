
import React from 'react';

const ApiKeyWarning: React.FC = () => {
  return (
    <div className="bg-yellow-900/50 border-l-4 border-yellow-500 text-yellow-200 p-4 rounded-lg mb-6" role="alert">
      <p className="font-bold">Perhatian: API Key Diperlukan</p>
      <p className="text-sm">
        Aplikasi ini memerlukan API Key untuk berfungsi. Harap masukkan API Key Anda pada kolom di bawah. 
        Jika Anda melakukan deployment aplikasi ini, Anda juga bisa mengaturnya melalui environment variable 
        <code className="bg-gray-700 px-1 py-0.5 rounded text-yellow-300 mx-1">API_KEY</code>.
      </p>
    </div>
  );
};

export default ApiKeyWarning;
