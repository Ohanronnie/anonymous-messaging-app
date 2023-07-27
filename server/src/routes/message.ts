import Router from "./router.js";
import Message from "../controllers/message.js";
import { token } from "../lib/token.js";
const message = new Message();
const router = new Router(
  [
    {
      path: "/send/:id",
      method: "post",
      controller: message.send.bind(message),
    },
    {
      path: "/messages",
      method: "get",
      controller: message.messages.bind(message),
    },
  ],
  token,
);
export default router.routes();
