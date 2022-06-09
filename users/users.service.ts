import bcrypt from "bcryptjs";
import UserModel from "../models/userModel";
import { TUser } from "./types";
import { generateAccessToken } from "./helpers";
import { TPublication } from "../publications/types";
import PublicationModel from "../models/publicationModel";

export const getAllUsers = async () => {
  try {
    const users = (await UserModel.query().select(
      "*"
    )) as unknown as Partial<TUser>[];

    users.forEach((user) => delete user.password);

    return users;
  } catch (e) {
    return {
      e,
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = (await UserModel.query()
      .where("email", "=", email)
      .first()) as unknown as TUser;

    if (!user) {
      throw new Error("Email error");
    }

    let validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      validPassword = password === user.password;
    }

    if (!validPassword) {
      throw new Error("Password error");
    }

    delete (user as Partial<TUser>).password;

    return {
      token: generateAccessToken(user.userID.toString(), user.email),
      user,
    };
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
  }
};

export const registration = async (userData: Omit<TUser, "userID">) => {
  const candidate = (await UserModel.query()
    .where("email", "=", userData.email)
    .first()) as unknown as TUser;

  if (candidate) {
    throw "Email занят";
  }

  const hashPassword = bcrypt.hashSync(userData.password, 10);

  await UserModel.query().insert({
    ...userData,
    password: hashPassword,
  });
};

export const updateUser = async (payload: Partial<TUser>, userId: string) => {
  try {
    delete payload.password;

    await UserModel.query().update(payload).where("userID", "=", userId);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));

    return {
      e,
    };
  }
};

export const deleteUser = async (payload: string) => {
  try {
    return await UserModel.query().delete().where("userID", "=", payload);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));

    return {
      e,
    };
  }
};
