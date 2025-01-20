import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();


console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('hash:', process.env.hash);

export const mongourl = process.env.MONGO_URI || "";
console.log('MongoDB URI:', mongourl);

export const JWT_SECRET = process.env.JWT_SECRET || "";
export const hash = process.env.hash || "";
