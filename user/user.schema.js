const { gql } = require("apollo-server-lambda");

exports.typeDefs = gql`
  type User {
    id: ID!
    username: String
    tweet: String
  }

  type Mutation {
    saveTweet(username: String!, tweet: String!): User
  }
`;
