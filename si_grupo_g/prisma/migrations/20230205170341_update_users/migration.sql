/*
  Warnings:

  - Added the required column `isAnual` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "isAnual" BOOLEAN NOT NULL,
ADD COLUMN     "nextPayDay" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '7 day',
ADD COLUMN     "plan" TEXT NOT NULL;
