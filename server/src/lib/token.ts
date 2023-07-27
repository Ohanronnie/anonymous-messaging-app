import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import User from "../models/User.js";
export async function token(req: Request & { _id: any }, res: Response) {
  let token =
    <string>req.headers["authorisation"] ||
    <string>req.headers["authorization"];
  token = token?.split(" ")?.[1]?.trim();
  try {
    interface IPayload {
      username: string;
      date: number;
    }
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as IPayload;
    const user = await User.findOne({ username: payload.username });
    if (!user) {
      throw new Error("Invalid Token");
    }
    req._id = user._id;
  } catch (err: any) {
    return res.status(502).json({
      message: "Invalid Token",
    });
  }
}
