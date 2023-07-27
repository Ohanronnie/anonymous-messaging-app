import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import App from "./app.js";
import register from "./routes/register.js";
import message from "./routes/message.js";
import User from "./models/User.js";
dotenv.config();
const PORT: number = (process.env.PORT as unknown as number) || 3000;
const _app = new App({
  middlewares: [
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE"],
    }),
    express.json(),
    morgan("dev"),
    bodyparser.urlencoded({ extended: false }),
  ],
  routes: [
    {
      path: "/register",
      route: register,
    },
    {
      path: "/message",
      route: message,
    },
  ],
  port: PORT,
});
_app.listen();
