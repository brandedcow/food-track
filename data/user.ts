import { prisma } from "@/lib/db";

export const getUserCount = async () => {
  try {
    return await prisma.user.count();
  } catch (error) {
    console.log({ error });
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    console.log({ error });
  }
};
