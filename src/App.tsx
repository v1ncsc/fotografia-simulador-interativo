import { useState } from 'react';
import CameraControls from './components/CameraControls';
import ExposureBar from './components/ExposureBar';
import SceneSelector from './components/SceneSelector';
import Tutorial from './components/Tutorial';

// --- Types ---
interface CameraSettings {
  aperture: number;
  shutterSpeed: number;
  iso: number;
  whiteBalance: number;
  focalLength: number;
  scene: string;
}

// --- Constants ---
const defaultSettings: CameraSettings = {
  aperture: 5.6,
  shutterSpeed: 1/125,
  iso: 400,
  whiteBalance: 0,
  focalLength: 50,
  scene: 'portrait'
};

const SCENE_CONFIGS = {
  portrait: { aperture: 2.8, shutterSpeed: 1/125, iso: 400, whiteBalance: 5500, focalLength: 85 },
  landscape: { aperture: 8, shutterSpeed: 1/60, iso: 200, whiteBalance: 5500, focalLength: 24 },
  sports: { aperture: 4, shutterSpeed: 1/500, iso: 800, whiteBalance: 5500, focalLength: 200 },
  night: { aperture: 1.4, shutterSpeed: 1/30, iso: 1600, whiteBalance: 3200, focalLength: 50 },
  macro: { aperture: 11, shutterSpeed: 1/125, iso: 400, whiteBalance: 5500, focalLength: 135 }
};

// --- Main Component ---
function App() {
  const [settings, setSettings] = useState<CameraSettings>(defaultSettings);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  // --- Event Handlers ---
  const handleSceneChange = (scene: string) => {
    if (SCENE_CONFIGS[scene as keyof typeof SCENE_CONFIGS]) {
      setSettings(prev => ({ 
        ...prev, 
        ...SCENE_CONFIGS[scene as keyof typeof SCENE_CONFIGS],
        scene 
      }));
    }
  };

  const handleResetSettings = () => {
    setSettings(defaultSettings);
  };

  const handleNextTutorialStep = () => {
    setTutorialStep(prev => prev + 1);
  };

  const scenes = Object.keys(SCENE_CONFIGS);

  // --- Rendering Helpers ---
  const getImageStyle = () => {
    const { aperture, shutterSpeed, iso, whiteBalance, focalLength } = settings;
    
    // Calculate exposure value (EV)
    const ev = Math.log2((aperture * aperture) / shutterSpeed) - Math.log2(iso / 100);
    
    // Calculate brightness from EV (0 EV = properly exposed)
    const brightness = Math.max(0.1, Math.min(2, Math.pow(2, -ev * 0.5) * 1.2));
    
    // Depth of field based on aperture
    const dofBlur = Math.max(0, (aperture - 1.4) * 2);
    
    // Color temperature filter from white balance
    const getColorFilter = (wb: number) => {
      if (wb === 0) return 'none'; // Auto
      if (wb <= 3200) return 'sepia(0.3) saturate(1.2)'; // Tungsten
      if (wb <= 4000) return 'hue-rotate(10deg)'; // Fluorescent
      if (wb <= 5500) return 'none'; // Daylight
      if (wb <= 6500) return 'hue-rotate(-10deg) saturate(0.9)'; // Cloudy
      return 'hue-rotate(-20deg) saturate(0.8)'; // Shade
    };

    // Field of view based on focal length (simulated crop)
    const fovScale = Math.max(0.5, Math.min(1.5, 50 / focalLength));
    
    return {
      filter: `brightness(${brightness}) blur(${dofBlur}px) ${getColorFilter(whiteBalance)}`,
      transform: `scale(${fovScale})`,
      transition: 'all 0.3s ease-in-out'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <header className="text-center space-y-2 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Simulador Interativo de Fotografia
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Aprenda fotografia através da experimentação. Ajuste configurações e veja os resultados em tempo real.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => setShowTutorial(!showTutorial)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 font-medium"
            >
              {showTutorial ? 'Ocultar Tutorial' : 'Mostrar Tutorial'}
            </button>
            <button
              onClick={handleResetSettings}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 font-medium"
            >
              Resetar Configurações
            </button>
          </div>
        </header>

        {/* Tutorial */}
        {showTutorial && (
          <div className="animate-fade-in-up">
            <Tutorial step={tutorialStep} onNextStep={handleNextTutorialStep} />
          </div>
        )}

        {/* Scene Selector */}
        <div className="animate-fade-in-up delay-100">
          <SceneSelector 
            scenes={scenes}
            currentScene={settings.scene} 
            onSceneChange={handleSceneChange} 
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in-up delay-200">
          {/* Camera Viewport */}
          <div className="xl:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Visor da Câmera</h2>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Modo Live View</span>
              </div>
            </div>
            
            {/* Camera Viewfinder */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden border-2 border-gray-600">
              {/* Main Image */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600"
                style={getImageStyle()}
              ></div>
              
              {/* Simulated Photography Subject */}
              <div className="absolute inset-0 flex items-center justify-center" style={getImageStyle()}>
                <div className="w-32 h-40 bg-gradient-to-b from-amber-200 to-amber-600 rounded-t-full opacity-80 shadow-lg"></div>
              </div>

              {/* Grid Lines (Rule of Thirds) */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/3 left-0 right-0 h-px bg-white"></div>
                <div className="absolute top-2/3 left-0 right-0 h-px bg-white"></div>
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white"></div>
                <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white"></div>
              </div>

              {/* Camera Info Overlay */}
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded text-sm font-mono">
                <div>f/{settings.aperture} | {settings.shutterSpeed >= 1 ? `${settings.shutterSpeed}"` : `1/${Math.round(1/settings.shutterSpeed)}`} | ISO {settings.iso}</div>
                <div>{settings.focalLength}mm | WB: {settings.whiteBalance === 0 ? 'Auto' : `${settings.whiteBalance}K`}</div>
              </div>

              {/* Focus Point */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-green-400 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Camera Controls */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-2xl">
              <h3 className="text-xl font-bold mb-4 text-center">Controles da Câmera</h3>
              <CameraControls settings={settings} setSettings={setSettings} />
            </div>

            {/* Exposure Information */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-2xl">
              <ExposureBar 
                shutterSpeed={settings.shutterSpeed}
                aperture={settings.aperture}
                iso={settings.iso}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;