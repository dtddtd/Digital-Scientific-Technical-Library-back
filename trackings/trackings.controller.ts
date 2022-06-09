import { Request, Response } from "express";
import {
  addNewPublication,
  deletePublication,
  getAllPublications,
  updatePublication,
} from "../publications/publications.service";
import {
  addNewTracking,
  deleteTracking,
  getAllTrackings,
  getAllTrackingsByUserId,
  updateTracking,
} from "./trackings.service";

export const getTrackingsReq = async (req: Request, res: Response) => {
  try {
    const trackings = await getAllTrackings();

    res.send(trackings);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const getTrackingsByUserIdReq = async (req: Request, res: Response) => {
  try {
    const trackings = await getAllTrackingsByUserId(Number(req.params.userId));

    res.send(trackings);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const addTrackingReq = async (req: Request, res: Response) => {
  try {
    const tracking = await addNewTracking(req.body);

    res.send(tracking);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const updateTrackingReq = async (req: Request, res: Response) => {
  try {
    if (!req.query.trackID) {
      throw new Error("Не передан trackID");
    }

    await updateTracking(req.body, req.query.trackID as string);

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const deleteTrackingReq = async (req: Request, res: Response) => {
  try {
    if (!req.query.trackID) {
      throw new Error("Не передан trackID");
    }

    await deleteTracking(req.query.trackID as string);

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
};
