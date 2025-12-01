import prisma from "@/db/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const repoId =  params.id;
    console.log("---------------");
    console.log(repoId);
    const repo = await prisma.repository.findFirst({
      where: {
        id: parseInt(repoId),
      },
    });

    if (repo === null) {
      return NextResponse.json({
        message: "repo not found"
      });
    }
    const res = await axios.get(
      `https://api.github.com/repos/${repo.owner}/${repo.name}/issues`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );
    console.log(res);
    return NextResponse.json({
      issue: res.data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}