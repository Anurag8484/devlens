/*
  Warnings:

  - You are about to drop the `UserRepo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRepo" DROP CONSTRAINT "UserRepo_repoId_fkey";

-- DropForeignKey
ALTER TABLE "UserRepo" DROP CONSTRAINT "UserRepo_userId_fkey";

-- DropTable
DROP TABLE "UserRepo";

-- CreateTable
CREATE TABLE "_UserRepos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserRepos_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserRepos_B_index" ON "_UserRepos"("B");

-- AddForeignKey
ALTER TABLE "_UserRepos" ADD CONSTRAINT "_UserRepos_A_fkey" FOREIGN KEY ("A") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRepos" ADD CONSTRAINT "_UserRepos_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
