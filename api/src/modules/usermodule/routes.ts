import App from "../../App";
import { Express, Request, Response } from "express";
import UserController from "./controller/userController";

class Routes {
  private rootPath: string;
  private mainApp: App;
  private app: Express;
  private users: string;
  private userController: UserController;

  constructor(rootPath: string, services: Array<string>, mainApp: App) {
    this.rootPath = rootPath;
    this.mainApp = mainApp;
    this.users = services[0];
    this.app = this.mainApp.getApp();

    this.userController = new UserController(mainApp.getClientMongoose());

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
  }
}
export default Routes;
