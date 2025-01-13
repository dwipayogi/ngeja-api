import express, { Request, Response } from "express";

import { userRouter } from "./app/routes/user.routes";
import { levelRouter } from "./app/routes/level.routes";
import { questionRouter } from "./app/routes/question.routes";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

userRouter(app);
levelRouter(app);
questionRouter(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
