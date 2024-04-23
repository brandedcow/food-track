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
import { useSearchParams } from "next/navigation";
import { add } from "date-fns";
import { CalendarEventType } from "@prisma/client";
import { Textarea } from "../ui/textarea";
import { DateTimePicker } from "../shared/date-time-picker/container";
import useSelectedDateRange from "@/store/useSelectedDateRange";
import useCalendarEvents from "@/store/useCalendarEvents";
import { fetchEventCalendarData } from "@/lib/fetch-calls";

const formSchema = z.object({
  description: z.string(),
  timerange: z.object({
    start: z.date(),
    end: z.date(),
  }),
});

interface AddStoolFormProps {}

export const AddStoolForm = ({}: AddStoolFormProps) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === "add-stool";

  return (
    <Modal isOpen={isOpen}>
      <AddStoolFormContent />
    </Modal>
  );
};

const AddStoolFormContent = () => {
  const { setCalendarEvents } = useCalendarEvents();
  const { selectedDateRange } = useSelectedDateRange();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      timerange: {
        start: new Date(),
        end: add(new Date(), { minutes: 15 }),
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const {
      timerange: { start, end },
      description,
    } = values;

    const data = {
      description,
      start,
      end,
      type: CalendarEventType.Stool,
    };

    addEvent(data);

    const { success, data: events } = await fetchEventCalendarData(
      selectedDateRange.from,
      selectedDateRange.to
    );
    if (success && data) {
      setCalendarEvents(events);
    }
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
          <CardContent className="flex flex-col gap-y-2">
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
