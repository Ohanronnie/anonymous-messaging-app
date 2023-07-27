import { NextFunction } from "express";
import Router from "./router.js";
import Register from "../controllers/register.js";
const register = new Register();
const router = new Router([
  {
    path: "/login",
    method: "post",
    controller: register.login.bind(register),
  },
  {
    path: "/signup",
    method: "post",
    controller: register.signup.bind(register),
  },
]);
export default router.routes();
