import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import User from "../models/User.js";
export async function token(
  req: Request & { _id: any },
  res: Response,
  next: NextFunction,
) {
  let token =
    <string>req.headers["authorisation"] ||
    <string>req.headers["authorization"];
  token = token?.split(" ")?.[1]?.trim();
  try {
    interface IPayload {
      id: string;
      date: number;
    }
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as IPayload;
    const user = await User.findOne({ _id: payload.id });
    if (!user) {
      throw new Error("Invalid Token");
    }
    req._id = user._id;
    next();
  } catch (err: any) {
    return res.status(502).json({
      message: "Invalid Token",
    });
  }
}
