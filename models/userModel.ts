import { Model } from "objection";
import { ENUM_USER_ROLE } from "./enums";
import TrackingModel from "./trackingModel";

class userModel extends Model {
  static get tableName() {
    return "user";
  }

  static get idColumn() {
    return "userID";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["fullName", "role", "department", "phone"],
      properties: {
        userID: { type: "integer" },
        email: { type: "string" },
        password: { type: "string" },
        fullName: { type: "string", minLength: 0, maxLength: 50 },
        role: { type: "string", enum: ENUM_USER_ROLE },
        department: { type: "string", minLength: 0, maxLength: 50 },
        phone: { type: "string", minLength: 0, maxLength: 255 },
      },
    };
  }

  static relationMappings() {
    return {
      tracking: {
        relation: Model.HasManyRelation,
        modelClass: TrackingModel,
        join: {
          from: "user.userID",
          to: "tracking.userID",
        },
      },
    };
  }
}

export default userModel;
