import { Express, Request, Response, NextFunction } from "express";
import App from "../../App";
import AmbientevirtualController from "./controller/ambientevirtualController";

class Routes {
  private rootPath: string;
  private mainApp: App;
  private app: Express;
  private ambientevirtualController: AmbientevirtualController;

  constructor(rootPath: string, mainApp: App) {
    this.rootPath = rootPath;
    this.mainApp = mainApp;
    this.app = this.mainApp.getApp();
    this.ambientevirtualController = new AmbientevirtualController(mainApp.getClientMongoose());

    this.configureRoutes();
  }
  private configureRoutes() {
    
    this.app
      .route(`${this.rootPath}/ambiente_virtual`).post(
        (request: Request, response: Response) => {
        this.ambientevirtualController.create(request, response);
      });
    this.app
      .route(`${this.rootPath}/ambiente_virtual`)
      .get((request: Request, response: Response) => {
        this.ambientevirtualController.get(request, response);
      });
    this.app.route(`${this.rootPath}/ambiente_virtual/:id`).get(
        (request: Request, response: Response) => {
          this.ambientevirtualController.getId(request, response);
        }
      );
    this.app.route(`${this.rootPath}/ambiente_virtual/:id`).put(
        (request: Request, response: Response) => {
          this.ambientevirtualController.update(request, response);
        }
      );
    this.app
      .route(`${this.rootPath}/ambiente_virtual/:id`)
      .delete((request: Request, response: Response) => {
        this.ambientevirtualController.delete(request, response);
      });
  }
}
export default Routes;
