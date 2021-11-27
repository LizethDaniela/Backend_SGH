import { Express, Request, Response } from "express";
import App from "../../App";
import TeacherController from "./controller/teacherController";

class Routes {
  private rootPath: string;
  private mainApp: App;
  private app: Express;
  private teacherController: TeacherController;

  constructor(rootPath: string, mainApp: App) {
    this.rootPath = rootPath;
    this.mainApp = mainApp;
    this.app = this.mainApp.getApp();
    this.teacherController = new TeacherController(mainApp.getClientMongoose());

    this.configureRoutes();
  }
  private configureRoutes() {
    
    this.app
      .route(`${this.rootPath}/teacher`)
      .post((request: Request, response: Response) => {
      this.teacherController.create(request, response);
      });
    this.app
      .route(`${this.rootPath}/teacher`)
      .get((request: Request, response: Response) => {
      this.teacherController.get(request, response);
      });
    this.app
      .route(`${this.rootPath}/teacher/:id`)
      .delete((request: Request, response: Response) => {
      this.teacherController.delete(request, response);
      });
  }
}
export default Routes;
