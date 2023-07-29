import { randomBytes } from "crypto";
import { Request, Response, NextFunction } from "express";
export default class Crsf {
  constructor() {}
  enable(req: Request, res: Response, next: NextFunction) {
    const path = req.originalUrl;
    if (path === "/getToken") {
      req.session.csrf = randomBytes(16).toString("base64");
      req.csrf = req.session.csrf;
      next();
    } else next();
  }
  static confirmToken(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl === "/getToken") return next();
    const sessionToken = req.session.csrf;
    const cookieToken = req.cookies["X-CSRF"];
    const headerToken =
      req.get("CSRF-TOKEN") ||
      req.get("XSRF-TOKEN") ||
      req.headers["CSRF-TOKEN"] ||
      req.headers["XSRF-TOKEN"];
    if (!sessionToken) {
      return res.status(401).json({
        message: "CRRF-Token isn't generated yet.",
      });
    } else if (!cookieToken && !headerToken) {
      return res.status(401).json({
        message: "CSRF-Token must be provided",
      });
    } else if (cookieToken !== sessionToken || headerToken !== sessionToken) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    } else {
      next();
    }
  }
}
