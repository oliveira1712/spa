/*
  Warnings:

  - A unique constraint covering the columns `[idTOConline]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idTOConline` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "idTOConline" TEXT NOT NULL,
ALTER COLUMN "nextPayDay" SET DEFAULT NOW() + interval '7 day';

-- CreateIndex
CREATE UNIQUE INDEX "Users_idTOConline_key" ON "Users"("idTOConline");
