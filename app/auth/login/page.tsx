"use client";

import { SocialButton } from "@/components/auth/social-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";
import { BiError } from "react-icons/bi";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with another provider"
      : null;

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-y-4">
      <div className="flex gap-x-4">
        <SocialButton provider="google" />
        <SocialButton provider="github" />
      </div>
      <div>
        {error && (
          <Alert variant="destructive">
            <BiError />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
      </div>
    </div>
  );
}
