const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserFromToken = async (token) => {
  if (!token) return null;
  try {
    const userFromToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: userFromToken.id },
      select: { id: true, name: true, email: true },
    });
    return user;
  } catch (error) {
    return null;
  }
};

module.exports = { getUserFromToken };
