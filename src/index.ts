import "express-async-errors";
import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

import Database from "./db";
//
// Error handlers
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import Routes from "./routes";

export default class Server {
  constructor(app: Application) {
    this.syncDatabase();
    new Routes(app);
    this.config(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:5000",
    };

    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(notFound);
    app.use(errorHandler);
  }

  private syncDatabase(): void {
    const db = new Database();
    db.sequelize?.sync();
  }
}
