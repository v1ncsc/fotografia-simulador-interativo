import React from 'react';

// --- Types ---
interface InteractiveControlProps {
  label: string;
  value: string | number;
  options: (string | number)[];
  currentValue: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactNode; // For SVG icons
}

// --- Component ---
const InteractiveControl: React.FC<InteractiveControlProps> = ({
  label,
  value,
  options,
  currentValue,
  onChange,
  onClick,
  isActive,
  icon,
}) => {
  const currentIndex = options.findIndex(option => option === currentValue);

  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      {/* Clickable Area: Icon + Label */}
      <button
        onClick={onClick}
        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
          isActive ? 'text-green-500' : 'text-[#1c170d]'
        }`}
      >
        {icon}
        <span className="text-xs font-bold mt-1">{label}</span>
        <span className="text-sm font-light">{value}</span>
      </button>

      {/* Slider: Appears when active */}
      {isActive && (
        <div className="absolute bottom-full mb-4 p-4 bg-[#f4efe7] rounded-lg shadow-lg w-64 animate-fade-in-up">
          <input
            type="range"
            min={0}
            max={options.length - 1}
            step={1}
            value={currentIndex}
            onChange={onChange}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-[#1c170d] mt-1">
            <span>{options[0]}</span>
            <span>{options[options.length - 1]}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveControl;
