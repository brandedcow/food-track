-- AlterTable
ALTER TABLE "CalendarEvent" ADD COLUMN     "description" TEXT,
ALTER COLUMN "title" DROP NOT NULL;
