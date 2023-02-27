-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "nextPayDay" SET DEFAULT NOW() + interval '7 day';
