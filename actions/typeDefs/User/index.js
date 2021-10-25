import { gql } from "apollo-server-core";

export const User = gql`
  type User {
    id: ID
    name: String
    position: String
  }

  input UserInput {
    id: ID
    name: String
    position: String
  }

  type Query {
    hello: String
    greet(name: String): String
    getAllUsers: [User]
  }

  type Mutation {
    createUser(user: UserInput): User
  }
`;
