import { Express, Request, Response, NextFunction } from "express";
import App from "../../App";
import SemestreController from "./controller/semestreController";

class Routes {
  private rootPath: string;
  private mainApp: App;
  private app: Express;
  private semestreController: SemestreController;

  constructor(rootPath: string, mainApp: App) {
    this.rootPath = rootPath;
    this.mainApp = mainApp;
    this.app = this.mainApp.getApp();
    this.semestreController = new SemestreController(mainApp);

    this.configureRoutes();
  }
  private configureRoutes() {
    
    this.app
      .route(`${this.rootPath}/semestre`).post(
        (request: Request, response: Response) => {
        this.semestreController.create(request, response);
      });
    this.app
      .route(`${this.rootPath}/semestre`)
      .get((request: Request, response: Response) => {
        this.semestreController.get(request, response);
      });
    this.app.route(`${this.rootPath}/semestre/:id`).get(
        (request: Request, response: Response) => {
          this.semestreController.getId(request, response);
        }
      );
    this.app.route(`${this.rootPath}/semestre/:id`).put(
        (request: Request, response: Response) => {
          this.semestreController.update(request, response);
        }
      );
    this.app
      .route(`${this.rootPath}/semestre/:id`)
      .delete((request: Request, response: Response) => {
        this.semestreController.delete(request, response);
      });
    this.app
      .route(`${this.rootPath}/addgrupo/:idMateria/:idGrupo`)
      .post((request: Request, response: Response) => {
        this.semestreController.addMateriaGrupo(request, response);
      });
  }
}
export default Routes;
