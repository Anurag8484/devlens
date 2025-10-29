import prisma from "@/db/prisma";
import { AddRepoSchema } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedData = AddRepoSchema.safeParse(req.body);

  if (!parsedData.success) {
    return NextResponse.json(
      {
        message: parsedData.error.issues[0].message,
      },
      { status: 401 }
    );
  }
  try {
    await prisma.repository.create({
      data: {
        githubUrl: parsedData.data.githubUrl,
        owner: parsedData.data.owner,
        type: parsedData.data.type,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
