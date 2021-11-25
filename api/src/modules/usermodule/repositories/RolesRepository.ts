import { Model } from "mongoose";
import { IRoles, Roles } from "../model/RolesModel";
import { IUser, User } from "../model/UserModel";
import { BaseRepository } from "./base/BaseRepository";

class RolesRepository<T> extends BaseRepository<IRoles> {
  private userModel: Model<IUser>;
  constructor(rolesModel: Model<IRoles>, userModel: Model<IUser>) {
    super(rolesModel);
    this.userModel = userModel;
  }
  public async addRolUser(idUs: string, idRol: string) {
    console.log(idUs);
    console.log(idRol);
    const user: any = await this.userModel.findOne({ _id: idUs });
    const rol: any = await this.findOne(idRol);
    if (user != null && rol != null) {
      const modelUser: User = user;
      const modelRol: Roles = rol;
      modelUser.roles?.push(modelRol.id);
      return await modelUser.save();
    }
    return null;
  }
}
export default RolesRepository;
