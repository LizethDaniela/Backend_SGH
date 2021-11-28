import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import { createModel as createStudentModel, IStudent } from "../model/StudentModel";
import StudentRepository from "../repositories/StudentRepository";

class StudentController {
  private studentRepository: StudentRepository;

  constructor(mongoose: Mongoose) {
    this.studentRepository = new StudentRepository(createStudentModel(mongoose));
  }
  //method POST
  public async create(request: Request, response: Response) {
    //body
    let { nombre, ap_paterno, ap_materno, ci, ru, cargo, semestre, email, username, password, fecha_nac, telefono } = request.body;
    const resultestudent = await this.studentRepository.create({ nombre, ap_paterno, ap_materno, ci, ru, cargo, semestre, email, username, password, fecha_nac, telefono });
    response.status(201).json({ studentResponse: resultestudent });
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nombre, ap_paterno, ap_materno, ci, ru, cargo, semestre, email, username, fecha_nac, telefono }: IStudent = request.body;
    const resultestudent = await this.studentRepository.update(id, { nombre, ap_paterno, ap_materno, ci, ru, cargo, semestre, email, username, fecha_nac, telefono  });
    response.status(201).json({ studentResponse: resultestudent });
  }

  public async get(request: Request, response: Response) {
    const resulstudent = await this.studentRepository.find({});
    response.status(201).json({ studentResponse: resulstudent });
  }

  public async getId(request: Request, response: Response) {
    const { id } = request.params;
    const resultstudent = await this.studentRepository.findOne(id);
    response.status(201).json({ studentResponse: resultstudent });
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const resultstudent = await this.studentRepository.delete(id);
    response.status(200).json({ studentResponse: resultstudent });
  }
}
export default StudentController;
