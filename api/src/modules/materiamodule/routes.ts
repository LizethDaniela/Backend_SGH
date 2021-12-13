import { Express, Request, Response, NextFunction } from "express";
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
    this.materiasController = new MateriasController(mainApp);

    this.configureRoutes();
  }
  private configureRoutes() {
    
    this.app
      .route(`${this.rootPath}/materia`).post(
        (request: Request, response: Response, next: NextFunction) => {
          this.mainApp.getJsonWebToken().verifyToken(request, response, next);
        },
        (request: Request, response: Response) => {
        this.materiasController.create(request, response);
      });
    this.app
      .route(`${this.rootPath}/materia/:id`).put(
        (request: Request, response: Response) => {
          this.materiasController.update(request, response);
        }
      );
    this.app
      .route(`${this.rootPath}/materia`).get(
        (request: Request, response: Response) => {
        this.materiasController.get(request, response);
      });
    this.app
      .route(`${this.rootPath}/materia/:id`).get(
        (request: Request, response: Response) => {
          this.materiasController.getId(request, response);
        }
      );
    this.app
      .route(`${this.rootPath}/materia/:id`)
      .delete((request: Request, response: Response) => {
        this.materiasController.delete(request, response);
      });
    this.app
      .route(`${this.rootPath}/addmateria/:idTe/:idMat`)
      .post((request: Request, response: Response) => {
        this.materiasController.addTeacherMateria(request, response);
      });
  }
}
export default Routes;
