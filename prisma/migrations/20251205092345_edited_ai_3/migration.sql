/*
  Warnings:

  - You are about to drop the column `difficultu` on the `Issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "difficultu",
ADD COLUMN     "difficulty" TEXT;
