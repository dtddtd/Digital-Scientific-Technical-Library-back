import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import dbConnect from "./db";
import { routes as publicationsApi } from "./publications";
import { routes as usersApi } from "./users";
import { routes as publishersApi } from "./publishers";
import { routes as trackingsApi } from "./trackings";

const app = express();

try {
  dbConnect;
  console.log("MS SQL Database started");
} catch (e) {
  console.log(e);
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "*",
  })
);

publicationsApi(app);
usersApi(app);
publishersApi(app);
trackingsApi(app);

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
  );
});

module.exports = app;
