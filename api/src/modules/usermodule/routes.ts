import App from "../../App";
import { Express, Request, Response } from "express";
import UserController from "./controller/userController";
import MateriasController from "./controller/materiasController";
class Routes {
  private rootPath: string;
  private mainApp: App;
  private app: Express;
  private users: string;
  private materias: string;
  private userController: UserController;
  private materiasController: MateriasController;

  constructor(rootPath: string, services: Array<string>, mainApp: App) {
    this.rootPath = rootPath;
    this.mainApp = mainApp;
    this.users = services[0];
    this.materias = services[1];
    this.app = this.mainApp.getApp();

    this.userController = new UserController(mainApp.getClientMongoose());
    this.materiasController = new MateriasController(mainApp.getClientMongoose());

    this.configureRoutes();
  }
  private configureRoutes() {
    this.app
      .route(`${this.rootPath}/${this.users}`)
      .post((request: Request, response: Response) => {
        this.userController.create(request, response);
      });
    this.app
      .route(`${this.rootPath}/${this.users}`)
      .get((request: Request, response: Response) => {
        this.userController.get(request, response);
      });
      this.app
      .route(`${this.rootPath}/${this.materias}`)
      .post((request: Request, response: Response) => {
        this.materiasController.create(request, response);
      });
    this.app
      .route(`${this.rootPath}/${this.materias}`)
      .get((request: Request, response: Response) => {
        this.materiasController.get(request, response);
      });
  }
}
export default Routes;
