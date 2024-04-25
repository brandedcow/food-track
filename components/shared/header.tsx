"use client";

import { LogoutButton } from "../auth/logout-button";
import { Breadcrumb, BreadcrumbLink, BreadcrumbList } from "../ui/breadcrumb";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DateRangePicker } from "./date-range-picker";

export const Header = ({}) => {
  const session = useSession();
  const initials = session?.data?.user?.name?.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "flex flex-grow-0 justify-between items-center px-4 py-2",
        "tablet:py-3 tablet:px-6 tablet:border tablet:border-b-slate-200"
      )}
    >
      <div className="flex items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink href="/" className={cn("text-xl tablet:text-2xl")}>
              Food Track
            </BreadcrumbLink>
          </BreadcrumbList>
        </Breadcrumb>

        <DateRangePicker />
      </div>

      <Popover>
        <PopoverTrigger>
          <Avatar className={cn("w-9 h-9", "tablet:w-10 tablet:h-10")}>
            <Image
              fill
              src={session?.data?.user?.image ?? ""}
              alt="profile picture"
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <LogoutButton size="lg" />
        </PopoverContent>
      </Popover>
    </div>
  );
};
