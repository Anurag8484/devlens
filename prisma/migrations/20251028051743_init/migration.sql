-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repository" (
    "id" SERIAL NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "repoId" INTEGER NOT NULL,
    "label" TEXT,
    "description" TEXT,
    "approach" TEXT,
    "recommended" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
