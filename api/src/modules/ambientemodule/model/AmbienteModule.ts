import { Mongoose, Schema, Document } from "mongoose";

export interface IAmbiente {
    ambiente?: string;
    capacidad?: number;
    piso?: string;
    disponibilidad_tiempo?: string[];
}

export interface Ambiente extends Document, IAmbiente {
    createAt: string;
    updateAt: string;
}

const AmbienteSchema = new Schema ({
    ambiente: { type: String, required: true },
    capacidad: { type: Number, required: true },
    piso: { type: String, required: true },
    disponibilidad_tiempo: { type: Array, required: false },
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date },
});
export const createModel = (mongoose: Mongoose) => {
    return mongoose.model<Ambiente>("ambiente", AmbienteSchema);
};