import { login } from "@/actions/login";

export default function Home() {
  const handleSubmit = async () => {
    "use server";
    await login();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={handleSubmit}>
        <div>Get User Count</div>

        <button type="submit">Go</button>
      </form>
    </main>
  );
}
