import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import { createModel as createAmbientevirtualModel, IAmbientevirtual } from "../model/AmbientevirtualModule"
import AmbientevirtualRepository from "../repositories/AmbientevirtualRepository";

class AmbientevirtualController {
    private ambientevirtualRepository: AmbientevirtualRepository;
    constructor(mongoose: Mongoose) {
      this.ambientevirtualRepository = new AmbientevirtualRepository(createAmbientevirtualModel(mongoose));
    }
  //method POST
  public async create(request: Request, response: Response) {
    //body
    let { semestre, materia, sigla, enlace } = request.body;
    const resultambientevirtual = await this.ambientevirtualRepository.create({ semestre, materia, sigla, enlace });
    response.status(201).json({ ambientevirtualResponse: resultambientevirtual });
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { semestre, materia, sigla, enlace }: IAmbientevirtual = request.body;
    const resultambientevirtual = await this.ambientevirtualRepository.update(id, { semestre, materia, sigla, enlace });
    response.status(201).json({ ambientevirtualResponse: resultambientevirtual });
  }

  public async getId(request: Request, response: Response) {
    const { id } = request.params;
    const resultambientevirtual = await this.ambientevirtualRepository.findOne(id);
    response.status(201).json({ ambientevirtualResponse: resultambientevirtual });
  }

  public async get(request: Request, response: Response) {
    const resultambientevirtual = await this.ambientevirtualRepository.find({});
    response.status(201).json({ ambientevirtualResponse: resultambientevirtual });
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const resultambientevirtual = await this.ambientevirtualRepository.delete(id);
    response.status(200).json({ ambientevirtualResponse: resultambientevirtual });
  }
}
export default AmbientevirtualController;
