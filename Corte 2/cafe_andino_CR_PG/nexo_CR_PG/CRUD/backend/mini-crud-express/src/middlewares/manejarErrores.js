const mongose = require("mongoose");
const HttpError = require("../utils/HttpError");

function rutaNoEncontrada(req, res, next) {
    next(new HttpError(404, `No existe la ruta ${req.method} ${req.originalUrl}`));
}

function manejarErrores(err, req, res, next) {
    if(err instanceof HttpError) {
        res.status(err.status).json({ error: err.message });
    }
    if(error instanceof mongose.Error.ValidationError) {
        const errores = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ error: "Datos inválidos", detalles: errores });
    }
    if (error instanceof mongose.Error.CastError) {
        return res.status(400).json({ error: "Id inválido" });
    }
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });

}


module.exports = { rutaNoEncontrada, manejarErrores };