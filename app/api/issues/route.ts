import prisma from "@/db/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse){
    const data = await req.json();

    try {
        const res = await axios.get(
          `https://api.github.com/repos/${data.owner}/${data.repo}/issues`
        );
        console.log(res.data);
        const issues = res.data;

        // await prisma.issue.create({
        //     data:{

        //     }
        // })
        return NextResponse.json({
            issues:res.data
        },{status:200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"Internal server error"
        });
    }

}