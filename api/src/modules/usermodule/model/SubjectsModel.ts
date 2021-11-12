import { Mongoose, Schema } from "mongoose";

export interface ISubjects {
    semestre?: string;
    subject?: string;
    sigla?: string;
}

export interface Subjects extends Document, ISubjects {
    created: string;
}

const MateriasSchema = new Schema ({
    semestre: { type: String, required: true },
    subject: { type: String, required: true },
    sigla: { type: String, required: true },
    created: { type: Date, default: Date.now() }
});
export const createModel = (mongoose: Mongoose) => {
    return mongoose.model<Subjects>("materias", MateriasSchema);
};