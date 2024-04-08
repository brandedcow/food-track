"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export const LoginButton = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const handleClick = async () => {
    router.push("/auth/login");
  };

  return <button onClick={handleClick}>{children}</button>;
};
