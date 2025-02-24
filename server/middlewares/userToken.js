const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserFromToken = async (token) => {
  if (!token) return null;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return await prisma.user.findUnique({ where: { id: user.id } });
  } catch (error) {
    return null;
  }
};

module.exports = { getUserFromToken };
