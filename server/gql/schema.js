const typeDefs = `
  type User {
    id: Int!
    name: String!
    email: String!
    token: String!
  }

  type Product {
    id: String!
    title: String!
    description: String!
    status: String!
    category: String!
    owner: User!
    purchasePrice: Float!
    rentPrice: Float!
    rentPeriod: String!
    boughtBy: User
    purchaseDate: String
    borrowedBy: User
    rentDate: String
    createdAt: String!
  }

  type Response {
    statusCode: Int
    message: String
  }

  type Query {
    me: User
    getUserProducts: [Product!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String! ): User
    loginUser(email: String!, password: String!): User
    addProduct(
      title: String!
      description: String!
      status: String!
      category: String!
      purchasePrice: Float!
      rentPrice: Float!
      rentPeriod: String!
    ): Product
    deleteProduct(productId: String!): Response
  }
`;

module.exports = typeDefs;
