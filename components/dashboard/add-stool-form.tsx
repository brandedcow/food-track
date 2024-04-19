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
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { addEvent } from "@/actions/addEvent";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { add } from "date-fns";
import { CalendarEventType } from "@prisma/client";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  description: z.string().min(2),
});

interface AddStoolFormProps {}

export const AddStoolForm = ({}: AddStoolFormProps) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === "add-stool";

  return isOpen ? (
    <Modal>
      <AddStoolFormContent />
    </Modal>
  ) : null;
};

const AddStoolFormContent = () => {
  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const start = new Date();
    const end = add(start, { minutes: 15 });
    const data = {
      description: values.description,
      start,
      end,
      type: CalendarEventType.Stool,
    };

    addEvent(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Add Stool</CardTitle>
            <CardDescription>
              Take note of things like amount, color, size, and urgency.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Amount: Moderate, Color: Brown, Size: Medium, Urgency: Low"
                      className="resize-none"
                      {...field}
                    />
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
