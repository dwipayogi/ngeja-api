import { Router } from "express";
import {
  createQuestion,
  getQuestion,
} from "../controllers/question.controller";

export const questionRouter = (app: Router) => {
  app.post("/questions", createQuestion);
  app.get("/questions/:number/:level", getQuestion);
};
