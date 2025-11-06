import React from 'react';

interface SliderProps {
  label: string;
  value: string;
  description: string;
  min: number;
  max: number;
  step: number;
  currentValue: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider: React.FC<SliderProps> = ({ label, value, description, min, max, step, currentValue, onChange }) => {
  const inputId = `slider-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const progress = ((currentValue - min) / (max - min)) * 100;

  return (
    <div>
      <div className="@container">
        <div className="relative flex w-full flex-col items-start justify-between gap-3 p-4 md:flex-row md:items-center">
          <div className="flex w-full shrink-[3] items-center justify-between">
            <label htmlFor={inputId} className="text-[#1c170d] text-base font-medium leading-normal">{label}</label>
            <p className="text-[#1c170d] text-sm font-normal leading-normal md:hidden">{value}</p>
          </div>
          <div className="flex h-4 w-full items-center gap-4">
            <div className="relative w-full h-2 flex items-center">
              <input
                id={inputId}
                aria-label={label}
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentValue}
                onChange={onChange}
                className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-10"
              />
              <div className="absolute w-full h-1 bg-[#e8e0ce] rounded-sm pointer-events-none"></div>
              <div
                className="absolute h-1 bg-[#f4af25] rounded-sm pointer-events-none"
                style={{ width: `${progress}%` }}
              ></div>
              <div
                className="absolute w-4 h-4 bg-[#f4af25] rounded-full cursor-pointer -translate-x-1/2 pointer-events-none"
                style={{ left: `${progress}%` }}
              ></div>
            </div>
            <p className="text-[#1c170d] text-sm font-normal leading-normal hidden md:block">{value}</p>
          </div>
        </div>
      </div>
      <p className="text-[#1c170d] text-base font-normal leading-normal pb-3 pt-1 px-4">{description}</p>
    </div>
  );
};

export default Slider;
