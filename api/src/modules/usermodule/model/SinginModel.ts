import { Mongoose, Schema, Document } from "mongoose";

export interface ISingin {
    username?: string;
}

export interface Singin extends Document, ISingin {
    createAt: Date;
    updateAt: Date;
}

const singinSchema = new Schema ({
    username: { type: String, required: true},
    createAt: { type: Date, default: Date.now()},
    updateAt: { type: Date}
});
export const createModel = (mongoose: Mongoose) => {
    return mongoose.model<Singin>("singin", singinSchema);
};