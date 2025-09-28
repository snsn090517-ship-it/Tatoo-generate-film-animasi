
import React from 'react';
import { Character, Voice } from '../types';
import { VOICE_OPTIONS } from '../constants';

interface CharacterSelectorProps {
  allCharacters: Character[];
  selectedCharacters: Character[];
  characterVoices: Record<string, Voice>;
  characterCustomizations: Record<string, string>;
  onCharacterToggle: (character: Character) => void;
  onVoiceChange: (characterId: string, voice: Voice) => void;
  onCustomizationChange: (characterId: string, customization: string) => void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  allCharacters,
  selectedCharacters,
  characterVoices,
  characterCustomizations,
  onCharacterToggle,
  onVoiceChange,
  onCustomizationChange
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-indigo-300 border-l-4 border-indigo-400 pl-3">1. Pilih & Kustomisasi Karakter</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {allCharacters.map(character => {
          const isSelected = selectedCharacters.some(c => c.id === character.id);
          return (
            <button
              key={character.id}
              onClick={() => onCharacterToggle(character)}
              className={`p-3 rounded-lg text-center transition-all duration-200 border-2 ${
                isSelected 
                ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg' 
                : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
              }`}
            >
              <span className="font-bold">{character.name}</span>
            </button>
          );
        })}
      </div>
      {selectedCharacters.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-gray-700">
          <h3 className="text-lg font-medium text-gray-300">Atur Detail Karakter</h3>
          {selectedCharacters.map(character => (
            <div key={character.id} className="p-3 bg-gray-700/50 rounded-lg space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <label htmlFor={`voice-${character.id}`} className="font-bold text-gray-200 min-w-[80px]">
                  {character.name}:
                </label>
                <select
                  id={`voice-${character.id}`}
                  value={characterVoices[character.id] || ''}
                  onChange={(e) => onVoiceChange(character.id, e.target.value as Voice)}
                  className="w-full sm:w-auto bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {VOICE_OPTIONS.map(voice => (
                    <option key={voice} value={voice}>{voice}</option>
                  ))}
                </select>
              </div>
               <div>
                <label htmlFor={`customization-${character.id}`} className="block text-sm font-medium text-gray-400 mb-1">
                  Kustomisasi Penampilan (opsional)
                </label>
                <input
                  id={`customization-${character.id}`}
                  type="text"
                  value={characterCustomizations[character.id] || ''}
                  onChange={(e) => onCustomizationChange(character.id, e.target.value)}
                  placeholder="Contoh: memakai topi, baju warna biru"
                  className="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterSelector;