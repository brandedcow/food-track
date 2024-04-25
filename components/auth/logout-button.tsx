"use client";

import { signOut } from "next-auth/react";
import { Button, ButtonProps } from "../ui/button";

export const LogoutButton = ({ ...props }: ButtonProps) => {
  const handleClick = () => {
    signOut();
  };

  return (
    <Button onClick={handleClick} {...props}>
      Log Out
    </Button>
  );
};
