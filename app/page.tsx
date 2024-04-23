import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-6">
      <div className="text-xl font-bold">Food Track</div>
      <LoginButton>Enter</LoginButton>
    </main>
  );
}
