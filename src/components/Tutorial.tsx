import React from 'react';

// --- Types ---
interface TutorialProps {
  step: number;
  onNextStep: () => void;
}

const tutorialSteps = [
  { text: "Bem-vindo ao simulador! Clique em 'Próximo' para começar." },
  { text: "Ajuste a ABERTURA para controlar a luminosidade e o desfoque do fundo." },
  { text: "Use o OBTURADOR. Velocidades rápidas congelam o movimento, velocidades lentas criam um rastro." },
  { text: "Aumente o ISO em ambientes escuros, mas cuidado com o ruído na imagem." },
  { text: "O BALANÇO DE BRANCO corrige as cores da sua foto de acordo com a iluminação." },
  { text: "Altere a LENTE para simular o zoom e mudar a perspectiva da cena." },
  { text: "Você completou o tutorial! Agora, explore livremente." },
];

// --- Component ---
const Tutorial: React.FC<TutorialProps> = ({ step, onNextStep }) => {
  if (step >= tutorialSteps.length) {
    return null; // Tutorial is finished
  }

  return (
    <div className="absolute inset-x-0 bottom-0 w-full max-w-md mx-auto p-4 bg-black bg-opacity-70 text-white rounded-lg shadow-lg z-10 animate-fade-in-up">
      <p className="text-center">{tutorialSteps[step].text}</p>
      <div className="flex justify-center mt-4">
        <button
          onClick={onNextStep}
          className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
        >
          {step === 0 ? "Começar" : "Próximo Passo"}
        </button>
      </div>
       {/* Progress Dots */}
       <div className="flex justify-center gap-2 mt-3">
        {tutorialSteps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === step ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
