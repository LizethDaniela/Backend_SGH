import { Mongoose, Schema, Document } from "mongoose";

export interface IAmbientevirtual {
    semestre?: string;
    materia?: string;
    sigla?: string;
    enlace?: string;
}

export interface Ambientevirtual extends Document, IAmbientevirtual {
    createAt: string;
    updateAt: string;
}

const AmbientevirtualSchema = new Schema ({
    semestre: { type: String, required: true },
    materia: { type: String, required: true },
    sigla: { type: String, required: true },
    enlace: { type: String, required: true },
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date },
});
export const createModel = (mongoose: Mongoose) => {
    return mongoose.model<Ambientevirtual>("ambiente_virtual", AmbientevirtualSchema);
};