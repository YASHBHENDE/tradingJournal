import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
export const mongourl = process.env.MONGO_URI || ""



