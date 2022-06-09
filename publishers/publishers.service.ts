import PublisherModel from "../models/publisherModel";

export const getAllPublishers = async () => {
  try {
    return await PublisherModel.query().select("*");
  } catch (e) {
    return {
      e,
    };
  }
};
