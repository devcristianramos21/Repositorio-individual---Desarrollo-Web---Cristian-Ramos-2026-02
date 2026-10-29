// Capa de controladores, que se encarga de recibir las solicitudes HTTP y enviar las respuestas correspondientes

const servicioTareas = require("../services/tareas.service");

function listarTareas(req, res) {
    res.status(200).json(servicioTareas.listarTareas());
}
function obtenerTarea(req, res) {
    const id = Number(req.params.id);
    res.status(200).json(servicioTareas.obtenerTareas(id));
}

function crearTarea(req, res) {
    const nueva=servicioTareas.crearTarea(req.body.titulo);
    res.status(201).json(nueva);
}

function actualizarTarea(req, res) {
    const id = Number(req.params.id);
    res.status(200).json(servicioTareas.actualizarTarea(id, req.body));

}

function eliminarTarea(req, res) {
    servicioTareas.eliminarTarea(Number(req.params.id));
    res.status(204).send();
}

module.exports = {
    listarTareas,
    obtenerTarea,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
};
