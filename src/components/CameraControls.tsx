import React, { useState } from 'react';
import InteractiveControl from './InteractiveControl';
import { ApertureIcon, ShutterSpeedIcon, ISOIcon, WhiteBalanceIcon, FocalLengthIcon } from './Icons';

// --- Constants ---
const APERTURE_VALUES = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
const SHUTTER_SPEED_VALUES = [1, 1/2, 1/4, 1/8, 1/15, 1/30, 1/60, 1/125, 1/250, 1/500, 1/1000];
const ISO_VALUES = [100, 200, 400, 800, 1600, 3200, 6400];
const WHITE_BALANCE_MODES = {
  'Auto': 0, 'Daylight': 5500, 'Cloudy': 6500, 'Shade': 7500, 'Tungsten': 3200, 'Fluorescent': 4000
};
const FOCAL_LENGTH_VALUES = [24, 35, 50, 70, 85, 135, 200];
const WB_NAMES = Object.keys(WHITE_BALANCE_MODES);
const WB_VALUES = Object.values(WHITE_BALANCE_MODES);

// --- Types ---
interface CameraSettings {
  aperture: number;
  shutterSpeed: number;
  iso: number;
  whiteBalance: number;
  focalLength: number;
  scene: string;
}

interface CameraControlsProps {
  settings: CameraSettings;
  setSettings: React.Dispatch<React.SetStateAction<CameraSettings>>;
}

type ActiveControl = 'aperture' | 'shutterSpeed' | 'iso' | 'whiteBalance' | 'focalLength' | null;

// --- Component ---
const CameraControls: React.FC<CameraControlsProps> = ({ settings, setSettings }) => {
  const [activeControl, setActiveControl] = useState<ActiveControl>(null);

  const handleControlClick = (control: ActiveControl) => {
    setActiveControl(prev => (prev === control ? null : control));
  };

  const handleSettingChange = (setting: keyof CameraSettings, index: number) => {
    let value;
    switch (setting) {
      case 'aperture': value = APERTURE_VALUES[index]; break;
      case 'shutterSpeed': value = SHUTTER_SPEED_VALUES[index]; break;
      case 'iso': value = ISO_VALUES[index]; break;
      case 'whiteBalance': value = WB_VALUES[index]; break;
      case 'focalLength': value = FOCAL_LENGTH_VALUES[index]; break;
      default: return;
    }
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  // --- Helpers ---
  const formatShutterSpeed = (speed: number) => {
    if (speed >= 1) return `${speed}"`;
    return `1/${Math.round(1 / speed)}`;
  };

  const getCurrentWBName = () => {
    return WB_NAMES[WB_VALUES.indexOf(settings.whiteBalance)] || 'Auto';
  };

  return (
    <div className="flex justify-around items-center w-full bg-[#f4efe7] p-2 rounded-lg shadow-md">
      {/* Aperture Control */}
      <InteractiveControl
        label="Abertura"
        value={`f/${settings.aperture}`}
        options={APERTURE_VALUES.map(v => `f/${v}`)}
        currentValue={settings.aperture}
        onChange={(e) => handleSettingChange('aperture', parseInt(e.target.value, 10))}
        onClick={() => handleControlClick('aperture')}
        isActive={activeControl === 'aperture'}
        icon={<ApertureIcon />}
      />

      {/* Shutter Speed Control */}
      <InteractiveControl
        label="Obturador"
        value={formatShutterSpeed(settings.shutterSpeed)}
        options={SHUTTER_SPEED_VALUES.map(formatShutterSpeed)}
        currentValue={settings.shutterSpeed}
        onChange={(e) => handleSettingChange('shutterSpeed', parseInt(e.target.value, 10))}
        onClick={() => handleControlClick('shutterSpeed')}
        isActive={activeControl === 'shutterSpeed'}
        icon={<ShutterSpeedIcon />}
      />

      {/* ISO Control */}
      <InteractiveControl
        label="ISO"
        value={settings.iso}
        options={ISO_VALUES}
        currentValue={settings.iso}
        onChange={(e) => handleSettingChange('iso', parseInt(e.target.value, 10))}
        onClick={() => handleControlClick('iso')}
        isActive={activeControl === 'iso'}
        icon={<ISOIcon />}
      />

      {/* White Balance Control */}
      <InteractiveControl
        label="Balanço"
        value={getCurrentWBName()}
        options={WB_NAMES}
        currentValue={settings.whiteBalance}
        onChange={(e) => handleSettingChange('whiteBalance', parseInt(e.target.value, 10))}
        onClick={() => handleControlClick('whiteBalance')}
        isActive={activeControl === 'whiteBalance'}
        icon={<WhiteBalanceIcon />}
      />

      {/* Focal Length Control */}
      <InteractiveControl
        label="Lente"
        value={`${settings.focalLength}mm`}
        options={FOCAL_LENGTH_VALUES.map(v => `${v}mm`)}
        currentValue={settings.focalLength}
        onChange={(e) => handleSettingChange('focalLength', parseInt(e.target.value, 10))}
        onClick={() => handleControlClick('focalLength')}
        isActive={activeControl === 'focalLength'}
        icon={<FocalLengthIcon />}
      />
    </div>
  );
};

export default CameraControls;
