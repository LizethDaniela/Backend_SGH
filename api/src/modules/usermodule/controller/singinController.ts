import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import { createModel } from "../model/SinginModel";
import SinginRepository from "../repositories/SinginRepository";

class SinginController {
  private singinRepository: SinginRepository;
  constructor(mongoose: Mongoose) {
    this.singinRepository = new SinginRepository(createModel(mongoose));
  }
  //method POST
  public async create(request: Request, response: Response) {
    //body
    let { username } = request.body;
    
    const result = await this.singinRepository.create({ username });
    response.status(201).json({ serverResponse: result });
  }
  //method UPDATE
  public update(request: Request, response: Response) {}
  //method GET
  public async get(request: Request, response: Response) {
    const result = await this.singinRepository.find({});
    response.status(201).json({ serverResponse: result });
  }
  //method DELETE
  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const result = await this.singinRepository.delete(id);
    response.status(200).json({ serverResponse: result });
  }
}
export default SinginController;