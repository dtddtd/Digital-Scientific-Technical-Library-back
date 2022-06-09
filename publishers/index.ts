import { Express } from "express";
import { getPublishers } from "./publishers.controller";

export const routes = (app: Express) => {
  app.route("/publishers").get(getPublishers);
};
