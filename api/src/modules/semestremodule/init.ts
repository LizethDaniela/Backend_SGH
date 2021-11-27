import App from "../../App";
import Routes from "./routes";
class SemestreModule {
    constructor(routePath: string, app: App) {
        console.log("Load Semestre Module");
        const routes: Routes = new Routes(routePath, app);
    }
}
export default SemestreModule;