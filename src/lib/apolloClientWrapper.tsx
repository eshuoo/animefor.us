"use client";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://graphql.anilist.co",
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

type ApolloClientWrapperProps = {
  children: React.ReactNode;
};

const ApolloClientWrapper: React.FC<ApolloClientWrapperProps> = ({
  children,
}) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloClientWrapper;
