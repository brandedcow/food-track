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
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { addEvent } from "@/actions/addEvent";
import { useSearchParams } from "next/navigation";
import { addMinutes } from "date-fns";
import { CalendarEventType } from "@prisma/client";
import { DateTimePicker } from "../shared/date-time-picker/container";
import { Textarea } from "../ui/textarea";
import { useCalendarEventsAPI } from "@/fetch-hooks/useCalendarEventsAPI";

const formSchema = z.object({
  title: z.string().min(1),
  timerange: z.object({
    start: z.date(),
    end: z.date(),
  }),
  description: z.string(),
});

interface AddFoodFormProps {}

export const AddFoodForm = ({}: AddFoodFormProps) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === "add-food";

  return (
    <Modal isOpen={isOpen}>
      <AddFoodFormContent />
    </Modal>
  );
};

const AddFoodFormContent = () => {
  const { fetchCalendarEvents } = useCalendarEventsAPI();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      timerange: {
        start: new Date(),
        end: addMinutes(new Date(), 60),
      },
      description: "",
    },
  });

  const onSubmit = async ({
    title,
    timerange: { start, end },
    description,
  }: z.infer<typeof formSchema>) => {
    const data = {
      title,
      start,
      end,
      description,
      type: CalendarEventType.Food,
    };
    await addEvent(data);
    await fetchCalendarEvents();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Add Food</CardTitle>
            <CardDescription>
              Use notes to keep track of nutritional information or other
              important details.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-2">
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
            <FormField
              control={form.control}
              name="timerange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <DateTimePicker {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add additional information."
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
