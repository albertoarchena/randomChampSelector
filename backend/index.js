const express = require("express");
const app = express();
const port = 3030; // Cambia el puerto si es necesario

app.get("/", (req, res) => {
  res.send("Servidor de Express funcionando");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
