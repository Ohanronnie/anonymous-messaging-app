import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export default class Register {
  constructor() {}
  public async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;
    console.log(req.body, req.query);
    if (!username)
      return res.status(400).json({
        message: "Username field must be filled",
      });
    else if (!password)
      return res.status(400).json({
        message: "Password field must be filled",
      });
    try {
      const user = await User.findOne({ username });
      if (!user)
        return res.status(401).json({
          message: "Username doesn't exist",
        });
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid)
        return res.status(401).json({
          message: "Incorrect Password",
        });
      const token = jwt.sign(
        {
          username,
          date: Date.now(),
        },
        process.env.SECRET_KEY!,
      );
      return res.status(200).json({
        token: token,
      });
    } catch (err: any) {
      return res.status(502).json({
        message: "sorry, an error occurred somewhere",
      });
    }
  }
  public async signup(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;
    const _user = await User.findOne({ username });
    if (!username || username.length < 4)
      return res.status(400).json({
        message: "Username must not be lesser than 4",
      });
    else if (!password || password.length < 4)
      return res.status(400).json({
        message: "Password must not be lesser than 4",
      });
    console.log(_user);
    if (_user)
      return res.status(400).json({
        message: "User already exist",
      });
    const user = new User({
      username,
      password,
    });
    try {
      await user.save();
      return res.status(200).json(null);
    } catch (err: any) {
      console.log(err);
      return res.status(502).json({
        message: "sorry, an error occurred somewhere",
      });
    }
  }
}
