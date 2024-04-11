import { LogoutButton } from "../auth/logout-button";
import { Breadcrumb, BreadcrumbLink, BreadcrumbList } from "../ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { auth } from "@/auth";
import Image from "next/image";

export const Header = async ({}) => {
  const session = await auth();
  const initials = session?.user?.name?.charAt(0).toUpperCase();

  return (
    <div className="flex justify-between items-center px-6 py-4 gap-x-4 border border-b-slate-700">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbLink href="/" className="text-2xl">
            Food Track
          </BreadcrumbLink>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex gap-x-4">
        <Avatar>
          <Image
            src={session?.user?.image ?? ""}
            width={50}
            height={50}
            alt="profile picture"
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <LogoutButton />
      </div>
    </div>
  );
};
