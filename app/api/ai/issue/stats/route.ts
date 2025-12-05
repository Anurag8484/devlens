import prisma from "@/db/prisma";
import { openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);

  const prompt = `
        You are a concise assistant. Input is a GitHub issue. Produce JSON only with keys:

        summary  -> max 40 words
        difficulty -> easy | medium | hard
        labels -> array of up to 4 simple labels (one or two words)
        recommended -> your recommended approach in 2–4 sentences

        Return JSON only. No prose.

        ISSUE_TITLE:
        ${data.issue?.title}

        ISSUE_BODY:
        ${data.issue?.body}

        ISSUE_CreatedAt:
        ${data.issue?.createdAt}
        ISSUE_Labels:
        ${data.issue?.labels}

        ISSUE_Comments:
        ${data.issue?.comments}
        `;

  try {
    const issue = await prisma.issue.findFirst({
      where: {
        githubId: data.number,
      },
    });

    if (issue) {
      console.log(issue);
      return NextResponse.json({
        issue: issue,
      });
    }
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    console.log(completion.choices[0].message);
    const response = completion.choices[0].message;
    return NextResponse.json(
      {
        issue: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
