// Error con código HTTP: los servicios lo lanzan y el middleware de errores (app.js) lo convierte en respuesta
class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = HttpError;
