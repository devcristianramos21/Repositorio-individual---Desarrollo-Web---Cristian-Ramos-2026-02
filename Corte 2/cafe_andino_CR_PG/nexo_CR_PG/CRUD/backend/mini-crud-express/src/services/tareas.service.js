// Capa de servicios para manejar la logica de negocio de las tareas

const HttpError = require("../utils/HttpError");

// Simulando una base de datos en memoria
let tareas = [
    { id: 1, titulo: "Realizar avances del proyecto ", completada: false },
    { id: 2, titulo: "Hacer tareas de real", completada: true },
];



let siguienteId = 3;

function listarTareas() {
    return tareas;
}


function obtenerTareas(id) {
    const tarea = tareas.find((tarea) => tarea.id === id);
    if (!tarea) {
        throw new HttpError(404, "Tarea no encontrada");
    }
    return tarea;
}

function crearTarea(titulo) {
    const nuevaTarea = {
        id: siguienteId++,
        titulo,
        completada: false,
    };
    tareas.push(nuevaTarea);
    return nuevaTarea;
}

function actualizarTarea(id, cambios) {
    const tarea = obtenerTareas(id);
    Object.assign(tarea, cambios);
    return tarea;

}

function eliminarTarea(id) {
    obtenerTareas(id); // Verificar si la tarea existe
    tareas = tareas.filter((tarea) => tarea.id !== id);
}

module.exports = {
    listarTareas,
    obtenerTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
};


