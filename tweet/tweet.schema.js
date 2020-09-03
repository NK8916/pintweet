const { gql } = require("apollo-server-lambda");

exports.typeDefs = gql`
  type Data {
    S: String
  }
  type User {
    username: Data
    timestamp: Data
    tweet: Data
  }

  type Query {
    getTweet(username: String): [User]
  }
`;
