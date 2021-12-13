import { ISubjects, Subjects } from "../model/SubjectsModel";
import { BaseRepository } from "./base/BaseRepository";
import { ITeacher, Teacher } from "../../teacherusermodule/model/TeacherModel";
import { Model } from "mongoose";

class MateriasRepository<T> extends BaseRepository<ISubjects> {
    private teacherModel: Model<ITeacher>;
    constructor(materiasModel: Model<ISubjects>, teacherModel: Model<ITeacher>) {
        super(materiasModel);
        this.teacherModel = teacherModel;
    }
    public async addMateriaTeacher(idTe: string, idMat: string) {
        console.log(idTe);
        console.log(idMat);
        const teacher: any = await this.teacherModel.findOne({_id: idTe});
        const materia: any = await this.findOne(idMat);
        if (teacher != null && materia != null) {
            const modelTeacher: Teacher = teacher;
            const modelMateria: Subjects = materia;
            modelTeacher.materias?.push(modelMateria.id);
            return await modelTeacher.save();
        }
        return null;
    }
}
export default MateriasRepository;