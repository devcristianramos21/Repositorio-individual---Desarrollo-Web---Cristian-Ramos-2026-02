const { isValidObjectId } = require("mongoose");
const HttpError = require("../utils/HttpError");

function validarId(req, res, next) {
    if(!isValidObjectId(req.params.id)) {
        throw next(new HttpError(404, `No existe la tarea con el id ${req.params.id}`));
    }
    next();
}

module.exports = validarId;