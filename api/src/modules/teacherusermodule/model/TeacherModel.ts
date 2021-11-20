import { Mongoose, Schema, Document } from "mongoose";

export interface ITeacher {
    ci?: number;
    nombre?: string;
    apaterno?: string;
    amaterno?: string;
    fecha_nac?: string;
    telefono?: string;
}

export interface Teacher extends Document, ITeacher {
    createAt: string;
    updateAt: string;
}

const TeacherSchema = new Schema ({
    ci: { type: Number, required: true },
    nombre: { type: String, required: true },
    apaterno: { type: String, required: true },
    amaterno: { type: String, required: true },
    fecha_nac: { type: String, required: true },
    telefono: { type:  String, required: true},
    createAt: {type: Date, default: Date.now()},
    updateAt: { type: Date },
});
export const createModel = (mongoose: Mongoose) => {
    return mongoose.model<Teacher>("teacher", TeacherSchema);
};