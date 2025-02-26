import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation SubmitProduct(
    $title: String!
    $description: String!
    $category: String!
    $status: String!
    $purchasePrice: Float!
    $rentPrice: Float!
    $rentalPeriod: String!
  ) {
    addProduct(
      title: $title
      description: $description
      status: $status
      category: $category
      purchasePrice: $purchasePrice
      rentPrice: $rentPrice
      rentPeriod: $rentalPeriod
    ) {
      id
      title
      description
      status
      category
      purchasePrice
      rentPrice
      rentPeriod
    }
  }
`;

export const GET_USER_PRODUCTS = gql`
  query GetUserProducts {
    getUserProducts {
      id
      title
      description
      purchasePrice
      createdAt
      rentPrice
      rentPeriod
      category
    }
  }
`;
