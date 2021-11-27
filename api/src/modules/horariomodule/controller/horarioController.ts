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
    let { disponibilidad_tiempo, dia, materia, docente, ambiente, piso, turno, semestre, grupo } = request.body;
    const resulthorario = await this.horarioRepository.create({ disponibilidad_tiempo, dia, materia, docente, ambiente, piso, turno, semestre, grupo });
    response.status(201).json({ horarioResponse: resulthorario });
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { disponibilidad_tiempo, dia, materia, docente, ambiente, piso, turno, semestre, grupo }: IHorario = request.body;
    const resulthorario = await this.horarioRepository.update(id, { disponibilidad_tiempo, dia, materia, docente, ambiente, piso, turno, semestre, grupo });
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
    response.status(200).json({ ambienteResponse: resulthorario });
  }
}
export default HorarioController;
