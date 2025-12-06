import prisma from "@/db/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = parseInt(session?.user.id);

  try {
    const userIssues = await prisma.userIssue.findMany({
      where: {
        userId,
      },
      include: {
        issue: true,
      },
    });

    if (!userIssues) {
      throw new Error("No issues found");
    }

    return NextResponse.json(
      {
        userIssues: userIssues,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong ~ UserIssues fetching",
      },
      { status: 500 }
    );
  }
}
