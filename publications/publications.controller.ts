import { Request, Response } from "express";
import {
  addNewPublication,
  deletePublication,
  getAllPublications,
  updatePublication,
} from "./publications.service";

export const getPublicationsReq = async (req: Request, res: Response) => {
  try {
    const publications = await getAllPublications();

    res.send(publications);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const addPublicationReq = async (req: Request, res: Response) => {
  try {
    const publication = await addNewPublication(req.body);

    res.send(publication);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const updatePublicationReq = async (req: Request, res: Response) => {
  try {
    if (!req.query.pubID) {
      throw new Error("Не передан pubID");
    }

    await updatePublication(req.body, req.query.pubID as string);

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const deletePublicationReq = async (req: Request, res: Response) => {
  try {
    if (!req.query.pubID) {
      throw new Error("Не передан pubID");
    }

    await deletePublication(req.query.pubID as string);

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
};
