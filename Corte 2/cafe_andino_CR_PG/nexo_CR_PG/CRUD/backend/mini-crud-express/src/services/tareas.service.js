// Capa de servicios para manejar la logica de negocio de las tareas (ahora guardadas en MongoDB)

const { isValidObjectId } = require("mongoose");
const Tarea = require("../models/tarea.model");
const HttpError = require("../utils/HttpError");

// Todas las funciones son async: hablar con la base de datos toma tiempo y devuelve promesas

async function listarTareas() {
    return Tarea.find().sort({ createdAt: 1 });
}

async function obtenerTarea(id) {
    // Un id con formato inválido (ej. "abc") no puede existir: lo tratamos como "no encontrada"
    if (!isValidObjectId(id)) {
        throw new HttpError(404, `No existe la tarea con el id ${id}`);
    }
    const tarea = await Tarea.findById(id);
    if (!tarea) {
        throw new HttpError(404, `No existe la tarea con el id ${id}`);
    }
    return tarea;
}

async function crearTarea(titulo) {
    return Tarea.create({ titulo }); // si el título no cumple el esquema, Mongoose lanza ValidationError
}

async function actualizarTarea(id, cambios = {}) {
    await obtenerTarea(id); // lanza 404 si no existe

    // Solo se permiten estos campos (evita que el cliente cambie _id, createdAt, etc.)
    const permitidos = {};
    if (cambios.titulo !== undefined) permitidos.titulo = cambios.titulo;
    if (cambios.completada !== undefined) permitidos.completada = cambios.completada;

    return Tarea.findByIdAndUpdate(id, permitidos, {
        returnDocument: "after", // devuelve la tarea ya modificada
        runValidators: true, // aplica las reglas del esquema también al actualizar
    });
}

async function eliminarTarea(id) {
    await obtenerTarea(id); // lanza 404 si no existe
    await Tarea.findByIdAndDelete(id);
}

module.exports = {
    listarTareas,
    obtenerTarea,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
};
