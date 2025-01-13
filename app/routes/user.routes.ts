import { Router } from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

export const userRouter = (app: Router) => {
  app.post("/users", createUser);
  app.get("/users/:name", getUser);
  app.put("/users/:name", updateUser);
  app.delete("/users/:name", deleteUser);
};
