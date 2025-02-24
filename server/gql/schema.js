const typeDefs = `
  type User {
    id: Int!
    name: String!
    email: String!
    token: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String! ): User
    loginUser(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
