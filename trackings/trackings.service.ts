import { TTracking } from "./types";
import TrackingModel from "../models/trackingModel";
import { TPublication } from "../publications/types";
import PublicationModel from "../models/publicationModel";

export const getAllTrackings = async () => {
  try {
    return await TrackingModel.query().select("*");
  } catch (e) {
    return {
      e,
    };
  }
};

export const getAllTrackingsByUserId = async (id: number) => {
  try {
    return await TrackingModel.query().select("*").where("userID", "=", id);
  } catch (e) {
    return {
      e,
    };
  }
};

export const addNewTracking = async (payload: Omit<TTracking, "trackID">) => {
  console.log(JSON.stringify(payload, null, 2));

  try {
    return await TrackingModel.query().insert({
      ...payload,
      userID: Number(payload.userID),
      pubID: Number(payload.pubID),
    });
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));

    return {
      e,
    };
  }
};

export const updateTracking = async (
  payload: Partial<TTracking>,
  trackID: string
) => {
  try {
    return await TrackingModel.query()
      .update({
        ...payload,
        userID: Number(payload.userID),
        pubID: Number(payload.pubID),
      })
      .where("trackID", "=", trackID);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));

    return {
      e,
    };
  }
};

export const deleteTracking = async (payload: string) => {
  try {
    return await TrackingModel.query().delete().where("trackID", "=", payload);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));

    return {
      e,
    };
  }
};
