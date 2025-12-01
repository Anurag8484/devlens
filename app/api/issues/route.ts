import prisma from "@/db/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const repos = await prisma.repository.findMany();
        const issueRequests = repos.map(async (repo) => {
          try {
            const res = await axios.get(
              `https://api.github.com/repos/${repo.owner}/${repo.name}/issues`,{
                headers:{
                  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                  Accept:"application/vnd.github+json"
                }
              }
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

        const filteredIssues = validResults.flatMap((repo) =>
          repo?.issues
            .filter((issue: any) => !issue.pull_request)
            .map((issue: any) => ({
              id: issue.number,
              body: issue.body,
              title: issue.title,
              state: issue.state,
              labels: issue.labels.map((l: any) => l.name),
              comments: issue.comments,
              createdAt: issue.created_at,
              updatedAt: issue.updated_at,
              url: issue.html_url,
              owner: repo.owner,
              name: repo.name
            }))
        );

        return NextResponse.json({
            data: filteredIssues

        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"Internal server error"
        },{status:500});
    };

}


export async function POST(req:NextRequest){
  const data = await req.json();
  const name = data.name;

  try {
    const repo = await prisma.repository.findFirstOrThrow
    ({
      where:{
        name
      }
    });

    if(repo === null){
      return NextResponse.json({
        message: "Repo not found"
      }, {status:402})
    }
     const res = await axios.get(
       `https://api.github.com/repos/${repo.owner}/${repo.name}/issues?per_page=100`,
       {
         headers: {
           Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
           Accept: "application/vnd.github+json",
         },
       }
     );
     const issues = res.data;

     const filteredIssues = issues
       .filter((issue: any) => !issue.pull_request)
       .map((issue: any) => ({
         id: issue.number,
         body: issue.body,
         title: issue.title,
         state: issue.state,
         labels: issue.labels.map((l: any) => l.name),
         comments: issue.comments,
         createdAt: issue.created_at,
         updatedAt: issue.updated_at,
         url: issue.html_url,
         owner: repo.owner,
         name: repo.name,
       }));
     return NextResponse.json({
      filteredIssues
     })


  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "Internal Server Error 3.0"
    }, {status:500})
  }

}