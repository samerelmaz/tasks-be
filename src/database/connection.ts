import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDatabase = async (): Promise<void> => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
