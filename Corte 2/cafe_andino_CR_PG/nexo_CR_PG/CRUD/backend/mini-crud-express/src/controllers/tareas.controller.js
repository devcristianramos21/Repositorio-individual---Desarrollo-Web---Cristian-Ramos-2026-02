// Capa de controladores, que se encarga de recibir las solicitudes HTTP y enviar las respuestas correspondientes
// Express 5: si una función async lanza un error, se envía solo al middleware de errores de app.js

const servicioTareas = require("../services/tareas.service");

async function listarTareas(req, res) {
    res.status(200).json(await servicioTareas.listarTareas());
}

async function obtenerTarea(req, res) {
    res.status(200).json(await servicioTareas.obtenerTarea(req.params.id));
}

async function crearTarea(req, res) {
    const nueva = await servicioTareas.crearTarea(req.body?.titulo);
    res.status(201).json(nueva);
}

async function actualizarTarea(req, res) {
    res.status(200).json(await servicioTareas.actualizarTarea(req.params.id, req.body));
}

async function eliminarTarea(req, res) {
    await servicioTareas.eliminarTarea(req.params.id);
    res.status(204).send();
}

module.exports = {
    listarTareas,
    obtenerTarea,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
};
