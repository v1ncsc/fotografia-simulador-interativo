import React from 'react';

// --- Types ---
interface SceneSelectorProps {
  scenes: string[];
  currentScene: string;
  onSceneChange: (scene: string) => void;
}

// --- Component ---
const SceneSelector: React.FC<SceneSelectorProps> = ({ scenes, currentScene, onSceneChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold text-[#1c170d] mr-2">Cenário:</span>
      {scenes.map((scene) => (
        <button
          key={scene}
          onClick={() => onSceneChange(scene)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            currentScene === scene
              ? 'bg-green-500 text-white font-bold'
              : 'bg-[#f4efe7] text-[#1c170d] hover:bg-gray-300'
          }`}
        >
          {scene}
        </button>
      ))}
    </div>
  );
};

export default SceneSelector;
