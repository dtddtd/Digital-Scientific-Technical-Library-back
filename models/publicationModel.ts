import { Model } from "objection";
import { ENUM_PUBLICATION_STATUS } from "./enums";
import TrackingModel from "./trackingModel";
import publisherModel from "./publisherModel";

class publicationModel extends Model {
  static get tableName() {
    return "publication";
  }

  static get idColumn() {
    return "pubID";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "authors",
        "language",
        "pubDate",
        "pubHeader",
        "pubType",
        "status",
      ],
      properties: {
        pubID: { type: "integer" },
        publisherID: { type: "integer" },
        authors: { type: "string", minLength: 0, maxLength: 255 },
        bibCipher: { type: "string", minLength: 0, maxLength: 8 },
        doi: { type: "string", minLength: 0, maxLength: 255 },
        isNew: { type: "boolean" },
        isTranslation: { type: "boolean" },
        keywords: { type: "string", minLength: 0, maxLength: 255 },
        language: { type: "string", minLength: 0, maxLength: 3 },
        notes: { type: "string" },
        pubDate: { type: "string" },
        pubHeader: { type: "string", minLength: 0, maxLength: 255 },
        pubType: { type: "string", minLength: 0, maxLength: 15 },
        redactors: { type: "string", minLength: 0, maxLength: 255 },
        series: { type: "string", minLength: 0, maxLength: 50 },
        status: { type: "string", enum: ENUM_PUBLICATION_STATUS },
        volume: { type: "integer" },
        webLink: { type: "string", minLength: 0, maxLength: 255 },
      },
    };
  }

  static relationMappings() {
    return {
      tracking: {
        relation: Model.HasManyRelation,
        modelClass: TrackingModel,
        join: {
          from: "publication.pubID",
          to: "tracking.pubID",
        },
      },
      publication: {
        relation: Model.BelongsToOneRelation,
        modelClass: publisherModel,
        join: {
          from: "publication.publisherID",
          to: "publisher.publisherID",
        },
      },
    };
  }
}

export default publicationModel;
