import { prisma } from "@/lib/db";

export const getUserCount = async () => {
  try {
    return await prisma.user.count();
  } catch (error) {
    console.log({ error });
  }
};
