import { SocialButton } from "@/components/auth/social-button";

export default function LoginPage() {
  return (
    <div className="flex h-screen justify-center items-center gap-x-4">
      <SocialButton provider="google" />
      <SocialButton provider="github" />
    </div>
  );
}
