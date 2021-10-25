import { connectToDatabase } from "../../../utils/mogodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("POST method only");
    return;
  }

  const { name, position } = req.body;
  const { db } = await connectToDatabase();

  if (!name && !position) {
    res.status(400).json({ message: "Fields cannot be blank" });
    return;
  }

  try {
    const data = await db
      .collection("Transformhub-collection")
      .insertOne({ name, position });
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
