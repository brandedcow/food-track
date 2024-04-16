import Link from "next/link";
import { Button } from "../ui/button";

export const AddFoodButton = () => (
  <Button size="lg" asChild>
    <Link href={{ pathname: "dashboard", query: { modal: "add-food" } }}>
      Add Food
    </Link>
  </Button>
);
