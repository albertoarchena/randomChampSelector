const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3030;

app.use(cors());

// Ruta para obtener los campeones con nombre e imagen
app.get("/champions", async (req, res) => {
  try {
    const versionResponse = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    const latestVersion = versionResponse.data[0];

    const championsResponse = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`
    );

    const championsData = championsResponse.data.data;

    // Extraer nombres e imágenes de los campeones
    const championsList = Object.keys(championsData).map((key) => ({
      name: championsData[key].name,
      image: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championsData[key].id}_0.jpg`,
    }));

    res.json(championsList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los campeones");
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
