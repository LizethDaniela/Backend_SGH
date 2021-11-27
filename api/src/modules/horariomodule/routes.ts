import { Express, Request, Response, NextFunction } from "express";
import App from "../../App";
import HorarioController from "./controller/horarioController";

class Routes {
  private rootPath: string;
  private mainApp: App;
  private app: Express;
  private horarioController: HorarioController;

  constructor(rootPath: string, mainApp: App) {
    this.rootPath = rootPath;
    this.mainApp = mainApp;
    this.app = this.mainApp.getApp();
    this.horarioController = new HorarioController(mainApp.getClientMongoose());

    this.configureRoutes();
  }
  private configureRoutes() {
    
    this.app
      .route(`${this.rootPath}/horario`).post(
        (request: Request, response: Response) => {
        this.horarioController.create(request, response);
      });
    this.app
      .route(`${this.rootPath}/horario`)
      .get((request: Request, response: Response) => {
        this.horarioController.get(request, response);
      });
    this.app.route(`${this.rootPath}/horario/:id`).get(
        (request: Request, response: Response) => {
          this.horarioController.getId(request, response);
        }
      );
    this.app.route(`${this.rootPath}/horario/:id`).put(
        (request: Request, response: Response) => {
          this.horarioController.update(request, response);
        }
      );
    this.app
      .route(`${this.rootPath}/horario/:id`)
      .delete((request: Request, response: Response) => {
        this.horarioController.delete(request, response);
      });
  }
}
export default Routes;
