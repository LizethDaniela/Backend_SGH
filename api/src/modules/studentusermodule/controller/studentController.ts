import { Request, Response } from "express";
import { Mongoose } from "mongoose";
import { createModel as createStudentModel } from "../model/StudentModel";
import StudentRepository from "../repositories/StudentRepository";

class StudentController {
  private studentRepository: StudentRepository;

  constructor(mongoose: Mongoose) {
    this.studentRepository = new StudentRepository(createStudentModel(mongoose));
  }
  //method POST
  public async create(request: Request, response: Response) {
    //body
    let { ci, nombre, apaterno, amaterno, fecha_nac, telefono } = request.body;
    const resultestudent = await this.studentRepository.create({ ci, nombre, apaterno, amaterno, fecha_nac, telefono  });
    response.status(201).json({ studentResponse: resultestudent });
  }
  public update(request: Request, response: Response) {}
  public async get(request: Request, response: Response) {
    const resulstudent = await this.studentRepository.find({});
    response.status(201).json({ studentResponse: resulstudent });
  }
  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const resultstudent = await this.studentRepository.delete(id);
    response.status(200).json({ studentResponse: resultstudent });
  }
}
export default StudentController;
