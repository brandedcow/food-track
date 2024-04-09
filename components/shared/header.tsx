import { LogoutButton } from "../auth/logout-button";
import { Breadcrumb, BreadcrumbList } from "../ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { auth } from "@/auth";
import Image from "next/image";

export const Header = async ({}) => {
  const session = await auth();
  const initials = session?.user?.name?.charAt(0).toUpperCase();

  return (
    <div className="flex justify-end p-6 gap-x-4">
      {/* <Breadcrumb>
        <BreadcrumbList></BreadcrumbList>
      </Breadcrumb> */}

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
  );
};
