-- CreateEnum
CREATE TYPE "CalendarEventType" AS ENUM ('Food', 'Stool', 'Note');

-- AlterTable
ALTER TABLE "CalendarEvent" ADD COLUMN     "type" "CalendarEventType" NOT NULL DEFAULT 'Food';
