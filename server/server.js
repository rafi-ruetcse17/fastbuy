require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000/";

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

const resolvers = {
  Query: {
    hello: () => "Hello, Apollo Server!",
    getUsers: async () => await prisma.user.findMany(),
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      return await prisma.user.create({ data: { name, email } });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();

  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

  app.get("/", async (req, res) => {
    const users = await prisma.user.findMany();
    return res.status(200).json({ success: true, users });
  });

  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready server at ${SERVER_URL}/graphql`);
  });
}

startServer();
