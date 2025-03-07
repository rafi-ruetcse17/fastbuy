const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return user;
    },
    getUserProducts: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const products = await prisma.product.findMany({
        where: {
          ownerId: user.id,
        },
      });
      return products;
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

    deleteProduct: async (_, { productId }, { user }) => {
      if (!user) {
        return { statusCode: 401, message: "Not authenticated" };
      }
      try {
        const product = await prisma.product.findUnique({
          where: { id: productId },
        });

        if (!product) {
          return { statusCode: 404, message: "Product not found" };
        }
        if (product.ownerId != user.id) {
          return { statusCode: 403, message: "Unauthorized" };
        }

        await prisma.product.delete({ where: { id: productId } });

        return { statusCode: 200, message: "Product deleted successfully" };
      } catch (error) {
        return { statusCode: 500, message: error.message };
      }
    },
  },
};

module.exports = resolvers;
