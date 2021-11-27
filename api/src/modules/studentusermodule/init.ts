import App from "../../App";
import Routes from "./routes";
class StudentModule {
    constructor(routePath: string, app: App) {
        console.log("Load Student Module");
        const routes: Routes = new Routes(routePath, app);
    }
}
export default StudentModule;