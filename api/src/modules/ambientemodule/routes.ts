import { Express, Request, Response, NextFunction } from "express";
import App from "../../App";
import AmbienteController from "./controller/ambienteController";

class Routes {
  private rootPath: string;
  private mainApp: App;
  private app: Express;
  private ambienteController: AmbienteController;

  constructor(rootPath: string, mainApp: App) {
    this.rootPath = rootPath;
    this.mainApp = mainApp;
    this.app = this.mainApp.getApp();
    this.ambienteController = new AmbienteController(mainApp.getClientMongoose());

    this.configureRoutes();
  }
  private configureRoutes() {
    
    this.app
      .route(`${this.rootPath}/ambiente`).post(
        (request: Request, response: Response) => {
        this.ambienteController.create(request, response);
      });
    this.app
      .route(`${this.rootPath}/ambiente`)
      .get((request: Request, response: Response) => {
        this.ambienteController.get(request, response);
      });
    this.app.route(`${this.rootPath}/ambiente/:id`).get(
        (request: Request, response: Response) => {
          this.ambienteController.getId(request, response);
        }
      );
    this.app.route(`${this.rootPath}/ambiente/:id`).put(
        (request: Request, response: Response) => {
          this.ambienteController.update(request, response);
        }
      );
    this.app
      .route(`${this.rootPath}/ambiente/:id`)
      .delete((request: Request, response: Response) => {
        this.ambienteController.delete(request, response);
      });
  }
}
export default Routes;
