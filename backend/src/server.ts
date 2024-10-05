import dotenv from "dotenv";
dotenv.config();
import env from "./utils/validateEnv";
import express, { Request, Response, NextFunction, Express } from "express";
import connectToMongoDB from "./db/connection";
import cors from "cors";
import userRouter from "./routes/user.routes";
import noteRouter from "./routes/note.routes";
import { globalErrorHandler, notFound } from "./middlewares/error/error.middleware";

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED EXCEPTION! 💥 shutting down...");
  process.exit(1);
});

const app: Express = express();
const port: number | string = env.PORT || 8000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to add request time
app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Define routes
app.use("/api/notes", noteRouter);
app.use("/api/users", userRouter);

// Error handling
app.use(notFound);
app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Node.js Express Server!");
});

// Connect to MongoDB
connectToMongoDB();
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error(err.name, err.message);
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});