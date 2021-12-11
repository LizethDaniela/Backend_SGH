import App from "../../App";
import { Express, NextFunction, Request, Response } from "express";
import UserController from "./controller/userController";
import RolesController from "./controller/rolesController";


class Routes {
  private rootPath: string;
  private mainApp: App;
  private app: Express;
  private userController: UserController;
  private rolesController: RolesController;
  private users: string;
  private roles: string;
  constructor(rootPath: string, services: Array<string>, mainApp: App) {
    //user
    //fix refactor del codigo
    this.users = services[0];
    this.roles = services[1];
    // refactor
    this.rootPath = rootPath;
    this.mainApp = mainApp;
    this.app = this.mainApp.getApp();
    this.userController = new UserController(mainApp);
    this.rolesController = new RolesController(mainApp);
    this.configureRoutes();
  }
  private configureRoutes() {
    this.app.route(`${this.rootPath}/${this.users}`).post(
      /* (request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      }, */
      (request: Request, response: Response) => {
        this.userController.create(request, response);
      }
    );
    this.app.route(`${this.rootPath}/${this.users}`).get(
      /* ( request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      }, */
      (request: Request, response: Response) => {
        this.userController.get(request, response);
      }
    );
    this.app.route(`${this.rootPath}/${this.users}/:id`).get(
      (request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      },
      (request: Request, response: Response) => {
        this.userController.getId(request, response);
      }
    );
    this.app.route(`${this.rootPath}/${this.users}/:id`).put(
      /* (request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      }, */
      (request: Request, response: Response) => {
        this.userController.update(request, response);
      }
    );
    this.app.route(`${this.rootPath}/${this.users}/:id`).delete(
      /* (request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      }, */
      (request: Request, response: Response) => {
        this.userController.delete(request, response);
      }
    );

    this.app.route(`${this.rootPath}/${this.users}/upload/:id`).put(
      (request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      },
      (request: Request, response: Response) => {
        this.userController.upload(request, response);
      }
    );

    this.app.route(`${this.rootPath}/${this.users}/avatar/:id`).get(
      (request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      },
      (request: Request, response: Response) => {
        this.userController.showavatar(request, response);
      }
    );

    this.app
      .route(`${this.rootPath}/${this.users}/singin`)
      .post((request: Request, response: Response) => {
        this.userController.login(request, response);
      });

    this.app.route(`${this.rootPath}/roles`).post(
      /* (request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      }, */
      (request: Request, response: Response) => {
        this.rolesController.create(request, response);
      }
    );

    this.app.route(`${this.rootPath}/roles/:id`).get(
      /* (request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      }, */
      (request: Request, response: Response) => {
        this.rolesController.getId(request, response);
      }
    );

    this.app.route(`${this.rootPath}/roles`).get(
      /* (request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      }, */
      (request: Request, response: Response) => {
        this.rolesController.get(request, response);
        //response.status(200).json({ ok: " ok!!" });
      }
    );

    this.app.route(`${this.rootPath}/roles/:id`).put(
      /* (request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      }, */
      (request: Request, response: Response) => {
        this.rolesController.update(request, response);
      }
    );

    this.app.route(`${this.rootPath}/roles/:id`).delete(
      /* (request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      }, */
      (request: Request, response: Response) => {
        this.rolesController.delete(request, response);
      }
    );
    //Asing roles
    this.app.route(`${this.rootPath}/addrol/:idUs/:idRol`).post(
      /* (request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      }, */
      (request: Request, response: Response) => {
        this.rolesController.addUserRol(request, response);
      }
    );

    this.app.route(`${this.rootPath}/getall`).get(
      /* (request: Request, response: Response, next: NextFunction) => {
        this.mainApp.getJsonWebToken().verifyToken(request, response, next);
      }, */
      (request: Request, response: Response) => {
        this.userController.getUserRoles(request, response);
      }
    );
  }
}
export default Routes;
