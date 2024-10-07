"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import topIcon from "@/public/images/icon-position-top.png";
import jungleIcon from "@/public/images/icon-position-jungle.png";
import midIcon from "@/public/images/icon-position-middle.png";
import adcIcon from "@/public/images/icon-position-bottom.png";
import suppIcon from "@/public/images/icon-position-utility.png";

export default function Roulette({ line, spinAll }) {
  const [champions, setChampions] = useState([]);
  const [selectedChampion, setSelectedChampion] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [remainingSpins, setRemainingSpins] = useState(2); // Giros individuales permitidos
  const [showButton, setShowButton] = useState(false); // Estado para mostrar el botón de giro

  useEffect(() => {
    // Obtener la lista de campeones desde el backend
    const fetchChampions = async () => {
      const response = await fetch("http://localhost:3030/champions");
      const data = await response.json();
      setChampions(data);
    };

    fetchChampions();
  }, []);

  const pickRandomChampion = () => {
    if (isSpinning || champions.length === 0) return;
    setIsSpinning(true);
    setShowButton(false); // Ocultar el botón mientras está girando

    let count = 0;
    const totalSpins = 40; // Número de campeones mostrados antes del definitivo
    const interval = 25; // 0.2 segundos entre cambios de campeón
    let intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * champions.length);
      setSelectedChampion(champions[randomIndex]);
      count++;

      if (count === totalSpins) {
        clearInterval(intervalId);
        setTimeout(() => {
          const finalIndex = Math.floor(Math.random() * champions.length);
          setSelectedChampion(champions[finalIndex]);
          setIsSpinning(false);
          setShowButton(true); // Mostrar el botón después de que termine el giro
        }, interval);
      }
    }, interval);
  };

  // Efecto que escucha los giros masivos sin afectar los usos
  useEffect(() => {
    if (spinAll) {
      pickRandomChampion();
    }
  }, [spinAll]);

  const drawLine = (role: string) => {
    switch (role) {
      case "top":
        return topIcon;
      case "jungle":
        return jungleIcon;
      case "mid":
        return midIcon;
      case "adc":
        return adcIcon;
      case "support":
        return suppIcon;
    }
  };

  return (
    <div className="flex flex-col items-center">
      {selectedChampion && (
        <>
          <h1 className="text-3xl font-MainFont font-bold text-white">
            <Image src={drawLine(line)} alt={line} width={30} height={30} />
          </h1>
          <div className="flex flex-col items-center mt-4">
            <Image
              src={selectedChampion.image}
              alt={selectedChampion.name}
              width={300}
              height={300}
              priority
              onClick={() => {
                if (remainingSpins > 0) {
                  pickRandomChampion();
                  setRemainingSpins(remainingSpins - 1); // Reducir los giros solo en el giro individual
                }
              }}
              className="border border-[#c89b3c] hover:border-[#C8AA6E]"
            />
            <h2 className="font-bold text-3xl mt-4 text-white">
              {selectedChampion.name}
            </h2>
          </div>
        </>
      )}

      {/* {showButton && ( // Mostrar el botón solo después de que el resultado se haya mostrado
        <button
          onClick={() => {
            if (remainingSpins > 0) {
              pickRandomChampion();
              setRemainingSpins(remainingSpins - 1); // Reducir los giros solo en el giro individual
            }
          }}
          disabled={isSpinning || remainingSpins <= 0}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          {remainingSpins > 0
            ? `Reroll (${remainingSpins})`
            : "Sin Giros Restantes"}
        </button>
      )} */}
    </div>
  );
}
