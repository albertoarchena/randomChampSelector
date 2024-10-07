"use client";

import { useState } from "react";
import Roulette from "./Roulette";

export default function Page() {
  const [spinAll, setSpinAll] = useState(false); // Estado para activar el giro en todas las ruletas
  const [showRoulettes, setShowRoulettes] = useState(false); // Controla la visibilidad de las ruletas

  const handleSpinAll = () => {
    setSpinAll(false); // Asegura que el valor sea reseteado a false antes de cambiarlo a true
    setTimeout(() => {
      setSpinAll(true); // Activa el giro masivo para todas las ruletas
      setTimeout(() => setSpinAll(false), 100); // Detenemos el estado de spin después de un corto intervalo
    }, 500); // Delay para asegurarse que las ruletas estén ya montadas
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-20">La Magrerueda</h1>
      <div className="flex flex-col items-center justify-center h-screen -mt-24">
        {showRoulettes && (
          <div className="flex flex-row gap-8 mt-4">
            <Roulette line="Ruleta 1" spinAll={spinAll} />
            <Roulette line="Ruleta 2" spinAll={spinAll} />
            <Roulette line="Ruleta 3" spinAll={spinAll} />
            <Roulette line="Ruleta 4" spinAll={spinAll} />
            <Roulette line="Ruleta 5" spinAll={spinAll} />
          </div>
        )}

        <button
          onClick={() => {
            if (!showRoulettes) {
              setShowRoulettes(true); // Muestra las ruletas por primera vez
              setTimeout(handleSpinAll, 100); // Llama a handleSpinAll después de que las ruletas se hayan montado
            } else {
              handleSpinAll(); // Si ya están montadas, simplemente gira todas las ruletas
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 mt-10 rounded"
        >
          {!showRoulettes ? "Empezar" : "Volver a empezar"}
        </button>
      </div>
    </div>
  );
}
