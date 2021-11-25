import { Model } from "mongoose";
import { IAvatar, IUser, User } from "../model/UserModel";
import { BaseRepository } from "./base/BaseRepository";

class UserRepository<T> extends BaseRepository<IUser> {
  private userModel: Model<IUser>;
  constructor(model: Model<IUser>) {
    super(model);
    this.userModel = model;
  }
  public async addAvatar(id: string, avatar: IAvatar) {
    const user = await this.userModel.findOne({ _id: id });
    if (user) {
      user.avatar?.push(avatar);
      return user.save();
    }
    return false;
  }
  public async getUserRoles() {
    const data = await this.userModel.find({}).populate("roles");
    return data;
  }
  public async getUserCompleteData(id: string) {
    return await this.userModel.findById({ _id: id }).populate("roles");
  }
  public async login(email: string, password: string): Promise<Boolean> {
    const user = await this.userModel.findOne({ email, password });
    return user == null ? false : true;
  }

  public singOut() {}
}
export default UserRepository;
