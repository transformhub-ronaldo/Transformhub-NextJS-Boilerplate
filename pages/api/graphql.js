import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { schema } from "../../actions";

const cors = Cors();

const apolloServer = new ApolloServer({
  schema,
});

await apolloServer.start();

export default cors((req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  return apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
