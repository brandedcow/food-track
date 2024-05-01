"use client";

import { signIn } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { Alert, AlertTitle } from "../ui/alert";
import { BiError } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SocialButton } from "./social-button";

export const SocialButtons = () => {
  const [loadingProvider, setLoadingProvider] =
    useState<BuiltInProviderType | null>(null);

  const searchParams = useSearchParams();
  const error =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with another provider"
      : null;

  const handleClick = async (provider: BuiltInProviderType) => {
    setLoadingProvider(provider);
    await signIn(provider);
  };

  // Clear loading state if there is an error
  useEffect(() => {
    if (error) {
      setLoadingProvider(null);
    }
  }, [error]);

  return (
    <>
      <div className="flex gap-x-6">
        <SocialButton
          provider="google"
          onClick={handleClick}
          disabled={!!loadingProvider}
          loading={loadingProvider === "google"}
        />
        <SocialButton
          provider="github"
          onClick={handleClick}
          disabled={!!loadingProvider}
          loading={loadingProvider === "github"}
        />
      </div>
      <div>
        {error && (
          <Alert variant="destructive">
            <BiError />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
      </div>
    </>
  );
};

export default SocialButtons;
