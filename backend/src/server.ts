import express, { Request, Response, Express } from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connection';
dotenv.config();
const app : Express = express();
const port : number | string = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Node.js Express Server!");
})

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on port ${port}`);
})

