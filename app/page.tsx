import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around">
      <div>Food Track</div>
      <LoginButton>Enter</LoginButton>
    </main>
  );
}
