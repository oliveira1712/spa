/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `NewsLetters` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NewsLetters" DROP COLUMN "updatedAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);
