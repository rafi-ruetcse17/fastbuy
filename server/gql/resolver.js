const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    hello: () => "Hello, Apollo Server!",
    getUsers: async () => await prisma.user.findMany(),
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
    },
  },
};

module.exports = resolvers;
