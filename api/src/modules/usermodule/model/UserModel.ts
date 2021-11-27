import { Mongoose, Schema, Document } from "mongoose";
import { IRoles } from "./RolesModel";

export interface IAvatar {
  url: string;
  path: string;
}

export interface IUser {
  nombre?: string;
  ap_paterno?: string;
  ap_materno?: string;
  ci?: string;
  cargo?: string;
  email?: string;
  username?: string;
  password?: string;
  telefono?: string;
  avatar?: Array<IAvatar>;
  roles?: Array<IRoles>;
}

export interface User extends Document, IUser {
  createAt: Date;
  updateAt: Date;
}

const userSchema = new Schema({
  nombre: { type: String, required: true },
  ap_paterno: { type: String, required: true },
  ap_materno: { type: String, required: true },
  ci: { type: String, required: true, unique: true },
  cargo: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => {
        return /^[\w\.]+@\w+[.][\w]{2,3}$/.test(v);
      },
      message: (props: any) => `${props.value} no es un corre valido`,
    },
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  telefono: { type:  String, required: true},
  roles: [{ type: Schema.Types.ObjectId, ref: "roles" }],
  avatar: { type: Array, required: false },
  createAt: { type: Date, default: Date.now() },
  updateAt: { type: Date },
});
export const createModel = (mongoose: Mongoose) => {
  return mongoose.model<User>("user", userSchema);
};
