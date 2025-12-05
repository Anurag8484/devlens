/*
  Warnings:

  - You are about to drop the column `aiDifficulty` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `aiLabels` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `aiSummary` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `aiUpdatedAt` on the `Issue` table. All the data in the column will be lost.
  - The `labels` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `aiApproach` on the `UserIssue` table. All the data in the column will be lost.
  - You are about to drop the column `aiRecommendation` on the `UserIssue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "aiDifficulty",
DROP COLUMN "aiLabels",
DROP COLUMN "aiSummary",
DROP COLUMN "aiUpdatedAt",
ADD COLUMN     "ailabels" TEXT[],
ADD COLUMN     "difficultu" TEXT,
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
DROP COLUMN "labels",
ADD COLUMN     "labels" TEXT[];

-- AlterTable
ALTER TABLE "UserIssue" DROP COLUMN "aiApproach",
DROP COLUMN "aiRecommendation",
ADD COLUMN     "approach" TEXT,
ADD COLUMN     "recommendation" TEXT;
