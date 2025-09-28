
import React, { useState } from 'react';
import { ScenePreset } from '../types';

interface PresetManagerProps {
    presets: ScenePreset[];
    onSave: (name: string) => void;
    onLoad: (name: string) => void;
    onDelete: (name: string) => void;
}

const PresetManager: React.FC<PresetManagerProps> = ({ presets, onSave, onLoad, onDelete }) => {
    const [newPresetName, setNewPresetName] = useState('');
    const [selectedPreset, setSelectedPreset] = useState('');

    const handleSaveClick = () => {
        onSave(newPresetName);
        setNewPresetName('');
    };
    
    const handleLoadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.value;
        setSelectedPreset(name);
        if (name) {
            onLoad(name);
        }
    };
    
    const handleDeleteClick = () => {
        if (selectedPreset) {
            onDelete(selectedPreset);
            setSelectedPreset(''); // Reset selection after deleting
        }
    };

    return (
        <div className="space-y-4 pt-4 border-t border-gray-700">
            <h2 className="text-xl font-semibold text-indigo-300 border-l-4 border-indigo-400 pl-3">Preset Konfigurasi</h2>
            
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    placeholder="Nama Preset Baru"
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-lg p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Nama Preset Baru"
                />
                <button
                    onClick={handleSaveClick}
                    disabled={!newPresetName.trim()}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-900 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Simpan
                </button>
            </div>
            
            {presets.length > 0 && (
                <div className="flex gap-2">
                    <select
                        value={selectedPreset}
                        onChange={handleLoadChange}
                        className="flex-grow bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Pilih Preset untuk Dimuat"
                    >
                        <option value="">Pilih Preset...</option>
                        {presets.sort((a, b) => a.name.localeCompare(b.name)).map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                    </select>
                    <button
                        onClick={handleDeleteClick}
                        disabled={!selectedPreset}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-3 rounded-lg transition-colors"
                        aria-label="Hapus preset terpilih"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                       </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default PresetManager;
