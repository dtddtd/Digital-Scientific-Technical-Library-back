import { Model } from "objection";
import { ENUM_TRACKJOURNAL_OPTYPE } from "./enums";
import TrackingModel from "./trackingModel";

class trackjournalModel extends Model {
  static get tableName() {
    return "trackjournal";
  }

  static get idColumn() {
    return "tjID";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userID", "pubID"],
      properties: {
        tjID: { type: "integer" },
        trackID: { type: "integer" },
        opDate: { type: "string" },
        opType: { type: "string", enum: ENUM_TRACKJOURNAL_OPTYPE },
      },
    };
  }

  static relationMappings() {
    return {
      tracking: {
        relation: Model.BelongsToOneRelation,
        modelClass: TrackingModel,
        join: {
          from: "trackjournal.trackID",
          to: "tracking.trackID",
        },
      },
    };
  }
}

export default trackjournalModel;
