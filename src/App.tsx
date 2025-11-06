import React, { useState } from "react";
import CameraControls from "./components/CameraControls";

// Default camera settings
const defaultSettings = {
  aperture: 2.8,
  iso: 100,
  exposureTime: 200,
  lightIntensity: 50,
  lightPosition: 45,
};

function App() {
  // State for camera settings
  const [settings, setSettings] = useState(defaultSettings);

  // Function to get image style based on settings
  const getImageStyle = () => {
    const { aperture, lightIntensity, lightPosition } = settings;

    // Base brightness adjustment
    const brightness = 1 + (lightIntensity - 50) / 100;

    // Blur effect for aperture
    const blur = Math.max(0, 5 - aperture);

    // Calculate light gradient based on position and intensity
    const lightX = 50 + (lightPosition - 45);
    const lightY = 50;
    const lightColor = `rgba(255, 255, 220, ${lightIntensity / 200})`;

    const modelImageUrl = '/assets/images/model.png';
    const backgroundImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCFhRsc_E4fjaUa79A8y9Xf9S3bck_KEVhv_ga0Phz3oBxeqYuu-slo4wC6dsbPwPvtuGPjcyjkcsdCjCUcjaNFNf7majTl3JkK0b1RZWPJ5OR6DrvuMkRFJiLksMLGh8sIuSsCkXwC-7SLbd_Tzf6vTOx5f1HQpWCABgilB9XHQV7hd7ZdZRA4Aossjlk_vr0A0TK1-hcEezFPoSqVM8_CF8Ykctjaesbe3vI40wx5Ft_IKljVbCuBxpJMnWb9OZ2QLlQO-3MMnzM";

    return {
      filter: `blur(${blur}px) brightness(${brightness})`,
      backgroundImage: `
        radial-gradient(circle at ${lightX}% ${lightY}%, ${lightColor} 0%, transparent 50%),
        url("${modelImageUrl}")
      `,
      backgroundSize: 'auto, contain',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'center, center',
    };
  };

  // Function to get grain style based on ISO
  const getGrainStyle = () => {
    const grainOpacity = settings.iso > 400 ? (settings.iso - 400) / 1600 : 0;
    return {
      '--grain-opacity': grainOpacity,
    } as React.CSSProperties;
  };

  // Function to get feedback message based on settings
  const getFeedbackMessage = () => {
    const { aperture, iso, exposureTime } = settings;
    if (iso > 1600 || exposureTime > 500) {
      return "Sua foto está superexposta";
    }
    if (aperture < 2.8 && iso < 400) {
      return "Configuração ideal para retratos";
    }
    return "Ajuste os controles para encontrar a configuração ideal.";
  };

  const imageClassName = `relative w-full aspect-video rounded-lg overflow-hidden ${settings.exposureTime > 800 ? "motion-blur" : ""}`;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#fcfbf8] group/design-root overflow-x-hidden" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4efe7] px-10 py-3">
          {/* Header content */}
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 className="text-[#1c170d] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">Simulador de Fotografia</h2>
            <p className="text-[#1c170d] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Experimente com diferentes configurações de câmera e iluminação para dominar a arte da fotografia.
            </p>
            <div className="p-4">
            <div
              className={imageClassName}
              style={getImageStyle()}
            >
              <div
                className="grain-overlay"
                style={getGrainStyle()}
              />
            </div>
          </div>
            <CameraControls settings={settings} setSettings={setSettings} defaultSettings={defaultSettings} />
            <div className="text-center p-4 text-[#1c170d]">
              {getFeedbackMessage()}
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