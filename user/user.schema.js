const { gql } = require("apollo-server-lambda");

exports.typeDefs = gql`
  type Tweet {
    id: ID!
    text: String
  }
  type User {
    id: ID!
    username: String
    tweet: [Tweet]
  }
  type Mutation {
    saveTweet(username: String, tweet: String): User
  }
`;
