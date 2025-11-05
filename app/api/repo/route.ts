import prisma from "@/db/prisma";
import { AddRepoSchema } from "@/lib/types";
import { parseUrl } from "@/lib/utils/parseUrl";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const repos = await prisma.repository.findMany();
    return NextResponse.json(
      {
        repos: repos,
      },
      { status: 200 }
    );
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

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedData = AddRepoSchema.safeParse(data);
  const githubUrl =  parsedData.data?.githubUrl ?? "";
  const urlParsed = parseUrl(githubUrl);
  console.log("asdasdasd",urlParsed)
  if(!urlParsed.owner || !urlParsed.repo){
    return NextResponse.json({
      message:"Invalid Github Url"
    }, {status:500})
  }
  const name = urlParsed.repo;
  const owner = urlParsed.owner ??""
  
  console.log(name)
  console.log(owner)

    console.log("Check 1");
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
        owner: owner,
        type: parsedData.data.type,
        name:name
      },
    });
    return NextResponse.json({
      message: "Repo Added"
    },{status:201});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error fron route",
      },
      { status: 500 }
    );
  }
}
