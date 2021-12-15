import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import { createModel as createHorarioModel, IHorario } from "../model/HorarioModule"
import HorarioRepository from "../repositories/HorarioRepository";

class HorarioController {
    private horarioRepository: HorarioRepository;
    constructor(mongoose: Mongoose) {
      this.horarioRepository = new HorarioRepository(createHorarioModel(mongoose));
    }
  //method POST
  public async create(request: Request, response: Response) {
    //body
    let { semestre, grupo, disponibilidad_tiempo, dia, materia, docente, ambiente, piso } = request.body;
    const resulthorario = await this.horarioRepository.create({ semestre, grupo, disponibilidad_tiempo, dia, materia, docente, ambiente, piso });
    response.status(201).json({ horarioResponse: resulthorario });
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { semestre, grupo, disponibilidad_tiempo, dia, materia, docente, ambiente, piso }: IHorario = request.body;
    const resulthorario = await this.horarioRepository.update(id, { semestre, grupo, disponibilidad_tiempo, dia, materia, docente, ambiente, piso, });
    response.status(201).json({ horarioResponse: resulthorario });
  }

  public async getId(request: Request, response: Response) {
    const { id } = request.params;
    const resulthorario = await this.horarioRepository.findOne(id);
    response.status(201).json({ horarioResponse: resulthorario });
  }

  public async get(request: Request, response: Response) {
    const resulthorario = await this.horarioRepository.find({});
    response.status(201).json({ horarioResponse: resulthorario });
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const resulthorario = await this.horarioRepository.delete(id);
    response.status(200).json({ horarioResponse: resulthorario });
  }
}
export default HorarioController;
