import { Button } from "../ui/button";

export const AddNoteButton = () => {
  const handleClick = async () => {
    console.log("click");
  };

  return (
    <Button variant="outline" size="lg" onClick={handleClick}>
      Add Note
    </Button>
  );
};
