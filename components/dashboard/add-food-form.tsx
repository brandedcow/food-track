import Link from "next/link";
import { Modal } from "../shared/modal";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface AddFoodFormProps {
  isOpen?: boolean;
}

export const AddFoodForm = ({ isOpen }: AddFoodFormProps) => {
  return isOpen ? (
    <Modal>
      <AddFoodFormContent />
    </Modal>
  ) : null;
};

const AddFoodFormContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Food</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Cancel</Link>
        </Button>
        <Button>Track</Button>
      </CardFooter>
    </Card>
  );
};
