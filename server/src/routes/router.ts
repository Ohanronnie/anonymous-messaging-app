import { Router as _Router, IRouter, Response, Request } from "express";
interface IControl {
  path: string;
  method: string;
  controller: any;
  middlewares?: any;
}
type IWare = any;
export default class Router {
  private router: IRouter;
  constructor(appInt: IControl[] | IControl, middlewares?: IWare) {
    this.router = _Router();
    this.middleware(middlewares);
    this.route(appInt);
  }
  private route(_route: IControl | IControl[]) {
    if (!Array.isArray(_route)) {
      if (_route.middlewares)
        (this.router as any)[_route.method](
          _route.path,
          _route.middlewares,
          _route.controller,
        );
      else (this.router as any)[_route.method](_route.path, _route.controller);
    } else {
      for (let i of _route) {
        if (i.middlewares)
          (this.router as any)[i.method](i.path, i.middlewares, i.controller);
        else (this.router as any)[i.method](i.path, i.controller);
      }
    }
  }
  private middleware(_wares: undefined | IWare | IWare[]) {
    if (_wares) {
      if (!Array.isArray(_wares)) {
        this.router.use(_wares);
      } else {
        for (let i of _wares) {
          this.router.use(i);
        }
      }
    }
  }
  public routes() {
    return this.router;
  }
}
