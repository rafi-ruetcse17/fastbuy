"use client";

import { gql, useQuery } from "@apollo/client";

const GET_HELLO = gql`
  query {
    hello
    getUsers {
      name
      id
    }
  }
`;

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <h1>{data.hello}</h1>;
}
