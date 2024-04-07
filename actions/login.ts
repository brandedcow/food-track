"use server";

import { getUserCount } from "@/data/user";

export const login = async () => {
  try {
    const numUsers = await getUserCount();
    console.log({ numUsers });
  } catch (error) {}
};
