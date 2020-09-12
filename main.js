const { ApolloServer } = require("apollo-server-lambda");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "user", url: "http://localhost:4001/dev/graphql/user" },
    { name: "tweet", url: "http://localhost:4002/dev/graphql/tweet" },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  introspection: true,
  playground: { endpoint: "/dev/graphql" },
  context: (receivedContext) => ({
    ...receivedContext,
  }),
});

exports.handler = async (event, context, callback) => {
  try {
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
  } catch (err) {
    console.error(err);
  }
};
