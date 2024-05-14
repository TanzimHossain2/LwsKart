import mongoose, { Connection } from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
const cached: { connection?: Connection; promise?: Promise<Connection> } = {};

export async function dbConnect(): Promise<Connection> {
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env.local"
    );
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts).then(() => mongoose.connection) as Promise<Connection>;
  }

  try {
    cached.connection = await cached.promise;
    console.log("Connected to MongoDB");
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }

  return cached.connection;
}