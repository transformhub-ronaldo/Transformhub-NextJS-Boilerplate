import { connectToDatabase } from "../../../utils/mogodb";

const collection = "Transformhub-collection";

export const UserResolver = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    greet: (_, { name }) => {
      return `Hello ${name}`;
    },
    getAllUsers: async () => {
      const { db } = await connectToDatabase();
      return await db.collection(collection).find({}).limit(100).toArray();
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const { name, position } = args.user;
      const { db } = await connectToDatabase();
      await db
        .collection(collection)
        .insertOne({ name, position }, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            return result;
          }
        });
    },
  },
};
