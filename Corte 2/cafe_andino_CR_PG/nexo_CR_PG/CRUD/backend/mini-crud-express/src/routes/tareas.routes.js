// Capa de rutas: un metodo + la url -> controlador

const { Router } = require("express");

const controllerTareas = require("../controllers/tareas.controller");

const validarId = require("../middlewares/validarId");

const { validarTarea, validarCambioTarea } = require("../middlewares/validarTarea");


const router = Router();

router.get("/tareas", controllerTareas.listarTareas);
router.get("/tareas/:id", validarId, controllerTareas.obtenerTarea);
router.post("/tareas", controllerTareas.crearTarea);
router.patch("/tareas/:id", controllerTareas.actualizarTarea);
router.delete("/tareas/:id", controllerTareas.eliminarTarea);

module.exports = router;

