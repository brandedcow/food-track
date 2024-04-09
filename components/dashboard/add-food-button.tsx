import { Button } from "../ui/button";

export const AddFoodButton = () => {
  const handleClick = async () => {
    console.log("click");
  };

  return (
    <Button size="lg" onClick={handleClick}>
      Add Food
    </Button>
  );
};
