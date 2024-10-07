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
    <div className="flex flex-col items-center justify-center from-[#091428] bg-gradient-to-t to-[#010a13] text-[#c89b3c] font-MainFont">
      <div className="flex flex-col items-center justify-center h-screen">
        {!showRoulettes && (
          <h2 className="text-4xl font-MainFont font-bold uppercase text-white">
            Bienvenidos a la
          </h2>
        )}
        <h1 className="my-4 text-8xl font-MainFont font-bold uppercase">
          La Magrerueda
        </h1>
        {showRoulettes && (
          <div className="flex flex-row gap-8 mt-4">
            <Roulette line="top" spinAll={spinAll} />
            <Roulette line="jungle" spinAll={spinAll} />
            <Roulette line="mid" spinAll={spinAll} />
            <Roulette line="adc" spinAll={spinAll} />
            <Roulette line="support" spinAll={spinAll} />
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
          className="bg-[#c89b3c] hover:bg-[#C8AA6E] text-white px-4 py-2 mt-10 border font-MainFont  font-bold uppercase"
        >
          {!showRoulettes ? "Empezar" : "Volver a empezar"}
        </button>
      </div>
    </div>
  );
}
