
import React from 'react';

interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, onApiKeyChange }) => {
  return (
    <div className="space-y-2 pb-4 border-b border-gray-700">
      <label htmlFor="api-key-input" className="block text-md font-medium text-gray-300">
        API Key (Veo, Gemini, etc.)
      </label>
      <input
        id="api-key-input"
        type="password"
        value={apiKey}
        onChange={(e) => onApiKeyChange(e.target.value)}
        placeholder="Masukkan API Key Anda di sini"
        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <p className="text-xs text-gray-500">
        Kunci API Anda disimpan dengan aman di browser Anda dan tidak pernah dikirim ke mana pun selain ke penyedia AI.
      </p>
    </div>
  );
};

export default ApiKeyInput;
