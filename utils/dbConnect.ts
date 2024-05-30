import mongoose from "mongoose";

type connection = { isConnected?: number };

let connectionState: connection = { isConnected: 0 };

export default async function dbConnect(): Promise<void> {
  if (connectionState.isConnected === 1) {
    console.log("Database is already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connectionState.isConnected = db.connections[0].readyState;
    console.log("Database connection is successfull");
  } catch (error) {
    console.log("Error while connection database", error);
    process.exit(1);
  }
}
