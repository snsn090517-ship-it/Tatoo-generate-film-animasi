
import React from 'react';
import { MUSIC_STYLES, CAMERA_ANGLES } from '../constants';

interface SceneConfiguratorProps {
  sceneDescription: string;
  onSceneDescriptionChange: (value: string) => void;
  musicStyle: string;
  onMusicStyleChange: (value: string) => void;
  cameraAngle: string;
  onCameraAngleChange: (value: string) => void;
}

const SceneConfigurator: React.FC<SceneConfiguratorProps> = ({
  sceneDescription,
  onSceneDescriptionChange,
  musicStyle,
  onMusicStyleChange,
  cameraAngle,
  onCameraAngleChange,
}) => {
  return (
    <div className="space-y-4 pt-4 border-t border-gray-700">
      <h2 className="text-xl font-semibold text-indigo-300 border-l-4 border-indigo-400 pl-3">2. Atur Adegan</h2>
      
      <div>
        <label htmlFor="scene-description" className="block text-md font-medium text-gray-300 mb-2">
          Deskripsi Adegan
        </label>
        <textarea
          id="scene-description"
          rows={5}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Contoh: Iako sedang bermain layangan di lapangan desa, tiba-tiba Iopatua datang membawa buah mangga..."
          value={sceneDescription}
          onChange={(e) => onSceneDescriptionChange(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="music-style" className="block text-md font-medium text-gray-300 mb-2">
            Gaya Musik
          </label>
          <select
            id="music-style"
            value={musicStyle}
            onChange={(e) => onMusicStyleChange(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {MUSIC_STYLES.map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="camera-angle" className="block text-md font-medium text-gray-300 mb-2">
            Posisi Kamera
          </label>
          <select
            id="camera-angle"
            value={cameraAngle}
            onChange={(e) => onCameraAngleChange(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {CAMERA_ANGLES.map(angle => (
              <option key={angle} value={angle}>{angle}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SceneConfigurator;
