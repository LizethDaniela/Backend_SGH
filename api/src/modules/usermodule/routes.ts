import App from "../../App";
import { Express, request, Request, Response } from "express";
import UserController from "./controller/userController";
import MateriasController from "./controller/materiasController";
import SinginController from "./controller/singinController";
import { Mongoose } from "mongoose";
class Routes {
  private rootPath: string;
  private mainApp: App;
  private app: Express;
  private users: string;
  private materias: string;
  private singin: string;
  private userController: UserController;
  private materiasController: MateriasController;
  private singinController: SinginController;

  constructor(rootPath: string, services: Array<string>, mainApp: App) {
    this.rootPath = rootPath;
    this.mainApp = mainApp;
    this.users = services[0];
    this.materias = services[1];
    this.singin = services[2];
    this.app = this.mainApp.getApp();

    this.userController = new UserController(mainApp.getClientMongoose());
    this.materiasController = new MateriasController(mainApp.getClientMongoose());
    this.singinController = new SinginController(mainApp.getClientMongoose());

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
      .route(`${this.rootPath}/${this.users}/:id`)
      .delete((request: Request, response: Response) => {
        this.userController.delete(request, response);
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
    //Singin
    this.app
      .route(`${this.rootPath}/${this.singin}`)
      .post((request: Request, response: Response) => {
        this.singinController.create(request, response);
      });

    this.app
      .route(`${this.rootPath}/${this.singin}`)
      .get((request: Request, response: Response) => {
        this.singinController.get(request, response);
      });
    
    this.app
      .route(`${this.rootPath}/${this.singin}/:id`)
      .delete((request: Request, response: Response) => {
        this.singinController.delete(request, response);
      });
  }
}
export default Routes;
