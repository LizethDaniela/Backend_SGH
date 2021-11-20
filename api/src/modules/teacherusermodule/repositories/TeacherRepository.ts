import { ITeacher } from "../model/TeacherModel";
import { BaseRepository } from "../../teacherusermodule/repositories/base/BaseRepository";

class TeacherRepository extends BaseRepository<ITeacher> {
  public asignarTeacher() {}
}
export default TeacherRepository;