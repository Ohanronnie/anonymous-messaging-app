import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import User from "../models/User.js";
export default class Message {
  constructor() {}
  public async send(req: Request, res: Response): Promise<any> {
    const username = req.params.id;
    const message = req.body.message;
    try {
      const user = await User.findOne({ username });
      if (!user)
        return res.status(301).json({
          message: "User doesn't exist",
        });
      user.messages.push({
        message,
        time: new Date(),
      });
      await user.save();
      return res.status(200).send("send successfully ");
    } catch (err) {
      return res.status(502).json({
        message: "sorry, an error occurred somewhere",
      });
    }
  }
  public async messages(req: Request, res: Response) {
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
      const user = await User.findOne({ username: payload.username }).select(
        "messages",
      );
      return res.status(200).json({
        count: user!.messages.length,
        messages: user!.messages,
      });
    } catch (err: any) {
      return res.status(502).json({
        message: "Invalid Token",
      });
    }
  }
}
