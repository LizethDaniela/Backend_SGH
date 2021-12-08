import { Mongoose, Schema, Document } from "mongoose";

export interface ISemestre {
    semestre?: string;
    grupo?: string;
    gestion?: string;
    nivel_academico?: number;
    disponibilidad_tiempo?: string[];
    disponibilidad_ocupada?: string[];
}

export interface Semestre extends Document, ISemestre {
    createAt: string;
    updateAt: string;
}

const SemestreSchema = new Schema ({
    semestre: { type: String, required: true },
    grupo: { type: String, required: true },
    gestion: { type: String, required: true },
    nivel_academico: { type: Number, required: true },
    disponibilidad_tiempo: { type: Array, required: false },
    disponibilidad_ocupada: { type: Array, required: false },
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date },
});
export const createModel = (mongoose: Mongoose) => {
    return mongoose.model<Semestre>("semestre", SemestreSchema);
};