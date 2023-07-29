import Router from "./router.js";
import Csrf from "../lib/csrf.js";
import { Request, Response } from "express";
const csrf = new Csrf();
const router = new Router(
  {
    path: "/",
    method: "get",
    controller: (req: Request, res: Response) => {
      return res
        .status(200)
        .cookie("X-CSRF", req.csrf, {
          maxAge: parseInt(process.env.COOKIE_EXPIRESIN!),
          sameSite: "strict",
          httpOnly: true,
          secure: false,
        })
        .json({
          token: req.csrf,
        });
    },
  },
  [csrf.enable],
);
export default router.routes();
