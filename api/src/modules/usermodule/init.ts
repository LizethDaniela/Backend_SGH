import App from "../../App";
import Routes from "./routes";
class UserModule {
  constructor(routePath: string, services: Array<string>, app: App) {
    console.log("Load User Modules");
    const routes: Routes = new Routes(routePath, services, app);
  }
}
export default UserModule;
