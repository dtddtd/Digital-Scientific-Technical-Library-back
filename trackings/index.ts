import { Express } from "express";

import {
  addTrackingReq,
  deleteTrackingReq,
  getTrackingsByUserIdReq,
  getTrackingsReq,
  updateTrackingReq,
} from "./trackings.controller";

export const routes = (app: Express) => {
  app
    .route("/trackings")
    .get(getTrackingsReq)
    .post(addTrackingReq)
    .put(updateTrackingReq)
    .delete(deleteTrackingReq);
  app.route("/trackings/:userId").get(getTrackingsByUserIdReq);
};
