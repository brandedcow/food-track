import { Header } from "@/components/shared/header";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <div className="flex flex-col h-screen">
        <Header />
        {children}
      </div>
    </SessionProvider>
  );
}
