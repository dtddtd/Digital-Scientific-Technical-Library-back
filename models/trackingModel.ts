import { Model } from "objection";
import TrackjournalModel from "./trackjournalModel";
import publicationModel from "./publicationModel";
import userModel from "./userModel";

class trackingModel extends Model {
  static get tableName() {
    return "tracking";
  }

  static get idColumn() {
    return "trackID";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userID", "pubID"],
      properties: {
        trackID: { type: "integer" },
        userID: { type: "integer" },
        pubID: { type: "integer" },
        dateIN: { type: "string" },
        dateOUT: { type: "string" },
      },
    };
  }

  static relationMappings() {
    return {
      trackjournal: {
        relation: Model.HasManyRelation,
        modelClass: TrackjournalModel,
        join: {
          from: "tracking.trackID",
          to: "trackjournal.trackID",
        },
      },
      publication: {
        relation: Model.BelongsToOneRelation,
        modelClass: publicationModel,
        join: {
          from: "tracking.pubID",
          to: "publication.pubID",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: userModel,
        join: {
          from: "tracking.userID",
          to: "user.userID",
        },
      },
    };
  }
}

export default trackingModel;
