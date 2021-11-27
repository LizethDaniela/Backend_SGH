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
    let { subject, sigla, semestre, horas_semana } = request.body;
    const resultmat = await this.materiasRepository.create({ subject, sigla, semestre, horas_semana });
    response.status(201).json({ serverResponse: resultmat });
  }
  public update(request: Request, response: Response) {}

  public async get(request: Request, response: Response) {
    const resultmat = await this.materiasRepository.find({});
    response.status(201).json({ serverResponse: resultmat });
  }
  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const result = await this.materiasRepository.delete(id);
    response.status(200).json({ serverResponse: result });
  }
}
export default MateriasController;
