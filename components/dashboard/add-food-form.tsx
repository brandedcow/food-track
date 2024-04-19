"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "../shared/modal";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { addEvent } from "@/actions/addEvent";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { add } from "date-fns";
import { CalendarEventType } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(2),
});

interface AddFoodFormProps {}

export const AddFoodForm = ({}: AddFoodFormProps) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === "add-food";

  return isOpen ? (
    <Modal>
      <AddFoodFormContent />
    </Modal>
  ) : null;
};

const AddFoodFormContent = () => {
  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const start = new Date();
    const end = add(start, { hours: 1 });
    const data = {
      title: values.title,
      start,
      end,
      type: CalendarEventType.Food,
    };

    addEvent(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Add Food</CardTitle>
            <CardDescription>
              Time will be added automatically when food item is added.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button type="submit">Track</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
