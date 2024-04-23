import Link from "next/link";
import { Button } from "../ui/button";

export const AddNoteButton = () => (
  <Button variant="outline" size="lg" asChild>
    <Link href={{ pathname: "dashboard", query: { modal: "add-note" } }}>
      Add Note
    </Link>
  </Button>
);
