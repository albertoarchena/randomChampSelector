require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Servidor de Express funcionando");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
