import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

interface MongooseConnection {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = { connection: null, promise: null };
}

export async function connectToDatabase() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  if (cached.connection) {
    return cached.connection;
  }

  cached.promise = cached.promise || mongoose.connect(MONGO_URI);
  cached.connection = await cached.promise;

  return cached.connection;
}
