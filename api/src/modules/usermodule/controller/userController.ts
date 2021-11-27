import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import App from "../../../App";
import { createModel, IAvatar, IUser, User } from "../model/UserModel";
import UserRepository from "../repositories/UserRepository";
import sha1 from "sha1";
import { UploadedFile } from "express-fileupload";
class UserController {
  private userRepository: UserRepository<IUser>;
  private path: string;
  private app: App;
  constructor(app: App) {
    this.app = app;
    this.userRepository = new UserRepository(
      createModel(app.getClientMongoose())
    );
    this.path = app.getUploadPath();
  }
  //method POST
  public async create(request: Request, response: Response) {
    //body
    let { nombre, ap_paterno, ap_materno, ci, cargo, email, username, password, telefono } = request.body;
    //cifrar el password Importante
    password = sha1(password);
    const result = await this.userRepository.create({ nombre, ap_paterno, ap_materno, ci, cargo, email, username, password, telefono });
    response.status(201).json({ serverResponse: result });
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nombre, ap_paterno, ap_materno, ci, cargo, email, username, telefono }: IUser = request.body;
    const result = await this.userRepository.update(id, { nombre, ap_paterno, ap_materno, ci, cargo, email, username, telefono });
    response.status(201).json({ serverResponse: result });
  }

  public async getId(request: Request, response: Response) {
    const { id } = request.params;
    const result = await this.userRepository.findOne(id);
    response.status(201).json({ serverResponse: result });
  }

  public async get(request: Request, response: Response) {
    const result = await this.userRepository.find({});
    response.status(201).json({ serverResponse: result });
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const result = await this.userRepository.delete(id);
    response.status(200).json({ serverResponse: result });
  }
  public async upload(request: Request, response: Response) {
    if (!request.files) {
      return response
        .status(300)
        .json({ serverResponse: "El archino no fue adjuntado" });
    }
    const { id } = request.params;
    const { avatar }: any = request.files;

    if (avatar == null) {
      return response.status(300).json({
        serverResponse: "El archivo de ser adjuntado con la etiqueta avatar",
      });
    }
    const img: UploadedFile = avatar;
    const regularexp = /[.](png|jpg|jpeg|gif)/g;
    const ext: Array<string> | null = img.name.match(regularexp);
    if (ext == null) {
      return response.status(300).json({
        serverResponse: "El archivo de ser jpg, png, gif",
      });
    }
    const newname = sha1(img.name || "" + Date.now().toString()) + ext[0];
    const path = this.path + newname;
    img.mv(path, async (err: any) => {
      if (err) {
        return response.status(300).json({
          serverResponse: err,
        });
      }
      const avatarData: IAvatar = {
        url: "/api/1.0/user/avatar/" + id,
        path: path,
      };
      const update = await this.userRepository.addAvatar(id, avatarData);
      response.status(200).json({ serverResponse: update });
    });
  }
  public async showavatar(request: Request, response: Response) {
    const { id } = request.params;
    const user: IUser = await this.userRepository.findOne(id);
    if (!user.avatar || user.avatar.length == 0) {
      return response.status(300).json({
        serverResponse: "no avatar",
      });
    }
    const [avatar] = user.avatar;
    response.sendFile(avatar.path);
  }
  public async login(request: Request, response: Response) {
    let { email, password } = request.body;
    password = sha1(password);
    const result: Boolean = await this.userRepository.login(email, password);
    if (result) {
      const users: any = await this.userRepository.find({ email });
      if (users.length === 1) {
        const user: User = users[0];
        const token: string = this.app
          .getJsonWebToken()
          .generateToken({ id: user.id, email });
        response.status(200).json({ serverResponse: token });
        return;
      }
    }
    response.status(300).json({ serverResponse: " Error in the credentials" });
  }
  public async getUserRoles(request: Request, response: Response) {
    const result = await this.userRepository.getUserRoles();
    response.status(200).json({ serverResponse: result });
  }
  public singOut(request: Request, response: Response) {}
}
export default UserController;
