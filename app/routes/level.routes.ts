import { Router } from "express";
import {
  createLevel,
  getLevel,
  updateLevel,
  deleteLevel,
} from "../controllers/level.controller";

export const levelRouter = (app: Router) => {
  app.post("/levels", createLevel);
  app.get("/levels/:name", getLevel);
  app.put("/levels/:name", updateLevel);
  app.delete("/levels/:name", deleteLevel);
};
