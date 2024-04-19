import Link from "next/link";
import { Button } from "../ui/button";

export const AddStoolButton = () => (
  <Button variant="secondary" size="lg" asChild>
    <Link href={{ pathname: "dashboard", query: { modal: "add-stool" } }}>
      Add Stool
    </Link>
  </Button>
);
