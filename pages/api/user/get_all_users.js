import { connectToDatabase } from "../../../utils/mogodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(400).send("GET method only");
    return;
  }

  const { db } = await connectToDatabase();

  try {
    const data = await db
      .collection("Transformhub-collection")
      .find({})
      .limit(100)
      .toArray();
    res.status(200).json({
      meta: {
        status: 200,
      },
      data,
    });
  } catch (error) {
    console.log(error);
  }
}
