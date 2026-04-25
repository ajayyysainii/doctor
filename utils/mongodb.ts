import { MongoClient } from "mongodb";

const uri = process.env.DB_URI;

if (!uri) {
  throw new Error("Missing DB_URI in environment variables.");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri);

const clientPromise = global._mongoClientPromise ?? client.connect();

if (!global._mongoClientPromise) {
  global._mongoClientPromise = clientPromise;
}

export default clientPromise;
