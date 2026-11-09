const app = require("./app");
const { conectarDB } = require("./config/db");

const PORT = process.env.PORT || 3000;

// Primero se conecta a MongoDB y SOLO después se abre el servidor
async function iniciar() {
    try {
        await conectarDB(process.env.MONGODB_URI);
        app.listen(PORT, () => {
            console.log(`API tareas en http://localhost:${PORT}/api/tareas`);
        });
    } catch (error) {
        console.error("No se pudo conectar a MongoDB:", error.message);
        process.exit(1);
    }
}

iniciar();
