import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { Mongoose } from "mongoose";
import { IUser } from "../modules/usermodule/model/UserModel";
import { createModel } from "../modules/usermodule/model/UserModel";
import UserRepository from "../modules/usermodule/repositories/UserRepository";
export interface DataUserToken {
  id: string;
  email: string;
}
export interface IParams {
  method: string;
  url: string;
}
class JsonWebToken {
  secret: string;
  time: number;
  clientMongo: Mongoose;
  userRepository: UserRepository<IUser>;
  constructor(clientMongo: Mongoose) {
    this.clientMongo = clientMongo;
    this.secret = process.env.TOKENPASSWORD || "secret";
    this.time = Number(process.env.TIME) || 60;
    this.userRepository = new UserRepository<IUser>(
      createModel(this.clientMongo)
    );
  }
  public generateToken(data: DataUserToken) {
    const token: string = JWT.sign(data, this.secret, {
      expiresIn: 60 * this.time,
    });
    return token;
  }
  public async verifyToken(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const token: string | undefined = request.headers["authorization"];
    console.log(token);
    if (!token) {
      console.log("TOKEN NO EXISTE");
      response.status(300).json({
        serverResponse:
          " You don't have access to this endpoint you need a token man",
      });
      return;
    }
    try {
      const decode: any = JWT.verify(token, this.secret);
      if (decode) {
        const params: IParams = { method: request.method, url: request.url };
        console.log("params ", params);
        if (await this.verifyRoles(decode.id, params)) {
          next();
          return;
        }
        return response.status(200).json({
          serverResponse: "No tiene el permiso para usar este endpoint",
        });
      }
    } catch (error) {
      return response.status(200).json({ serverResponse: "Token invalido" });
    }
  }
  private async verifyRoles(id: string, params: IParams): Promise<Boolean> {
    //pedir datos a la base de datos
    const user: IUser | null = await this.userRepository.getUserCompleteData(
      id
    );
    console.log("User", user);
    if (user && user.roles) {
      for (let rol of user.roles) {
        if (rol.url) {
          let regularExpression = new RegExp(rol.url, "g");
          console.log(regularExpression);
          if (
            rol.method?.toUpperCase() === params.method.toUpperCase() &&
            params.url.match(regularExpression) !== null
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
export default JsonWebToken;
