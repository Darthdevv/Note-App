import mongoose from "mongoose";
import env from '../utils/validateEnv'

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(env.MONGO_DB_URI);
    console.log("Connected to mongodb successfully ✅");
  } catch (error) {
    console.log("falied to connect to mongodb 💥", error);
  }
};

export default connectToMongoDB;
