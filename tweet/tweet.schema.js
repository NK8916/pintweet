const { gql } = require("apollo-server-lambda");

exports.typeDefs = gql`
  type Data {
    S: String
  }
  type Tweet {
    id: ID
    username: Data
    timestamp: Data
    tweet: Data
  }

  type Query {
    getTweet(username: String): [Tweet]!
  }
`;
