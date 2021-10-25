import { MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB } = process.env;

if (!MONGODB_URI || !MONGODB) {
  throw new Error("Please setup your environment variables");
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then(
      async (client) => {
        try {
          await client.connect();
          await client.db(MONGODB).command({ ping: 1 });
          console.log("Connected to database");
          return {
            client,
            db: client.db(MONGODB),
          };
        } catch (error) {
          console.log("Not connected to database");
        }
      }
    );
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
