import { IStudent } from "../model/StudentModel";
import { BaseRepository } from "../../materiamodule/repositories/base/BaseRepository";

class StudentRepository extends BaseRepository<IStudent> {
  public asignarStudent() {}
}
export default StudentRepository;