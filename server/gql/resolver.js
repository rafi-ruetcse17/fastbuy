const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
    },

    loginUser: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      return { ...user, token };
    },

    addProduct: async (
      _,
      {
        title,
        description,
        status,
        category,
        purchasePrice,
        rentPrice,
        rentPeriod,
      },
      { user }
    ) => {
      if (!user) throw new Error("Not authenticated");
      try {
        const product = await prisma.product.create({
          data: {
            title,
            description,
            status,
            category,
            purchasePrice,
            rentPrice,
            rentPeriod,
            ownerId: user.id,
          },
        });
        return product;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
