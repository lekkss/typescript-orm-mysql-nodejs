import { Application } from "express";
import tutorialRoutes from "./tutorial.routes";
import homeRoutes from "./home.routes";
import auth from "../middleware/auth";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/tutorials", auth, tutorialRoutes);
    app.use("/api", homeRoutes);
  }
}
