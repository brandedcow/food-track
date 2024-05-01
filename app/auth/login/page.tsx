"use client";

import SocialButtons from "@/components/auth/social-buttons";

export default function LoginPage() {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-y-10">
      <div className="text-xl font-bold">Food Track</div>
      <SocialButtons />
    </div>
  );
}
