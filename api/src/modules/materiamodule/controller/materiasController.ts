import { Request, Response } from "express";
import App from "../../../App";
import { createModel as createSubjectModel, ISubjects } from "../model/SubjectsModel";
import { createModel as createTeacherModel } from "../../teacherusermodule/model/TeacherModel";
import MateriasRepository from "../repositories/MateriasRepository";

class MateriasController {
  private app: App;
  private materiasRepository: MateriasRepository<ISubjects>;
  constructor(app: App) {
    this.app = app;
    this.materiasRepository = new MateriasRepository(
      createSubjectModel(app.getClientMongoose()),
      createTeacherModel(app.getClientMongoose())
    );
  }
  //method POST
  public async create(request: Request, response: Response) {
    //body
    let { subject, sigla, semestre, horas_semana } = request.body;
    const resultmat = await this.materiasRepository.create({ subject, sigla, semestre, horas_semana });
    response.status(201).json({ materiaResponse: resultmat });
  }
  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { subject, sigla, semestre, horas_semana }: ISubjects = request.body;
    const resultmat = await this.materiasRepository.update(id, { subject, sigla, semestre, horas_semana });
    response.status(201).json({ materiaResponse: resultmat });
  }

  public async get(request: Request, response: Response) {
    const resultmat = await this.materiasRepository.find({});
    response.status(201).json({ materiaResponse: resultmat });
  }

  public async getId(request: Request, response: Response) {
    const { id } = request.params;
    const resultmat = await this.materiasRepository.findOne(id);
    response.status(201).json({ materiaResponse: resultmat });
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const resultmat = await this.materiasRepository.delete(id);
    response.status(200).json({ materiaResponse: resultmat });
  }

  public async addTeacherMateria(request: Request, response: Response) {
    const { idTe, idMat } = request.params;
    const result = await this.materiasRepository.addMateriaTeacher(idTe, idMat);
    response.status(201).json({ materiaResponse: result });
  }

  public async getMateriaGrupos(request: Request, response: Response) {
    const resultmatgrupo = await this.materiasRepository.getMateriaGrupos();
    response.status(200).json({ matResponse: resultmatgrupo });
  }
}
export default MateriasController;
