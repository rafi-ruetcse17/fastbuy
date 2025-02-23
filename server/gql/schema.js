const typeDefs = `
  type User {
    id: Int
    name: String
    email: String
  }

  type Query {
    hello: String
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;

module.exports = typeDefs