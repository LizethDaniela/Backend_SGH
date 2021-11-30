import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import { createModel as createAmbienteModel, IAmbiente } from "../model/AmbienteModule"
import AmbienteRepository from "../repositories/SemestreRepository";

class AmbienteController {
    private ambienteRepository: AmbienteRepository;
    constructor(mongoose: Mongoose) {
      this.ambienteRepository = new AmbienteRepository(createAmbienteModel(mongoose));
    }
  //method POST
  public async create(request: Request, response: Response) {
    //body
    let { ambiente, capacidad, piso, tipo, disponibilidad_tiempo } = request.body;
    const resultambiente = await this.ambienteRepository.create({ ambiente, capacidad, piso, disponibilidad_tiempo });
    response.status(201).json({ ambienteResponse: resultambiente });
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { ambiente, capacidad, piso, disponibilidad_tiempo }: IAmbiente = request.body;
    const resultambiente = await this.ambienteRepository.update(id, { ambiente, capacidad, piso, disponibilidad_tiempo });
    response.status(201).json({ ambienteResponse: resultambiente });
  }

  public async getId(request: Request, response: Response) {
    const { id } = request.params;
    const resultambiente = await this.ambienteRepository.findOne(id);
    response.status(201).json({ ambienteResponse: resultambiente });
  }

  public async get(request: Request, response: Response) {
    const resultambiente = await this.ambienteRepository.find({});
    response.status(201).json({ ambienteResponse: resultambiente });
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const resultambiente = await this.ambienteRepository.delete(id);
    response.status(200).json({ ambienteResponse: resultambiente });
  }
}
export default AmbienteController;
