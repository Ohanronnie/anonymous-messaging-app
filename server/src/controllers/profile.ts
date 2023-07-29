import { Response, Request } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
export default class Profile {
  constructor() {}
  public async updateName(req: Request & { _id: any }, res: Response) {
    const newName = req.body.newname!;
    const oldName = req.body.oldname!;
    const password = req.body.password!;
    if (!newName)
      return res.status(400).json({
        message: "New-name field is compulsory",
      });
    try {
      const validatePass = await User.findOne({
        username: oldName,
        _id: req._id,
      });
      if (!validatePass)
        return res.status(400).json({
          message: "Username is incorrect",
        });
      if (!password)
        return res.status(401).json({
          message: "Password field is compulsory",
        });
      const isValid = bcrypt.compareSync(password, validatePass.password);
      if (!isValid)
        return res.status(401).json({
          message: "Incorrect Password",
        });
      const user = await User.findOneAndUpdate(
        { _id: req._id, username: oldName },
        { username: newName },
      );
      return res.status(201).json("success");
    } catch (err: any) {
      return res.status(401).json({
        message: "Sorry, an error occurred",
      });
    }
  }
  public async updateImage(req: Request & { _id: any }, res: Response) {
    const { path } = req.file!;
    try {
      const update = await User.findOneAndUpdate(
        { _id: req._id! },
        { coverPath: path },
      );
      return res.status(200).json({ path });
    } catch (err: any) {
      return res.status(500).json({
        message: "Sorry, an error occurred",
      });
    }
  }
}
