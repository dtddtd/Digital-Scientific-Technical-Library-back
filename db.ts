import { Model } from "objection";
import Knex from "knex";

const config = require("./knexfile");

export const knex = Knex(config);

export default Model.knex(knex);
