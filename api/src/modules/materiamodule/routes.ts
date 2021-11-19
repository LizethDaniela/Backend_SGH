import { Express, Request, Response } from "express";
import App from "../../App";
import MateriasController from "./controller/materiasController";

class Routes {
  private rootPath: string;
  private mainApp: App;
  private app: Express;
  private materiasController: MateriasController;

  constructor(rootPath: string, mainApp: App) {
    this.rootPath = rootPath;
    this.mainApp = mainApp;
    this.app = this.mainApp.getApp();
    this.materiasController = new MateriasController(mainApp.getClientMongoose());

    this.configureRoutes();
  }
  private configureRoutes() {
    
    this.app
      .route(`${this.rootPath}/materias`)
      .post((request: Request, response: Response) => {
        this.materiasController.create(request, response);
      });
    this.app
      .route(`${this.rootPath}/materias`)
      .get((request: Request, response: Response) => {
        this.materiasController.get(request, response);
      });
    this.app
      .route(`${this.rootPath}/materias/:id`)
      .delete((request: Request, response: Response) => {
        this.materiasController.delete(request, response);
      });
  }
}
export default Routes;
