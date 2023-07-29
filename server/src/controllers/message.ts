import { Response, Request } from "express";
import User from "../models/User.js";
interface ISortType {
  type: string;
  val: number;
}
export default class Message {
  constructor() {}
  public async send(req: Request, res: Response) {
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
  private dateSort(document: any[], type: number | string) {
    const _doc = document.sort((a, b) => {
      if (type == 1) {
        return b.time - a.time;
      } else if (type == 0) {
        return a.time - b.time;
      } else return 1;
    });
    return _doc;
  }
  private search(document: any[], include: string) {
    let _doc = document;
    _doc = document.filter((value) => value.message.includes(include));
    return _doc;
  }
  private sort(type: ISortType[], document: any[]) {
    let _doc = document;
    type.forEach(({ type, val }) => {
      if (type === "date") {
        _doc = this.dateSort(_doc, val);
      }
      if (type === "search") {
        _doc = this.search(_doc, val);
      }
    });
  }
  public async messages(req: Request & { _id: any }, res: Response) {
    const user = (await User.findOne({ _id: req._id }).select("messages"))!;
    return res.status(200).json({
      count: user.messages.length,
      messages: user.messages,
    });
  }
}
