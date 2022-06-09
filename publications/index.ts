import { Express } from "express";
import {
  addPublicationReq,
  deletePublicationReq,
  getPublicationsReq,
  updatePublicationReq,
} from "./publications.controller";

export const routes = (app: Express) => {
  app
    .route("/publications")
    .get(getPublicationsReq)
    .post(addPublicationReq)
    .put(updatePublicationReq)
    .delete(deletePublicationReq);
};
