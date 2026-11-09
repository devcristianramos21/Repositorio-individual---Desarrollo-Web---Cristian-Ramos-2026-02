// Configuracion de express, app.use le de una orden para cada peticion

const express = require("express");
const tareasRoutes = require("./routes/tareas.routes");
const HttpError = require("./utils/HttpError");
const app = express();

// 1. Middlewares
app.use(express.json());

// 2. Rutas
// Bienvenida en /api (antes estaba en /api/tareas y tapaba la ruta que lista las tareas)
app.get("/api", (req, res) => {
    res.json({ estado: "ok", mensaje: "Bienvenido a la API de Cafe Andino" });
});

app.use("/api", tareasRoutes);

// 3. Ruta no encontrada: ninguna ruta anterior respondió
app.use((req, res) => {
    res.status(404).json({ error: `No existe la ruta ${req.method} ${req.originalUrl}` });
});

// 4. Middleware de errores (4 parámetros): recibe todo lo que se lance en controladores y servicios
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    // Reglas del esquema de Mongoose que no se cumplieron (ej. título muy corto)
    if (err.name === "ValidationError") {
        const mensajes = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ error: mensajes.join(", ") });
    }
    // Tipo de dato incorrecto (ej. completada: "hola")
    if (err.name === "CastError") {
        return res.status(400).json({ error: `Valor inválido para "${err.path}"` });
    }
    // JSON mal formado en el body (lo genera express.json())
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ error: "El cuerpo de la petición no es un JSON válido" });
    }
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
});

module.exports = app;
