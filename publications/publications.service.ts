import PublicationModel from "../models/publicationModel";
import { TPublication } from "./types";
import publicationModel from "../models/publicationModel";

export const getAllPublications = async () => {
  try {
    return await PublicationModel.query().select("*");
  } catch (e) {
    return {
      e,
    };
  }
};

export const addNewPublication = async (
  payload: Omit<TPublication, "pubID">
) => {
  try {
    return await PublicationModel.query().insert({
      ...payload,
      pubDate: new Date(payload.pubDate)
        .toISOString()
        .replace("Z", "")
        .replace("T", " "),
    });
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));

    return {
      e,
    };
  }
};

export const updatePublication = async (
  payload: Partial<TPublication>,
  pubID: string
) => {
  try {
    return await PublicationModel.query()
      .update(payload)
      .where("pubID", "=", pubID);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));

    return {
      e,
    };
  }
};

export const deletePublication = async (payload: string) => {
  try {
    return await PublicationModel.query().delete().where("pubID", "=", payload);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));

    return {
      e,
    };
  }
};
