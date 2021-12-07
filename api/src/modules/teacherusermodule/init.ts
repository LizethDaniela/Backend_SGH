import App from "../../App";
import Routes from "./routes";

class TeacherModule {
    constructor(routePath: string, app: App) {
        console.log("Load Teacher Module");
        const routes: Routes = new Routes(routePath, app);
    }
}
export default TeacherModule;