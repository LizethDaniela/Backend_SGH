import { Mongoose, Schema, Document } from "mongoose";
import { ISemestre } from "../../semestremodule/model/SemestreModel";

export interface ISubjects {
    subject?: string;
    sigla?: string;
    semestre?: string;
    horas_semana?: string;
    grupos?: Array<ISemestre>;
}

export interface Subjects extends Document, ISubjects {
    createAt: string;
    updateAt: string;
}

const MateriasSchema = new Schema ({
    subject: { type: String, required: true },
    sigla: { type: String, required: true, unique: true },
    semestre: { type: String, required: true },
    horas_semana: { type: String, required: true },
    grupos: [{ type: Schema.Types.ObjectId, ref: "semestre" }],
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date },
});
export const createModel = (mongoose: Mongoose) => {
    return mongoose.model<Subjects>("materias", MateriasSchema);
};