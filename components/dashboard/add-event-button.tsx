import Link from "next/link";
import { Button, ButtonProps } from "../ui/button";
import { Url } from "next/dist/shared/lib/router/router";
import React from "react";

interface AddEventButtonProps extends ButtonProps {
  label: string;
  href: Url;
  icon?: React.ReactElement<any>;
}

export const AddEventButton = ({
  label,
  href,
  icon: IconComponent,
  ...props
}: AddEventButtonProps) => (
  <Button asChild {...props} className="flex w-full gap-1 items-center">
    <Link href={href}>
      {IconComponent && React.cloneElement(IconComponent, {})}
      <p>{label}</p>
    </Link>
  </Button>
);
