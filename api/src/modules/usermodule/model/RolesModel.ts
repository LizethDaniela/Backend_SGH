import { Document, Mongoose, Schema } from "mongoose";

export interface IRoles {
  name?: string;
  method?: string;
  url?: string;
}

export interface Roles extends Document, IRoles {
  created: string;
}
const RolesSchema = new Schema({
  name: { type: String, required: true },
  method: {
    type: String,
    required: true,
    enum: ["post", "get", "put", "delete"],
  },
  url: {
    type: String,
    required: true,
  },
  created: { type: Date, default: Date.now() },
});
export const createModel = (mongoose: Mongoose) => {
  return mongoose.model<Roles>("roles", RolesSchema);
};
