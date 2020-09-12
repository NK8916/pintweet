const { ApolloServer, gql } = require("apollo-server-lambda");
const { buildFederatedSchema } = require("@apollo/federation");
const { typeDefs } = require("./user.schema");
const { resolvers } = require("./user.resolver");

const server = new ApolloServer({
  playground: { endpoint: "/graphql/user" },
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

exports.handler = (event, context, callback) => {
  console.log(event.requestContext.path);
  if (event.httpMethod === "GET") {
    server.createHandler({
      cors: {
        origin: "*",
        credentials: true,
      },
    })(
      { ...event, path: event.requestContext.path || event.path },
      context,
      callback
    );
  } else {
    server.createHandler({
      cors: {
        origin: "*",
        credentials: true,
      },
    })(event, context, callback);
  }
};
