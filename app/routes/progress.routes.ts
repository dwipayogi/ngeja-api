import { Router } from "express";
import {
  createProgress,
  getProgress,
} from "../controllers/progress.controller";

export const progressRouter = (app: Router) => {
  app.post("/progress", createProgress);
  app.get("/progress/:name", getProgress);
};