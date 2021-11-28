import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import { createModel as createSemestreModel, ISemestre} from "../model/SemestreModel"
import SemestreRepository from "../repositories/SemestreRepository";

class SemestreController {
    private semestreRepository: SemestreRepository;
    constructor(mongoose: Mongoose) {
      this.semestreRepository = new SemestreRepository(createSemestreModel(mongoose));
    }
  //method POST
  public async create(request: Request, response: Response) {
    //body
    let { semestre, grupo, gestion, nivel_academico, carga_horaria_semana } = request.body;
    const resultsemestre = await this.semestreRepository.create({ semestre, grupo, gestion, nivel_academico, carga_horaria_semana });
    response.status(201).json({ semestreResponse: resultsemestre });
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { semestre, grupo, gestion, nivel_academico, carga_horaria_semana }: ISemestre = request.body;
    const resultsemestre = await this.semestreRepository.update(id, { semestre, grupo, gestion, nivel_academico, carga_horaria_semana });
    response.status(201).json({ semestreResponse: resultsemestre });
  }

  public async getId(request: Request, response: Response) {
    const { id } = request.params;
    const resultsemestre = await this.semestreRepository.findOne(id);
    response.status(201).json({ semestreResponse: resultsemestre });
  }

  public async get(request: Request, response: Response) {
    const resultsemestre = await this.semestreRepository.find({});
    response.status(201).json({ semestreResponse: resultsemestre });
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const resultsemestre = await this.semestreRepository.delete(id);
    response.status(200).json({ semestreResponse: resultsemestre });
  }
}
export default SemestreController;
