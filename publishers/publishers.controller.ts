import { Request, Response } from "express";
import { getAllPublishers } from "./publishers.service";

export const getPublishers = async (req: Request, res: Response) => {
  try {
    const publishers = await getAllPublishers();
    res.send(publishers);
  } catch (e) {
    res.sendStatus(500);
  }
};
