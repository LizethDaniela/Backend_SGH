import { Mongoose, Schema, Document } from "mongoose";

export interface IHorario {
    disponibilidad_tiempo?: string[];
    dia?: string;
    materia?: string;
    docente?: string;
    ambiente?: string;
    piso?: string;
    turno?: string;
    semestre?: string;
    grupo?: string;
}

export interface Horario extends Document, IHorario {
    createAt: string;
    updateAt: string;
}

const HorarioSchema = new Schema ({
    disponibilidad_tiempo: { type: Array, required: false },
    dia: { type: String, required: true },
    materia: { type: String, required: true },
    docente: { type: String, required: true },
    ambiente: { type: String, required: true },
    piso: { type: String, required: true },
    turno: { type: String, required: true },
    semestre: { type: String, required: true },
    grupo: { type: String, required: true },
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date },
});
export const createModel = (mongoose: Mongoose) => {
    return mongoose.model<Horario>("horario", HorarioSchema);
};