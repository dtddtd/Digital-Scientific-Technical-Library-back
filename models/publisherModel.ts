import { Model } from "objection";
import PublicationModel from "./publicationModel";

class publisherModel extends Model {
  static get tableName() {
    return "publisher";
  }

  static get idColumn() {
    return "publisherID";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["publisherName", "publisherLocation", "operationYears"],
      properties: {
        publisherID: { type: "integer" },
        publisherName: { type: "string", minLength: 0, maxLength: 30 },
        publisherLocation: { type: "string", minLength: 0, maxLength: 30 },
        operationYears: { type: "string", minLength: 0, maxLength: 9 },
        contactEmail: { type: "string", minLength: 0, maxLength: 50 },
        contactNumber: { type: "string", minLength: 0, maxLength: 12 },
      },
    };
  }

  static relationMappings() {
    return {
      publication: {
        relation: Model.HasManyRelation,
        modelClass: PublicationModel,
        join: {
          from: "publisher.publisherID",
          to: "publication.publisherID",
        },
      },
    };
  }
}

export default publisherModel;
