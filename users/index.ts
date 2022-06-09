import { Express } from "express";
import {
  deleteUserReq,
  getUsersReq,
  loginReq,
  registrationReq,
  updateUserReq,
} from "./users.controller";

export const routes = (app: Express) => {
  app.route("/users").get(getUsersReq).put(updateUserReq).delete(deleteUserReq);
  app.route("/login").post(loginReq);
  app.route("/registration").post(registrationReq);
};
