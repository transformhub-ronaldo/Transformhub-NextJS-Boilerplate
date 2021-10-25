// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../utils/mogodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  // const data = await db.collection("transformhub").find({}).limit(1).toArray();
  try {
    await db.command({ ping: 1 });
    res.send("Connected to Database");
  } catch (error) {
    console.log(error);
  }
}
