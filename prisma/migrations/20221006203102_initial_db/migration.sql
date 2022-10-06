-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dailyPart" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,
    "buildId" INTEGER NOT NULL,
    "climate" TEXT NOT NULL,
    "numberDays" INTEGER NOT NULL,
    "remainingDays" INTEGER NOT NULL,
    "supply" TEXT NOT NULL,
    "contractor" TEXT NOT NULL,
    "hired" TEXT NOT NULL,

    CONSTRAINT "dailyPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "occurrences" (
    "id" SERIAL NOT NULL,
    "timeInit" TIMESTAMP(3) NOT NULL,
    "timeEnd" TIMESTAMP(3) NOT NULL,
    "item" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dailyPartId" INTEGER NOT NULL,

    CONSTRAINT "occurrences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buildDailyPart" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,
    "buildId" INTEGER NOT NULL,
    "climate" TEXT NOT NULL,
    "numberDays" INTEGER NOT NULL,
    "remainingDays" INTEGER NOT NULL,
    "supply" TEXT NOT NULL,
    "contractor" TEXT NOT NULL,
    "hired" TEXT NOT NULL,

    CONSTRAINT "buildDailyPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "build" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "build_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "effective" (
    "id" SERIAL NOT NULL,
    "buildDailyPartId" INTEGER NOT NULL,

    CONSTRAINT "effective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "effectiveId" INTEGER NOT NULL,

    CONSTRAINT "mod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moi" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "effectiveId" INTEGER NOT NULL,

    CONSTRAINT "moi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipiment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "buildDailyPartId" INTEGER NOT NULL,

    CONSTRAINT "equipiment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dailyPart" ADD CONSTRAINT "dailyPart_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dailyPart" ADD CONSTRAINT "dailyPart_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "build"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occurrences" ADD CONSTRAINT "occurrences_dailyPartId_fkey" FOREIGN KEY ("dailyPartId") REFERENCES "dailyPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buildDailyPart" ADD CONSTRAINT "buildDailyPart_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buildDailyPart" ADD CONSTRAINT "buildDailyPart_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "build"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "effective" ADD CONSTRAINT "effective_buildDailyPartId_fkey" FOREIGN KEY ("buildDailyPartId") REFERENCES "buildDailyPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mod" ADD CONSTRAINT "mod_effectiveId_fkey" FOREIGN KEY ("effectiveId") REFERENCES "effective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moi" ADD CONSTRAINT "moi_effectiveId_fkey" FOREIGN KEY ("effectiveId") REFERENCES "effective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipiment" ADD CONSTRAINT "equipiment_buildDailyPartId_fkey" FOREIGN KEY ("buildDailyPartId") REFERENCES "buildDailyPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
