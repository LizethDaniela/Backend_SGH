import { ISubjects, Subjects } from "../model/SubjectsModel";
import { BaseRepository } from "./base/BaseRepository";
import { ITeacher, Teacher } from "../../teacherusermodule/model/TeacherModel";
import { Model } from "mongoose";

class MateriasRepository<T> extends BaseRepository<ISubjects> {
    private materiaModel: Model<ISubjects>;
    private teacherModel: Model<ITeacher>;
    constructor(model: Model<ISubjects>, teacherModel: Model<ITeacher>) {
        super(model);
        this.materiaModel = model;
        this.teacherModel = teacherModel;
    }
    public async addMateriaTeacher(idTe: string, idMat: string) {
        console.log(idTe);
        console.log(idMat);
        const teacher: any = await this.teacherModel.findOne({_id: idTe});
        const materia: any = await this.materiaModel.findOne({_id: idMat});
        if (teacher != null && materia != null) {
            const modelTeacher: Teacher = teacher;
            const modelMateria: Subjects = materia;
            modelTeacher.materias?.push(modelMateria.id);
            return await modelTeacher.save();
        }
        return null;
    }
    public async getMateriaGrupos() {
        const data = await this.materiaModel.find({}).populate("semestre");
        console.log(data);
        return data;
    }
}
export default MateriasRepository;