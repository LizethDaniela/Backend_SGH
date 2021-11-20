import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import { createModel as createTeacherModel } from "../model/TeacherModel";
import TeacherRepository from "../repositories/TeacherRepository";

class TeacherController {
  private teacherRepository: TeacherRepository;

  constructor(mongoose: Mongoose) {
    this.teacherRepository = new TeacherRepository(createTeacherModel(mongoose));
  }
  //method POST
  public async create(request: Request, response: Response) {
    //body
    let { ci, nombre, apaterno, amaterno, fecha_nac, telefono } = request.body;
    const resultteacher = await this.teacherRepository.create({ ci, nombre, apaterno, amaterno, fecha_nac, telefono  });
    response.status(201).json({ teacherResponse: resultteacher });
  }
  public update(request: Request, response: Response) {}
  //method GET
  public async get(request: Request, response: Response) {
    const resultteacher = await this.teacherRepository.find({});
    response.status(201).json({ teacherResponse: resultteacher });
  }
  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const resultteacher = await this.teacherRepository.delete(id);
    response.status(200).json({ teacherResponse: resultteacher });
  }
}
export default TeacherController;
