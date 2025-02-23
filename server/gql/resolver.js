const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

module.exports = resolvers