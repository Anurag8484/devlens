import prisma from "@/db/prisma";
import { AddRepoSchema } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        const repos = await prisma.repository.findMany();
        return NextResponse.json({
            repos: repos
        },{status:200})
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
