// Capa de modelos: el esquema describe la forma de cada documento de la colección "tareas"

const { Schema, model } = require("mongoose");

const tareaSchema = new Schema(
    {
        titulo: {
            type: String,
            required: [true, "El título es obligatorio"],
            trim: true,
            minlength: [3, "El título debe tener al menos 3 caracteres"],
        },
        completada: { type: Boolean, default: false },
    },
    {
        timestamps: true, // agrega createdAt y updatedAt automáticamente
        versionKey: false, // quita el campo interno __v
        toJSON: {
            // Al responder en JSON: expone "id" (texto) en lugar de "_id" (ObjectId)
            transform(_doc, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                return ret;
            },
        },
    }
);

// model("Tarea") -> Mongoose usa la colección "tareas" (plural, en minúscula)
module.exports = model("Tarea", tareaSchema);
