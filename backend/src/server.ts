import dotenv from "dotenv";
dotenv.config();
import env from "./utils/validateEnv";
import express, { Request, Response, Express } from "express";
import connectToMongoDB from "./db/connection";
const app: Express = express();
const port: number | string = env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Node.js Express Server!");
});

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on port ${port}`);
});
