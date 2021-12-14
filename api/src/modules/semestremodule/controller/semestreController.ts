import { Request, Response } from "express";
import App from "../../../App";
import { createModel as createSemestreModel, ISemestre} from "../model/SemestreModel";
import { createModel as createMateriaModel } from "../../materiamodule/model/SubjectsModel";
import SemestreRepository from "../repositories/SemestreRepository";

class SemestreController {
    private app: App;
    private semestreRepository: SemestreRepository<ISemestre>;
    constructor(app: App) {
      this.app = app;
      this.semestreRepository = new SemestreRepository(
        createSemestreModel(app.getClientMongoose()),
        createMateriaModel(app.getClientMongoose())
      );
    }
  //method POST
  public async create(request: Request, response: Response) {
    //body
    let { semestre, grupo, gestion, nivel_academico, disponibilidad_tiempo, disponibilidad_ocupada } = request.body;
    const resultsemestre = await this.semestreRepository.create({ semestre, grupo, gestion, nivel_academico, disponibilidad_tiempo, disponibilidad_ocupada });
    response.status(201).json({ semestreResponse: resultsemestre });
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { semestre, grupo, gestion, nivel_academico, disponibilidad_tiempo, disponibilidad_ocupada }: ISemestre = request.body;
    const resultsemestre = await this.semestreRepository.update(id, { semestre, grupo, gestion, nivel_academico, disponibilidad_tiempo, disponibilidad_ocupada });
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

  public async addMateriaGrupo(request: Request, response: Response) {
    const { idMateria, idGrupo } = request.params;
    const result = await this.semestreRepository.addGrupoMateria(idMateria, idGrupo);
    response.status(201).json({ semestreResponse: result });
  }
}
export default SemestreController;
