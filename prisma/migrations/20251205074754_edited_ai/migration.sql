/*
  Warnings:

  - You are about to drop the column `approach` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `recommended` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the `_UserRepos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserRepos" DROP CONSTRAINT "_UserRepos_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserRepos" DROP CONSTRAINT "_UserRepos_B_fkey";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "approach",
DROP COLUMN "description",
DROP COLUMN "label",
DROP COLUMN "recommended",
ADD COLUMN     "aiDifficulty" TEXT,
ADD COLUMN     "aiLabels" TEXT[],
ADD COLUMN     "aiSummary" TEXT,
ADD COLUMN     "aiUpdatedAt" TIMESTAMP(3),
ADD COLUMN     "body" TEXT,
ADD COLUMN     "githubId" INTEGER,
ADD COLUMN     "labels" JSONB,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "_UserRepos";

-- CreateTable
CREATE TABLE "UserRepo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "repoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRepo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserIssue" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "issueId" INTEGER NOT NULL,
    "aiApproach" TEXT,
    "aiRecommendation" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserIssue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRepo_userId_repoId_key" ON "UserRepo"("userId", "repoId");

-- CreateIndex
CREATE UNIQUE INDEX "UserIssue_userId_issueId_key" ON "UserIssue"("userId", "issueId");

-- AddForeignKey
ALTER TABLE "UserRepo" ADD CONSTRAINT "UserRepo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRepo" ADD CONSTRAINT "UserRepo_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIssue" ADD CONSTRAINT "UserIssue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIssue" ADD CONSTRAINT "UserIssue_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
