"use client";

import { useState } from "react";

export default function SummonerSearch() {
  const [summonerName, setSummonerName] = useState("");
  const [summonerData, setSummonerData] = useState(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSearch = async () => {
    const response = await fetch(`${backendUrl}/summoner/${summonerName}`);
    const data = await response.json();
    setSummonerData(data);
  };

  return (
    <div>
      <input
        type="text"
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
        placeholder="Nombre de Invocador"
      />
      <button onClick={handleSearch}>Buscar</button>

      {summonerData && (
        <div>
          <h2>Información del Invocador:</h2>
          <p>Nombre: {summonerData.name}</p>
          <p>Nivel: {summonerData.summonerLevel}</p>
        </div>
      )}
    </div>
  );
}
