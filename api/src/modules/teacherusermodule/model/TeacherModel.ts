import { Mongoose, Schema, Document } from "mongoose";

export interface ITeacher {
    nombre?: string;
    ap_paterno?: string;
    ap_materno?: string;
    ci?: string;
    ru?: string;
    cargo?: string;
    email?: string;
    username?: string;
    password?: string;
    fecha_nac?: string;
    telefono?: string;
    carga_horaria?: string;
    disponibilidad_tiempo?: string[];
}

export interface Teacher extends Document, ITeacher {
    createAt: string;
    updateAt: string;
}

const TeacherSchema = new Schema ({
    nombre: { type: String, required: true },
    ap_paterno: { type: String, required: true },
    ap_materno: { type: String, required: true },
    ci: { type: String, required: true, unique: true },
    ru: { type: String, required: true, unique: true },
    cargo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    fecha_nac: { type: String, required: true },
    telefono: { type:  String, required: true},
    carga_horaria: { type: String, required: true },
    disponibilidad_tiempo : { type: Array, required: false },
    createAt: {type: Date, default: Date.now()},
    updateAt: { type: Date },
});
export const createModel = (mongoose: Mongoose) => {
    return mongoose.model<Teacher>("teacher", TeacherSchema);
};