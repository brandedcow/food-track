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
import { add, addMinutes, format } from "date-fns";
import { CalendarEventType } from "@prisma/client";
import { fetchEventCalendarData } from "@/lib/fetch-calls";
import useCalendarEvents from "@/store/useCalendarEvents";
import { DateTimePicker } from "../shared/date-time-picker/container";

const formSchema = z.object({
  title: z.string().min(2),
  timerange: z.object({
    start: z.date(),
    end: z.date(),
  }),
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
  const { setCalendarEvents } = useCalendarEvents();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      timerange: {
        start: new Date(),
        end: addMinutes(new Date(), 30),
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const {
      title,
      timerange: { start, end },
    } = values;

    const data = {
      title,
      start,
      end,
      type: CalendarEventType.Food,
    };

    await addEvent(data);

    const { success, data: events } = await fetchEventCalendarData(start, end);
    if (success && data) {
      setCalendarEvents(events);
    }
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
