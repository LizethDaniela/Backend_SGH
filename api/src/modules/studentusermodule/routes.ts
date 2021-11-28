import { Express, Request, Response } from "express";
import App from "../../App";
import StudentController from "./controller/studentController";

class Routes {
  private rootPath: string;
  private mainApp: App;
  private app: Express;
  private studentController: StudentController;

  constructor(rootPath: string, mainApp: App) {
    this.rootPath = rootPath;
    this.mainApp = mainApp;
    this.app = this.mainApp.getApp();
    this.studentController = new StudentController(mainApp.getClientMongoose());

    this.configureRoutes();
  }
  private configureRoutes() {
    
    this.app
      .route(`${this.rootPath}/student`)
      .post((request: Request, response: Response) => {
      this.studentController.create(request, response);
      });
    this.app
      .route(`${this.rootPath}/student`)
      .get((request: Request, response: Response) => {
      this.studentController.get(request, response);
      });
    this.app
      .route(`${this.rootPath}/student/:id`)
      .get((request: Request, response: Response) => {
          this.studentController.getId(request, response);
        }
      );
    this.app
      .route(`${this.rootPath}/student/:id`)
      .put((request: Request, response: Response) => {
          this.studentController.update(request, response);
        }
      );
    this.app
      .route(`${this.rootPath}/student/:id`)
      .delete((request: Request, response: Response) => {
      this.studentController.delete(request, response);
      });
  }
}
export default Routes;
