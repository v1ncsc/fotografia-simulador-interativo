import React from 'react';
import Slider from './Slider';
import Tooltip from './Tooltip';
import { Aperture, Iso, ExposureTime } from '../types';

// Helper to format exposure time for display
const formatExposureTime = (val: number): string => {
  if (val < 1) {
    return `1/${Math.round(1 / val)}s`;
  }
  return `${val}"`;
};

interface CameraControlsProps {
  aperture: Aperture;
  setAperture: React.Dispatch<React.SetStateAction<Aperture>>;
  iso: Iso;
  setIso: React.Dispatch<React.SetStateAction<Iso>>;
  exposureTime: ExposureTime;
  setExposureTime: React.Dispatch<React.SetStateAction<ExposureTime>>;
  apertureValue: number;
  isoValue: number;
  exposureTimeValue: number;
}

const CameraControls: React.FC<CameraControlsProps> = ({
  aperture,
  setAperture,
  iso,
  setIso,
  exposureTime,
  setExposureTime,
  apertureValue,
  isoValue,
  exposureTimeValue,
}) => {
  return (
    <div className="w-[1000px] bg-gray-800 rounded-lg p-6 shadow-lg mt-8 slider-container">
      <div className="grid grid-cols-3 gap-6">
        <Tooltip text="Abertura (f-stop): Controla o desfoque do fundo (profundidade de campo).">
          <Slider
            label="Abertura"
            value={`f/${apertureValue.toFixed(1)}`}
            min={0}
            max={7}
            step={1}
            currentValue={aperture}
            onChange={(e) => setAperture(parseInt(e.target.value) as Aperture)}
          />
        </Tooltip>

        <Tooltip text="ISO: Controla o brilho geral e o ruído da imagem.">
          <Slider
            label="ISO"
            value={isoValue.toString()}
            min={0}
            max={6}
            step={1}
            currentValue={iso}
            onChange={(e) => setIso(parseInt(e.target.value) as Iso)}
          />
        </Tooltip>

        <Tooltip text="Tempo de Exposição: O principal controle de brilho da sua foto.">
          <Slider
            label="Tempo de Exposição"
            value={formatExposureTime(exposureTimeValue)}
            min={0}
            max={11}
            step={1}
            currentValue={exposureTime}
            onChange={(e) => setExposureTime(parseInt(e.target.value) as ExposureTime)}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default CameraControls;
