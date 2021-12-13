import { ITeacher } from "../model/TeacherModel";
import { BaseRepository } from "../../teacherusermodule/repositories/base/BaseRepository";
import { Model } from "mongoose";

class TeacherRepository<T> extends BaseRepository<ITeacher> {
    private teacherModel: Model<ITeacher>;
    constructor(model: Model<ITeacher>) {
        super(model);
        this.teacherModel = model;
    }
    public async getTeacherMaterias() {
        const data = await this.teacherModel.find({}).populate("materias");
        return data;
    }
}
export default TeacherRepository;