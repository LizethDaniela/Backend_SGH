import { Request, Response } from "express";
import App from "../../../App";
import { createModel as createRolModel, IRoles } from "../model/RolesModel";
import { createModel as createUserModel } from "../model/UserModel";
import RolesRepository from "../repositories/RolesRepository";

class RolesController {
  private app: App;
  private rolesRepository: RolesRepository<IRoles>;
  constructor(app: App) {
    this.app = app;
    this.rolesRepository = new RolesRepository(
      createRolModel(app.getClientMongoose()),
      createUserModel(app.getClientMongoose())
    );
  }
  //create
  public async create(request: Request, response: Response) {
    const { name, method, url } = request.body;
    const responseData = await this.rolesRepository.create({
      name,
      method,
      url,
    });
    response.status(201).json({ serverResponse: responseData });
  }
  public async get(request: Request, response: Response) {
    console.log("Enter to endpoint");
    const list: IRoles[] = await this.rolesRepository.find({});
    console.log("out", list);
    response.status(200).json({ serverResponse: list });
  }
  public async getId(request: Request, response: Response) {
    const { id } = request.params;
    const rol = await this.rolesRepository.findOne(id);
    response.status(200).json({ serverResponse: rol });
  }
  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, method, url } = request.body;
    const update = await this.rolesRepository.update(id, { name, method, url });
    response.status(200).json({ serverResponse: update });
  }
  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const deleteData = await this.rolesRepository.delete(id);
    response.status(200).json({ serverResponse: deleteData });
  }
  public async addUserRol(request: Request, response: Response) {
    const { idUs, idRol } = request.params;
    const result = await this.rolesRepository.addRolUser(idUs, idRol);
    response.status(201).json({ serverResponse: result });
  }
}
export default RolesController;
