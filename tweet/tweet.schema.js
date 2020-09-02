const { gql } = require("apollo-server-lambda");

exports.typeDefs = gql`
  type Query {
    library: [Book]
  }
  type Book @key(fields: "id") {
    id: ID!
    title: String
    author: String
    stock: Stock
  }
  extend type Stock @key(fields: "bookId") {
    bookId: ID! @external
  }
`;
