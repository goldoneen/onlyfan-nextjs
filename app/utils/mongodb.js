import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/your-db-name";
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  // fallback for local dev, but you should set MONGODB_URI in .env.local
  console.warn("Using default local MongoDB URI. Set MONGODB_URI in your .env.local for production.");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;