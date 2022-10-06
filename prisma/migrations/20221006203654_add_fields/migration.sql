-- CreateTable
CREATE TABLE "buildDailyOccurrence" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "buildDailyPartId" INTEGER NOT NULL,

    CONSTRAINT "buildDailyOccurrence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "buildDailyPartId" INTEGER NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "buildDailyOccurrence" ADD CONSTRAINT "buildDailyOccurrence_buildDailyPartId_fkey" FOREIGN KEY ("buildDailyPartId") REFERENCES "buildDailyPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_buildDailyPartId_fkey" FOREIGN KEY ("buildDailyPartId") REFERENCES "buildDailyPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
