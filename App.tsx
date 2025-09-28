import React, { useState, useCallback, useEffect } from 'react';
import { Character, Voice, ScenePreset } from './types';
import { CHARACTERS, MUSIC_STYLES, CAMERA_ANGLES } from './constants';
import { generateVideo } from './services/geminiService';
import Header from './components/Header';
import CharacterSelector from './components/CharacterSelector';
import SceneConfigurator from './components/SceneConfigurator';
import VideoPlayer from './components/VideoPlayer';
import ApiKeyWarning from './components/ApiKeyWarning';
import PresetManager from './components/PresetManager';
import ApiKeyInput from './components/ApiKeyInput';

const App: React.FC = () => {
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [characterVoices, setCharacterVoices] = useState<Record<string, Voice>>({});
  const [characterCustomizations, setCharacterCustomizations] = useState<Record<string, string>>({});
  const [musicStyle, setMusicStyle] = useState<string>(MUSIC_STYLES[0]);
  const [cameraAngle, setCameraAngle] = useState<string>(CAMERA_ANGLES[0]);
  const [sceneDescription, setSceneDescription] = useState<string>('');
  
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [presets, setPresets] = useState<ScenePreset[]>([]);

  const effectiveApiKey = apiKey || process.env.API_KEY || '';
  const isApiKeyConfigured = effectiveApiKey.length > 0;

  useEffect(() => {
    try {
      const savedPresetsJSON = localStorage.getItem('veo-generator-presets');
      if (savedPresetsJSON) {
        setPresets(JSON.parse(savedPresetsJSON));
      }
      const savedApiKey = localStorage.getItem('veo-manual-api-key');
      if (savedApiKey) {
        setApiKey(savedApiKey);
      }
    } catch (error) {
      console.error('Could not load data from localStorage:', error);
    }
  }, []);

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    localStorage.setItem('veo-manual-api-key', key);
  };

  const updateAndSavePresets = (newPresets: ScenePreset[]) => {
    setPresets(newPresets);
    localStorage.setItem('veo-generator-presets', JSON.stringify(newPresets));
  };

  const handleSavePreset = (name: string) => {
    if (!name.trim()) {
      alert('Nama preset tidak boleh kosong.');
      return;
    }

    const newPreset: ScenePreset = {
      name,
      selectedCharacterIds: selectedCharacters.map(c => c.id),
      characterVoices,
      characterCustomizations,
      musicStyle,
      cameraAngle,
      sceneDescription,
    };

    const existingPresetIndex = presets.findIndex(p => p.name === name);
    let updatedPresets;

    if (existingPresetIndex > -1) {
      if (confirm(`Preset dengan nama "${name}" sudah ada. Apakah Anda ingin menimpanya?`)) {
        updatedPresets = [...presets];
        updatedPresets[existingPresetIndex] = newPreset;
      } else {
        return; // User cancelled overwrite
      }
    } else {
      updatedPresets = [...presets, newPreset];
    }

    updateAndSavePresets(updatedPresets);
    alert(`Preset "${name}" berhasil disimpan!`);
  };

  const handleLoadPreset = (name: string) => {
    const presetToLoad = presets.find(p => p.name === name);
    if (!presetToLoad) return;

    setSelectedCharacters(CHARACTERS.filter(c => presetToLoad.selectedCharacterIds.includes(c.id)));
    setCharacterVoices(presetToLoad.characterVoices);
    setCharacterCustomizations(presetToLoad.characterCustomizations || {});
    setMusicStyle(presetToLoad.musicStyle);
    setCameraAngle(presetToLoad.cameraAngle);
    setSceneDescription(presetToLoad.sceneDescription);
  };

  const handleDeletePreset = (name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus preset "${name}"?`)) {
      const updatedPresets = presets.filter(p => p.name !== name);
      updateAndSavePresets(updatedPresets);
    }
  };


  const handleCharacterToggle = useCallback((character: Character) => {
    setSelectedCharacters(prev => {
      const isSelected = prev.some(c => c.id === character.id);
      if (isSelected) {
        setCharacterVoices(currentVoices => {
          const newVoices = { ...currentVoices };
          delete newVoices[character.id];
          return newVoices;
        });
        setCharacterCustomizations(currentCustoms => {
          const newCustoms = { ...currentCustoms };
          delete newCustoms[character.id];
          return newCustoms;
        });
        return prev.filter(c => c.id !== character.id);
      } else {
        setCharacterVoices(currentVoices => ({
          ...currentVoices,
          [character.id]: character.defaultVoice
        }));
        setCharacterCustomizations(currentCustoms => ({
            ...currentCustoms,
            [character.id]: ''
        }));
        return [...prev, character];
      }
    });
  }, []);

  const handleVoiceChange = useCallback((characterId: string, voice: Voice) => {
    setCharacterVoices(prev => ({ ...prev, [characterId]: voice }));
  }, []);
  
  const handleCustomizationChange = useCallback((characterId: string, customization: string) => {
    setCharacterCustomizations(prev => ({ ...prev, [characterId]: customization }));
  }, []);

  const handleGenerateVideo = async () => {
    setError(null);

    // Button is disabled if API key is not configured, so this is a safeguard.
    if (!isApiKeyConfigured) {
      return;
    }
    if (!sceneDescription.trim()) {
      setError('Deskripsi adegan tidak boleh kosong.');
      return;
    }
    if (selectedCharacters.length === 0) {
        setError('Pilih setidaknya satu karakter.');
        return;
    }

    setIsLoading(true);
    setGeneratedVideoUrl(null);

    try {
      const videoUrl = await generateVideo({
        apiKey: effectiveApiKey,
        characters: selectedCharacters,
        voices: characterVoices,
        customizations: characterCustomizations,
        music: musicStyle,
        camera: cameraAngle,
        description: sceneDescription
      });
      setGeneratedVideoUrl(videoUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat membuat video.');
    } finally {
      setIsLoading(false);
    }
  };

  // Determine which feedback message to show below the button.
  let feedbackMessage = null;
  if (!isLoading) {
    // The API key requirement has the highest priority.
    if (!isApiKeyConfigured) {
        feedbackMessage = <p className="text-yellow-400">Harap masukkan API Key untuk mengaktifkan tombol Generate.</p>;
    } else if (error) {
        feedbackMessage = <p className="text-red-400">{error}</p>;
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        {!isApiKeyConfigured && <ApiKeyWarning />}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Controls */}
          <div className="flex flex-col gap-6 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <ApiKeyInput apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
            <CharacterSelector
              allCharacters={CHARACTERS}
              selectedCharacters={selectedCharacters}
              characterVoices={characterVoices}
              characterCustomizations={characterCustomizations}
              onCharacterToggle={handleCharacterToggle}
              onVoiceChange={handleVoiceChange}
              onCustomizationChange={handleCustomizationChange}
            />
            <SceneConfigurator
              sceneDescription={sceneDescription}
              onSceneDescriptionChange={setSceneDescription}
              musicStyle={musicStyle}
              onMusicStyleChange={setMusicStyle}
              cameraAngle={cameraAngle}
              onCameraAngleChange={setCameraAngle}
            />
            <PresetManager
              presets={presets}
              onSave={handleSavePreset}
              onLoad={handleLoadPreset}
              onDelete={handleDeletePreset}
            />
            <button
              onClick={handleGenerateVideo}
              disabled={isLoading || !isApiKeyConfigured}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg text-lg transition-all duration-300 shadow-indigo-500/50 flex items-center justify-center gap-2"
            >
               {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Membuat Video...
                </>
              ) : (
                'Generate Video'
              )}
            </button>
            <div className="text-center mt-2 text-sm h-5">
              {feedbackMessage}
            </div>
          </div>

          {/* Right Column: Video Player */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex items-center justify-center min-h-[300px] lg:min-h-0">
            <VideoPlayer isLoading={isLoading} videoUrl={generatedVideoUrl} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;