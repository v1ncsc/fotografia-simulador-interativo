import React from 'react';

// --- Types ---
interface ExposureBarProps {
  shutterSpeed: number;
  aperture: number;
  iso: number;
}

// --- Component ---
const ExposureBar: React.FC<ExposureBarProps> = ({ shutterSpeed, aperture, iso }) => {

  // --- EV Calculation ---
  // This formula gives a simplified Exposure Value.
  // EV = 0 is considered "well-exposed".
  const ev = Math.log2((aperture * aperture) / shutterSpeed * (iso / 100));

  // --- EV Indicator Logic ---
  let indicatorColor = 'bg-white';
  let indicatorPosition = 'translate-x-0';

  if (ev > 0.5 && ev <= 1.5) { // Slightly overexposed
    indicatorColor = 'bg-yellow-400';
    indicatorPosition = 'translate-x-2';
  } else if (ev > 1.5) { // Overexposed
    indicatorColor = 'bg-yellow-400';
    indicatorPosition = 'translate-x-4';
  } else if (ev < -0.5 && ev >= -1.5) { // Slightly underexposed
    indicatorColor = 'bg-yellow-400';
    indicatorPosition = '-translate-x-2';
  } else if (ev < -1.5) { // Underexposed
    indicatorColor = 'bg-yellow-400';
    indicatorPosition = '-translate-x-4';
  } else if (ev >= -0.5 && ev <= 0.5) { // Well-exposed
    indicatorColor = 'bg-green-500';
    indicatorPosition = 'translate-x-0';
  }

  // --- Helper to format shutter speed for display ---
  const formatShutterSpeed = (speed: number) => {
    if (speed >= 1) return `${speed}"`;
    return `1/${Math.round(1 / speed)}`;
  };

  return (
    <div className="flex items-center justify-between w-full max-w-lg mx-auto p-2 bg-[#f4efe7] rounded-lg shadow-inner">
      <div className="text-center">
        <span className="text-xs text-gray-500">OBTURADOR</span>
        <p className="font-mono text-lg">{formatShutterSpeed(shutterSpeed)}</p>
      </div>
      <div className="text-center">
        <span className="text-xs text-gray-500">ABERTURA</span>
        <p className="font-mono text-lg">f/{aperture}</p>
      </div>
      <div className="text-center">
        <span className="text-xs text-gray-500">ISO</span>
        <p className="font-mono text-lg">{iso}</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-500">EV</span>
        <div className="relative w-12 h-2 mt-2 bg-gray-300 rounded-full">
          <div
            className={`absolute top-0 left-1/2 -ml-1 h-2 w-2 rounded-full transform transition-transform duration-300 ${indicatorPosition} ${indicatorColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ExposureBar;
