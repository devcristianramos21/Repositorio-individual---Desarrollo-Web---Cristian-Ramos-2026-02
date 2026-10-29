// Configuracion de express, app.use le de una orden para cada peticion

const express = require("express");
const tareasRoutes = require("./routes/tareas.routes");
const app = express();

app.use(express.json());

// 2. Routes

app.get("/api/tareas", (req, res) => {
    res.json({ estado: "ok", mensaje: "Bienvenido a la API de Cafe Andino" });
});


app.use("/api", tareasRoutes);

module.exports = app;

