"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  const handleClick = () => {
    signOut();
  };

  return <Button onClick={handleClick}>Log Out</Button>;
};
