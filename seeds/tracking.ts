import { Knex } from "knex";
import trackingData from "../data/trackingData";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("tracking").del();

  // Inserts seed entries
  await knex("tracking").insert(trackingData);
}
