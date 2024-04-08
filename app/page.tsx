import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div>Food Track</div>
      <LoginButton>Login</LoginButton>
    </main>
  );
}
