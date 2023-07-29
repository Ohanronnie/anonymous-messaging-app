import Router from "./router.js";
import Profile from "../controllers/profile.js";
import { token } from "../lib/token.js";
import multer from "../lib/multer.js";
const profile = new Profile();
const router = new Router(
  [
    {
      path: "/update/name",
      method: "post",
      controller: profile.updateName.bind(profile),
    },
    {
      path: "/update/image",
      method: "post",
      controller: profile.updateImage.bind(profile),
      middlewares: multer.single("image"),
    },
  ],
  [token],
);
export default router.routes();
