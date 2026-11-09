// Configuración de la base de datos: abre UNA conexión a MongoDB que Mongoose reutiliza en toda la app

const mongoose = require("mongoose");

async function conectarDB(uri) {
    if (!uri) {
        throw new Error("Falta la variable MONGODB_URI en el archivo .env");
    }
    // Si en 5 s no encuentra el servidor, falla (por defecto esperaría 30 s)
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB conectado a la base "${mongoose.connection.name}"`);
}

module.exports = { conectarDB };
