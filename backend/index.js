require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();

const port = process.env.PORT;
const RIOT_API_KEY = process.env.RIOT_API_KEY;

app.get("/summoner/:summonerName", async (req, res) => {
  const summonerName = req.params.summonerName;

  try {
    const response = await axios.get(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener datos del invocador");
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
