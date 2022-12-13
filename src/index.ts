import * as DotEnv from "dotenv";
DotEnv.config();
import "./database";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const port = process.env.PORT || 3003;

import cors from "cors";
import AppError from "./utils/AppError";
import GlobalErrorHandler from "./controllers/error.controller";

console.log("ENV: ", process.env.production);

const app = express();

const whitelist =
  process.env.production == "PROD"
    ? [
        "http://188.166.65.114:3001",
        "http://188.166.65.114:3002",
        "http://188.166.65.114:3000",
        "http://188.166.65.114:3003",
        "http://188.166.65.114:3010",
      ]
    : [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
      ];
// const corsOptions = {
//   origin: function (origin: string, callback: any) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
    customFormatErrorFn: (err) => {
      if (!err.originalError) {
        return err;
      }
      return {
        message: err.message,
        extensions: err.extensions,
        stack: process.env.production == "PROD" ? err.stack : undefined,
      };
    },
  })
);
// app.use("/v1", router);

//ALL NOT FOUND ROUTES GO HERE
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//GROBAL ERROR MIDDLEWERE
app.use(GlobalErrorHandler);

app.listen(port, () => console.log("NFT 360 API: conected on port: ", port));

module.exports = app;
