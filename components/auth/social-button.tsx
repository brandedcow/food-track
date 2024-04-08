"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { BuiltInProviderType } from "next-auth/providers";

interface SocialButtonProps {
  provider: BuiltInProviderType;
}

export const SocialButton = ({ provider }: SocialButtonProps) => {
  const handleClick = () => {
    signIn(provider);
  };

  return (
    <Button size="lg" onClick={handleClick}>
      {provider}
    </Button>
  );
};
