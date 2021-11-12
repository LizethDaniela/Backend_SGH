import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import { createModel as createSubjectModel } from "../model/SubjectsModel";
import MateriasRepository from "../repositories/MateriasRepository";

class MateriasController {
  private materiasRepository: MateriasRepository;
  constructor(mongoose: Mongoose) {
    this.materiasRepository = new MateriasRepository(createSubjectModel(mongoose));
  }
  //method POST
  public async create(request: Request, response: Response) {
    //body
    let { semestre, subject, sigla } = request.body;
    
    const resultmat = await this.materiasRepository.create({ semestre, subject, sigla });
    response.status(201).json({ serverResponse: resultmat });
  }
  public update(request: Request, response: Response) {}
  public async get(request: Request, response: Response) {
    const resultmat = await this.materiasRepository.find({});
    response.status(201).json({ serverResponse: resultmat });
  }
  public delete(request: Request, response: Response) {}
  public login(request: Request, response: Response) {}
  public singOut(request: Request, response: Response) {}
}
export default MateriasController;
