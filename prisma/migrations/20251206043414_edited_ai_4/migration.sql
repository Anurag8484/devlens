/*
  Warnings:

  - You are about to drop the column `casue` on the `Issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "casue",
ADD COLUMN     "cause" TEXT;
