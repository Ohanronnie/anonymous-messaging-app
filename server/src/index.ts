import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyparser from "body-parser";
import cookieparser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import App from "./app.js";
import register from "./routes/register.js";
import message from "./routes/message.js";
import profile from "./routes/profile.js";
import csrfToken from "./routes/csrf.js";
import csrf from "./lib/csrf.js";
import User from "./models/User.js";
dotenv.config();
declare global {
  namespace Express {
    interface Request {
      csrf: string;
      token: string;
    }
  }
}
declare module "express-session" {
  interface SessionData {
    isAuthenticated: boolean;
    csrf: string;
  }
}

const sessionConfig = session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  name: "sessID",
  cookie: {
    maxAge: parseInt(process.env.COOKIE_EXPIRESIN!),
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  },
});
const PORT = process.env.PORT || 3001;
const _app = new App({
  middlewares: [
    cors({
      origin: (origin, callback) => {
        callback(null, origin);
      },
      methods: ["GET", "POST", "DELETE"],
      credentials: true,
    }),
    express.json(),
    morgan("dev"),
    bodyparser.urlencoded({ extended: false }),
    cookieparser("tp07089314662"),
    sessionConfig,
    csrf.confirmToken,
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
    {
      path: "/profile",
      route: profile,
    },
    {
      path: "/getToken",
      route: csrfToken,
    },
  ],
  port: PORT as number,
});
_app.listen();
