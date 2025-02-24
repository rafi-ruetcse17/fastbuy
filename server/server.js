require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 4000;
const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000/";

const typeDefs = require('./gql/schema')
const resolvers = require("./gql/resolver");
const { getUserFromToken } = require("./middlewares/userToken");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const user = await getUserFromToken(token.replace("Bearer ", ""));
    return { user };
  },
});

async function startServer() {
  await server.start();

  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready server at ${SERVER_URL}/graphql`);
  });
}

startServer();
