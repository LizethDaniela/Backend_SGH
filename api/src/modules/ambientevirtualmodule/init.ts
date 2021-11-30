import App from "../../App";
import Routes from "./routes";
class AmbientevirtualModule {
    constructor(routePath: string, app: App) {
        console.log("Load Ambiente Virtual Module");
        const routes: Routes = new Routes(routePath, app);
    }
}
export default AmbientevirtualModule;