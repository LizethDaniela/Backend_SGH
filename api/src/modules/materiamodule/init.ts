import App from "../../App";
import Routes from "./routes";
class SubjectModule {
    constructor(routePath: string, app: App) {
        console.log("Load User Modules");
        const routes: Routes = new Routes(routePath, app);
    }
}
export default SubjectModule;