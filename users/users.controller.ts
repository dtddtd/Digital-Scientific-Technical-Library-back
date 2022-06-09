import { Request, Response } from "express";
import {
  deleteUser,
  getAllUsers,
  login,
  registration,
  updateUser,
} from "./users.service";
import {
  deletePublication,
  updatePublication,
} from "../publications/publications.service";

export const getUsersReq = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const loginReq = async (req: Request, res: Response) => {
  try {
    const data = await login(req.body.email, req.body.password);

    res.send(data);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const registrationReq = async (req: Request, res: Response) => {
  try {
    await registration(req.body);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const updateUserReq = async (req: Request, res: Response) => {
  try {
    if (!req.query.userId) {
      throw new Error("Не передан userId");
    }

    await updateUser(req.body, req.query.userId as string);

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const deleteUserReq = async (req: Request, res: Response) => {
  try {
    if (!req.query.userId) {
      throw new Error("Не передан pubID");
    }

    await deleteUser(req.query.userId as string);

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
};
