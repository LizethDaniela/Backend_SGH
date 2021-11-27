import App from "../../App";
import Routes from "./routes";
class HorarioModule {
    constructor(routePath: string, app: App) {
        console.log("Load Ambiente Module");
        const routes: Routes = new Routes(routePath, app);
    }
}
export default HorarioModule;