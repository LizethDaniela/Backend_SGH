import App from "../../App";
import Routes from "./routes";

class AmbienteModule {
    constructor(routePath: string, app: App) {
        console.log("Load Ambiente Module");
        const routes: Routes = new Routes(routePath, app);
    }
}
export default AmbienteModule;