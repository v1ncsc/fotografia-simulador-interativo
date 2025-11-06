import React from 'react';
import Slider from './Slider';
import Tooltip from './Tooltip';

interface CameraControlsProps {
  settings: {
    aperture: number;
    iso: number;
    exposureTime: number;
    lightIntensity: number;
    lightPosition: number;
  };
  setSettings: React.Dispatch<React.SetStateAction<any>>;
  defaultSettings: any;
}

const CameraControls: React.FC<CameraControlsProps> = ({
  settings,
  setSettings,
}) => {
  const { aperture, iso, exposureTime, lightIntensity, lightPosition } = settings;

  const handleSettingChange = (setting: string, value: number) => {
    setSettings((prev: any) => ({ ...prev, [setting]: value }));
  };

  return (
    <div>
      <h2 className="text-[#1c170d] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Controles da Câmera e Iluminação</h2>

      <Tooltip text="Controla a quantidade de luz que entra na câmera e a profundidade de campo.">
        <Slider
          label="Abertura"
          value={`f/${aperture.toFixed(1)}`}
          description=""
          min={1.4}
          max={22}
          step={0.1}
          currentValue={aperture}
          onChange={(e) => handleSettingChange('aperture', parseFloat(e.target.value))}
        />
      </Tooltip>

      <Tooltip text="Define a sensibilidade do sensor à luz. Valores mais altos são úteis em ambientes com pouca luz, mas podem gerar ruído na imagem.">
        <Slider
          label="ISO"
          value={iso.toString()}
          description=""
          min={100}
          max={6400}
          step={100}
          currentValue={iso}
          onChange={(e) => handleSettingChange('iso', parseInt(e.target.value, 10))}
        />
      </Tooltip>

      <Tooltip text="Determina por quanto tempo o sensor fica exposto à luz. Tempos mais longos capturam mais luz, mas podem causar desfoque em objetos em movimento.">
        <Slider
          label="Tempo de Exposição"
          value={`1/${exposureTime}s`}
          description=""
          min={1}
          max={1000}
          step={1}
          currentValue={exposureTime}
          onChange={(e) => handleSettingChange('exposureTime', parseInt(e.target.value, 10))}
        />
      </Tooltip>

      <Tooltip text="Ajusta o brilho da fonte de luz principal.">
        <Slider
          label="Intensidade da Luz"
          value={`${lightIntensity}%`}
          description=""
          min={0}
          max={100}
          step={1}
          currentValue={lightIntensity}
          onChange={(e) => handleSettingChange('lightIntensity', parseInt(e.target.value, 10))}
        />
      </Tooltip>

      <Tooltip text="Controla o ângulo da luz em relação ao objeto, afetando sombras e reflexos.">
        <Slider
          label="Posição da Luz"
          value={`${lightPosition}°`}
          description=""
          min={0}
          max={90}
          step={1}
          currentValue={lightPosition}
          onChange={(e) => handleSettingChange('lightPosition', parseInt(e.target.value, 10))}
        />
      </Tooltip>
    </div>
  );
};

export default CameraControls;
