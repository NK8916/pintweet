const { ApolloServer, gql } = require("apollo-server-lambda");
const { buildFederatedSchema } = require("@apollo/federation");
const { typeDefs } = require("./tweet.schema");
const { resolvers } = require("./tweet.resolver");

const server = new ApolloServer({
  playground: { endpoint: "/graphql/tweet" },
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

exports.handler = (event, context, callback) => {
  if (event.httpMethod === "GET") {
    server.createHandler()(
      { ...event, path: event.requestContext.path || event.path },
      context,
      callback
    );
  } else {
    server.createHandler()(event, context, callback);
  }
};
