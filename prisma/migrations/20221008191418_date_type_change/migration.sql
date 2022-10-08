-- AlterTable
ALTER TABLE "buildDailyPart" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "dailyPart" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "occurrences" ALTER COLUMN "timeInit" SET DATA TYPE TEXT,
ALTER COLUMN "timeEnd" SET DATA TYPE TEXT;
