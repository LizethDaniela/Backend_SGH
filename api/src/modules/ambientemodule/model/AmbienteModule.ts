import { Mongoose, Schema, Document } from "mongoose";

export interface IAmbiente {
    ambiente?: string;
    piso?: string;
    capacidad?: number;
    modalidad?: string;
    link_clase?: string;
    disponibilidad_tiempo?: string[];
    disponibilidad_ocupada?: string[];
}

export interface Ambiente extends Document, IAmbiente {
    createAt: string;
    updateAt: string;
}

const AmbienteSchema = new Schema ({
    ambiente: { type: String, required: true, unique: true },
    piso: { type: String, required: true },
    capacidad: { type: Number, required: true },
    modalidad: { type: String, required: true },
    link_clase: { type: String, required: false },
    disponibilidad_tiempo: { type: Array, required: false },
    disponibilidad_ocupada: { type: Array, required: false },
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date },
});
export const createModel = (mongoose: Mongoose) => {
    return mongoose.model<Ambiente>("ambiente", AmbienteSchema);
};