import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/login");

  return null;
  // <main className="flex min-h-screen flex-col items-center justify-center gap-y-6">
  //   <div className="text-xl font-bold">Food Track</div>
  //   <LoginButton>Enter</LoginButton>
  // </main>
}
