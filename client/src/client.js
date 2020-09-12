import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";

export default (data) => {
  const httpLink = createHttpLink({
    headers: {
      "Content-Type": "application/graphql",
    },
    uri: data.uri,
  });
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};
