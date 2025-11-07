import prisma from "@/db/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const repos = await prisma.repository.findMany();
        const issueRequests = repos.map(async (repo) => {
          try {
            const res = await axios.get(
              `https://api.github.com/repos/${repo.owner}/${repo.name}/issues`
            );
      
            return{
              repoId: repo.id,
              name:repo.name,
              owner: repo.owner,
              issues: res.data
            }
          } catch (error) {
            console.log(error);
            return null;
          }
        });
      
        const results = await Promise.all(issueRequests);
      
        const validResults = results.filter(Boolean);

        return NextResponse.json({
            data: validResults
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"Internal server error"
        },{status:500});
    };

}
