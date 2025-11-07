import React, { useState } from "react";
import CameraControls from "./components/CameraControls";
import ExposureBar from "./components/ExposureBar";
import SceneSelector from "./components/SceneSelector";
import Tutorial from "./components/Tutorial";

// --- Constants for Camera Settings ---
const APERTURE_VALUES = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
const SHUTTER_SPEED_VALUES = [1, 1/2, 1/4, 1/8, 1/15, 1/30, 1/60, 1/125, 1/250, 1/500, 1/1000];
const ISO_VALUES = [100, 200, 400, 800, 1600, 3200, 6400];
const WHITE_BALANCE_MODES = {
  'Auto': 0, 'Daylight': 5500, 'Cloudy': 6500, 'Shade': 7500, 'Tungsten': 3200, 'Fluorescent': 4000
};
const FOCAL_LENGTH_VALUES = [24, 35, 50, 70, 85, 135, 200];
const SCENES = {
  'Portrait': '/assets/images/placeholder-portrait.jpg',
  'Action': '/assets/images/placeholder-action.jpg',
  'Low Light': '/assets/images/placeholder-lowlight.jpg',
  'Landscape': '/assets/images/placeholder-landscape.jpg',
};
const SCENE_NAMES = Object.keys(SCENES);

// --- Default Camera Settings ---
const defaultSettings = {
  aperture: 2.8,
  shutterSpeed: 1/60,
  iso: 400,
  whiteBalance: WHITE_BALANCE_MODES['Auto'],
  focalLength: 50,
  scene: 'Portrait',
};

function App() {
  const [settings, setSettings] = useState(defaultSettings);
  const [tutorialStep, setTutorialStep] = useState(0);

  const handleSceneChange = (scene: string) => {
    setSettings(prev => ({ ...prev, scene }));
  };

  const handleNextTutorialStep = () => {
    setTutorialStep(prev => prev + 1);
  };

  // --- Image Style Calculation ---
  const getImageStyle = () => {
    const { aperture, iso, shutterSpeed, focalLength } = settings;
    const ev = Math.log2((aperture * aperture) / shutterSpeed * (iso / 100));
    const brightness = Math.max(0.1, 1 + (ev - 10) / 10);
    const motionBlur = shutterSpeed > 1/30 ? (shutterSpeed - 1/30) * 15 : 0;
    const scale = 1 + (focalLength - 50) / 100;
    return {
      filter: `brightness(${brightness}) blur(${motionBlur}px)`,
      transform: `scale(${scale})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      transition: 'all 0.3s ease-in-out',
    };
  };

  // --- White Balance Overlay Style ---
  const getWhiteBalanceStyle = () => {
    const { whiteBalance } = settings;
    let color = 'transparent';
    if (whiteBalance === WHITE_BALANCE_MODES['Tungsten']) color = 'rgba(255, 209, 179, 0.2)'; // More orange/yellow
    else if (whiteBalance === WHITE_BALANCE_MODES['Shade'] || whiteBalance === WHITE_BALANCE_MODES['Cloudy']) color = 'rgba(179, 209, 255, 0.2)'; // More blue
    else if (whiteBalance === WHITE_BALANCE_MODES['Daylight']) color = 'rgba(255, 255, 224, 0.1)'; // Slight yellow
    else if (whiteBalance === WHITE_BALANCE_MODES['Fluorescent']) color = 'rgba(224, 179, 255, 0.1)'; // Slight magenta
    return { backgroundColor: color, mixBlendMode: 'overlay' } as React.CSSProperties; // Overlay works better
  };

  // --- Grain Effect ---
  const getGrainStyle = () => {
    const grainOpacity = settings.iso > 400 ? (settings.iso - 400) / 8000 : 0;
    return { '--grain-opacity': grainOpacity } as React.CSSProperties;
  };

  const imageClassName = `relative w-full aspect-video rounded-lg overflow-hidden bg-gray-300`;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#fcfbf8] overflow-x-hidden" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4efe7] px-10 py-3">
          <ExposureBar shutterSpeed={settings.shutterSpeed} aperture={settings.aperture} iso={settings.iso} />
          <SceneSelector scenes={SCENE_NAMES} currentScene={settings.scene} onSceneChange={handleSceneChange} />
        </header>
        <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 relative">
            <h2 className="text-[#1c170d] tracking-light text-2xl md:text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">Simulador de Fotografia</h2>
            <p className="text-[#1c170d] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Use os controles abaixo para ajustar a câmera e ver o resultado em tempo real.
            </p>
            <div className="p-4 overflow-hidden rounded-lg">
              <div className={imageClassName} style={getImageStyle()}>
                <div className="absolute inset-0" style={getWhiteBalanceStyle()} />
                <div className="grain-overlay" style={getGrainStyle()} />
              </div>
            </div>
            <div className="my-4">
              <CameraControls settings={settings} setSettings={setSettings} />
            </div>
            <div className="relative mt-4 h-48"> {/* Container for Tutorial and Reset button */}
              <Tutorial step={tutorialStep} onNextStep={handleNextTutorialStep} />
            </div>
            <div className="flex justify-center p-4">
              <button
                onClick={() => setSettings(defaultSettings)}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f4efe7] text-[#1c170d] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                Resetar Configurações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
