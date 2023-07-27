import express, {
  Request,
  Response,
  Application,
  NextFunction,
  IRouter,
} from "express";
export interface IRoute {
  path: string;
  route: IRouter;
}
export default class App {
  private app;
  private port: number;
  constructor(
    public appInt: { middlewares: any; port: number; routes: IRoute[] }
  ) {
    this.app = express();
    this.middlewares(appInt.middlewares);
    this.routes(appInt.routes);
    this.port = appInt.port;
  }
  private middlewares(_wares: any[]) {
    if (!_wares) return;
    for (let middleware of _wares) {
      this.app.use(middleware);
    }
  }
  private routes(_route: IRoute[]) {
    if (!_route) return;
    for (let route of _route) {
      this.app.use(route.path, route.route);
    }
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App is active at PORT ${this.port}`);
    });
  }
}
