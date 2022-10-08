/*
  Warnings:

  - You are about to drop the `equipiment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "equipiment" DROP CONSTRAINT "equipiment_buildDailyPartId_fkey";

-- DropTable
DROP TABLE "equipiment";

-- CreateTable
CREATE TABLE "equipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "buildDailyPartId" INTEGER NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_buildDailyPartId_fkey" FOREIGN KEY ("buildDailyPartId") REFERENCES "buildDailyPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
