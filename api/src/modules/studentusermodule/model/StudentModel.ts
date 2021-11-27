import { Mongoose, Schema, Document } from "mongoose";

export interface IStudent {
    nombre?: string;
    ap_paterno?: string;
    ap_materno?: string;
    ci?: string;
    ru?: string;
    cargo?: string;
    semestre?: string;
    email?: string;
    username?: string;
    password?: string;
    fecha_nac?: string;
    telefono?: string;
}

export interface Student extends Document, IStudent {
    createAt: string;
    updateAt: string;
}

const StudentSchema = new Schema ({
    nombre: { type: String, required: true },
    ap_paterno: { type: String, required: true },
    ap_materno: { type: String, required: true },
    ci: { type: String, required: true, unique: true },
    ru: { type: String, required: true, unique: true},
    cargo: { type: String, required: true},
    semestre: { type: String, required: true },
    email: { type: String,  required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    fecha_nac: { type: String, required: true },
    telefono: { type:  String, required: true},
    createAt: {type: Date, default: Date.now()},
    updateAt: { type: Date },
});
export const createModel = (mongoose: Mongoose) => {
    return mongoose.model<Student>("student", StudentSchema);
};