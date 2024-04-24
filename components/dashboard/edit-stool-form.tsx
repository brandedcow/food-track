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
import { redirect, useSearchParams } from "next/navigation";
import { CalendarEventType } from "@prisma/client";
import { Textarea } from "../ui/textarea";
import { DateTimePicker } from "../shared/date-time-picker/container";
import { useCalendarEventsAPI } from "@/fetch-hooks/useCalendarEventsAPI";
import useCalendarEvents from "@/store/useCalendarEvents";
import { editEvent } from "@/actions/editEvent";

const formSchema = z.object({
  description: z.string(),
  timerange: z.object({
    start: z.date(),
    end: z.date(),
  }),
});

interface EditStoolFormProps {}

export const EditStoolForm = ({}: EditStoolFormProps) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === "edit-stool";

  return (
    <Modal isOpen={isOpen}>
      <EditStoolFormContent />
    </Modal>
  );
};

const EditStoolFormContent = () => {
  const { fetchCalendarEvents } = useCalendarEventsAPI();
  const { calendarEvents } = useCalendarEvents();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");

  const event = calendarEvents.find((event) => event.id === eventId);

  if (!event) {
    redirect("/dashboard");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: event?.description ?? "",
      timerange: {
        start: new Date(event.start),
        end: new Date(event.end),
      },
    },
  });

  const onSubmit = async ({
    timerange: { start, end },
    description,
  }: z.infer<typeof formSchema>) => {
    if (!eventId) {
      redirect("/dashboard");
    }

    const data = {
      description,
      start,
      end,
      type: CalendarEventType.Stool,
    };
    await editEvent(eventId, data);
    await fetchCalendarEvents();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Stool</CardTitle>
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
