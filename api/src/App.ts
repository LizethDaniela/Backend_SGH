import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { Mongoose } from "mongoose";
import fileUpload from "express-fileupload";
import JsonWebToken from "./middleware/JsonWebToken";
import UserModule from "./modules/usermodule/init";
import SubjectModule from "./modules/materiamodule/init";
import StudentModule from "./modules/studentusermodule/init";
import TeacherModule from "./modules/teacherusermodule/init";
import SemestreModule from "./modules/semestremodule/init";
import AmbienteModule from "./modules/ambientemodule/init";
import HorarioModule from "./modules/horariomodule/init";
import AmbientevirtualModule from "./modules/ambientevirtualmodule/init";
//import { textChangeRangeIsUnchanged } from "typescript";

if (process.env.NODE_ENV == "development") {
  dotenv.config();
}

class App {
  private app: Express;
  private port: number;
  private clientMongo: Mongoose;
  private apiversion: string;
  private uploadpath: string;
  private jsonwebtoken: JsonWebToken;
  constructor() {
    this.app = express();
    this.uploadpath = process.env.UPLOADPATH || "/";
    this.apiversion = process.env.API_VERSION || "api";
    this.port = Number(process.env.PORT) || 8000;

    this.clientMongo = mongoose;
    this.configure();
    this.configureDatabase();
    this.startModules();
    this.jsonwebtoken = new JsonWebToken(this.clientMongo);
  }
  private configure() {
    this.app.use(cors({ origin: "http://localhost:3000" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(fileUpload({ limits: { fileSize: 20 * 1024 * 1024 } }));
  }
  private configureDatabase() {
    const dataBaseName = process.env.DB_NAME;
    const dataBaseHost = process.env.DB_HOST;
    const dataBasePort = process.env.DB_PORT;
    const dataBaseUser = process.env.DB_USER;
    const dataBasePassword = process.env.DB_PASSWORD;
    const connectionString = `mongodb://${dataBaseUser}:${dataBasePassword}@${dataBaseHost}:${dataBasePort}/${dataBaseName}`;
    console.log(connectionString);
    this.clientMongo.connect(connectionString);
    this.clientMongo.connection.on("open", () => {
      console.log("sucess  connect to database ");
    });
    this.clientMongo.connection.on("error", (err) => {
      console.error("can not connecto to the database");
      console.error(err);
    });
  }
  private startModules() {
    console.log("Load Modules!");
    new UserModule(`/${this.apiversion}`, ["user", "roles"], this);
    new SubjectModule(`/${this.apiversion}`, this);
    new StudentModule(`/${this.apiversion}`, this);
    new TeacherModule(`/${this.apiversion}`, this);
    new SemestreModule(`/${this.apiversion}`, this);
    new AmbienteModule(`/${this.apiversion}`, this);
    new HorarioModule(`/${this.apiversion}`, this);
    new AmbientevirtualModule(`/${this.apiversion}`, this);
  }
  public getApp(): Express {
    return this.app;
  }
  public getClientMongoose(): Mongoose {
    return this.clientMongo;
  }
  public getPort(): number {
    return this.port;
  }
  public getUploadPath(): string {
    return this.uploadpath;
  }
  public getJsonWebToken(): JsonWebToken {
    return this.jsonwebtoken;
  }
}
export default App;
