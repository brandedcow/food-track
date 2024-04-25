import { Header } from "@/components/shared/header";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <div className="w-svw h-svh flex flex-col overflow-hidden">
        <Header />
        <div className="flex h-full overflow-hidden">{children}</div>
      </div>
    </SessionProvider>
  );
}
