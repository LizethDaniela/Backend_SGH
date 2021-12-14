import { Model } from "mongoose";
import { ISubjects, Subjects } from "../../materiamodule/model/SubjectsModel";
import { ISemestre, Semestre } from "../model/SemestreModel";
import { BaseRepository } from "./base/BaseRepository";

class SemestreRepository<T> extends BaseRepository<ISemestre> {
    private materiaModel: Model<ISubjects>;
    constructor(gruposModel: Model<ISemestre>, materiaModel: Model<ISubjects>) {
        super(gruposModel);
        this.materiaModel = materiaModel;
    }
    public async addGrupoMateria(idMateria: string, idGrupo: string) {
        console.log(idMateria);
        console.log(idGrupo);
        const materia: any = await this.materiaModel.findOne({_id: idMateria});
        const grupo: any = await this.findOne(idGrupo);
        if (materia != null && grupo != null) {
            const modelMateria: Subjects = materia;
            const modelGrupo: Semestre = grupo;
            modelMateria.grupos?.push(modelGrupo.id);
            return await modelMateria.save();
        }
        return null;
    }
}
export default SemestreRepository;