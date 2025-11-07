// src/App.tsx
import { useState, useMemo } from 'react';
import CameraControls from './components/CameraControls';
import { Aperture, Iso, ExposureTime } from './types';

function App() {
  const [aperture, setAperture] = useState<Aperture>(0); // 0-7, maps to f/1.4-f/22
  const [iso, setIso] = useState<Iso>(0); // 0-6, maps to 100-6400
  const [exposureTime, setExposureTime] = useState<ExposureTime>(0); // 0-11, maps to 1/4000s to 1s

  const APERTURE_MAP: number[] = [1.4, 2, 2.8, 4, 5.6, 8, 11, 22];
  const ISO_MAP: number[] = [100, 200, 400, 800, 1600, 3200, 6400];
  const EXP_TIME_MAP: number[] = [1/4000, 1/2000, 1/1000, 1/500, 1/250, 1/125, 1/60, 1/30, 1/15, 1/8, 1/4, 1];


  // --- GET IMAGE STYLE ---
  const getImageStyle = useMemo(() => {
    const currentAperture = APERTURE_MAP[aperture];
    const currentIso = ISO_MAP[iso];
    const currentExpTime = EXP_TIME_MAP[exposureTime];

    // 1. Blur (controlled by Aperture)
    const getBlur = () => {
      // Non-linear mapping for a more realistic effect
      const blurVal = (1 - ((currentAperture - 1.4) / (22 - 1.4))) ** 2 * 20;
      return Math.max(0, Math.min(20, blurVal));
    };

    // 2. Brightness (controlled by ISO + Exposure Time)
    const getBrightness = () => {
        // Refined formula for better visual range
        const isoContribution = Math.log2(currentIso / 100) * 0.15; // Logarithmic response
        const exposureContribution = Math.log2(currentExpTime / (1/4000)) * 0.1; // Logarithmic response, relative to base
        const baseBrightness = 0.5; // Start from a darker base
        const totalBrightness = baseBrightness + isoContribution + exposureContribution;
        return Math.max(0.1, Math.min(2.5, totalBrightness));
    };

    // 3. Grain/Noise (controlled by ISO)
    const getGrain = () => {
      const noiseAmount = Math.max(0, (currentIso - 100) / (6400 - 100)) * 0.25;
      return noiseAmount;
    };


    const brightnessValue = getBrightness();

    return {
      backgroundStyle: {
        filter: `blur(${getBlur()}px) brightness(${brightnessValue})`,
        backgroundImage: 'url(/assets/images/studio-background.jpg)',
      },
      modelStyle: {
        filter: `brightness(${brightnessValue})`,
      },
      noiseStyle: {
        opacity: getGrain(),
      },
      brightnessValue: brightnessValue,
    };
  }, [aperture, iso, exposureTime]);


  // --- GET FEEDBACK MESSAGE ---
  const getFeedbackMessage = useMemo(() => {
    const currentAperture = APERTURE_MAP[aperture];
    const currentIso = ISO_MAP[iso];
    const { brightnessValue } = getImageStyle;

    if (brightnessValue > 1.8) return "Foto superexposta";
    if (brightnessValue < 0.6) return "Foto subsexposta";
    if (currentAperture <= 2.8) return "Bokeh perfeito para retratos!";
    if (currentAperture >= 11) return "Tudo em foco, ideal para paisagens";
    if (currentIso > 1600) return "ISO alto gera ruído visível";

    return "Ajuste os controles para encontrar a foto perfeita.";
  }, [aperture, iso, getImageStyle]);


  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col justify-center items-center font-sans">
      <div className="relative w-[1000px] h-[667px] overflow-hidden rounded-lg shadow-2xl bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-300 ease-in-out"
          style={getImageStyle.backgroundStyle}
        />
        <div
          className="absolute inset-0 bg-contain bg-no-repeat bg-center"
        >
          <img
            src="/assets/images/model.png"
            alt="Model"
            className="w-full h-full object-contain transition-all duration-300 ease-in-out"
            style={getImageStyle.modelStyle}
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none noise-overlay"
          style={getImageStyle.noiseStyle}
        />
      </div>

      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-md text-center">
          <p className="text-lg">{getFeedbackMessage}</p>
      </div>

      <CameraControls
        aperture={aperture}
        setAperture={setAperture}
        iso={iso}
        setIso={setIso}
        exposureTime={exposureTime}
        setExposureTime={setExposureTime}
        apertureValue={APERTURE_MAP[aperture]}
        isoValue={ISO_MAP[iso]}
        exposureTimeValue={EXP_TIME_MAP[exposureTime]}
      />
    </div>
  );
}

export default App;
