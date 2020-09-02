const { gql } = require("apollo-server-lambda");

exports.typeDefs = gql`
  type Tweet{
    id:ID!
    text:String!
  }
  type User{
    id:ID!
    username:String!
    tweet:[Tweet]
  }
  type Mutation{
    saveTweet(User):Object!
  }
  type Query {
    stock: [Stock]
  }
  type Stock @key(fields: "bookId") {
    bookId: ID!
    price: Float!
    inStock: Int!
  }
`;
