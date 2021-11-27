import { Mongoose, Schema, Document } from "mongoose";

export interface ISemestre {
    semestre?: string;
    grupo?: string;
    gestion?: string;
    nivel_academico?: number;
    carga_horaria_semana?: string;
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
    carga_horaria_semana: { type: String, required: true },
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date },
});
export const createModel = (mongoose: Mongoose) => {
    return mongoose.model<Semestre>("semestre", SemestreSchema);
};