import dotenv from "dotenv";
dotenv.config();
import env from "./utils/validateEnv";
import express, { Request, Response, Express } from "express";
import connectToMongoDB from "./db/connection";

import cors from "cors";
const app: Express = express();
const port: number | string = env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Node.js Express Server!");
});

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on port ${port}`);
});
