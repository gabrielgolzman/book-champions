import { Db, MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

const client = new MongoClient(connectionString);
await client.connect();

export let db: Db = client.db('book_champions');

