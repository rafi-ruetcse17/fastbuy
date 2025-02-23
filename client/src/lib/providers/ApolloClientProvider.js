"use client";

import { ApolloProvider } from "@apollo/client";
import client from "../gql/apolloClient";

const ApolloClientProvider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
