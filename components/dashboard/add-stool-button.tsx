import { Button } from "../ui/button";

export const AddStoolButton = () => {
  const handleClick = async () => {
    console.log("click");
  };

  return (
    <Button variant="secondary" size="lg" onClick={handleClick}>
      Add Stool
    </Button>
  );
};
