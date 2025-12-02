'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, GitBranch, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import Showdown from "showdown";
import axios from "axios";
import { Issue } from "@/app/issues/[name]/page";

export default function IssueDetail({params}:{params:{owner:string, repo:string, issueNumber: string}}) {
  const router = useRouter();
  const [issue, setIssue] = useState<Issue>();

const converter = new Showdown.Converter({
  tables: true,
  ghCompatibleHeaderId: true,
  ghCodeBlocks: true,
  strikethrough: true,
  tasklists: true,
  simpleLineBreaks: true,
  emoji: true,
  simplifiedAutoLink: true,
  openLinksInNewWindow: true,
  metadata: true,
});
converter.setFlavor("github");

  
  
  useEffect(()=>{
    const fetchIssue = async()=>{
      const paramData = await params;
      const owner = paramData.owner;
      const repo = paramData.repo;
      const issueNumber = paramData.issueNumber
      try {
        const res = await axios.get(
          `https://api.github.com/repos/${owner}/${decodeURIComponent(repo)}/issues/${issueNumber}`
        );
        const markdownHTML = converter.makeHtml(res.data.body);

        setIssue({
          ...res.data,
          owner,
          name: repo,
          number: issueNumber,
          htmlBody: markdownHTML,
        });
      } catch (error) {
        console.log(error)
      }
    };
    
    fetchIssue();
  },[])
  if (!issue) return <div className="p-8">Loading issue...</div>;
  console.log("99899=-----")
  console.log(issue?.body)

  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Button
            variant="ghost"
            className="mb-6 hover-scale"
            onClick={() => router.push("/issues")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Issues
          </Button>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-2xl mb-2">
                      {issue?.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">
                        {issue?.owner}/{issue?.name}
                      </span>
                      <span>•</span>
                      <span>#{issue?.number}</span>
                    </CardDescription>
                  </div>
                  <Badge
                    variant={issue?.state === "open" ? "default" : "secondary"}
                    className="shrink-0"
                  >
                    {issue?.state}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created {issue?.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{issue?.comments} comments</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {issue?.labels
                    .map((l: any) => l.name)
                    .map((label) => (
                      <Badge key={label} variant="outline">
                        {label}
                      </Badge>
                    ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm dark:prose-invert max-w-none mt-6"
                dangerouslySetInnerHTML={{ __html: issue.htmlBody }}
              />

              <div className="mt-8 pt-6 border-t">
                <Button variant="outline" className="hover-scale" asChild>
                  <a
                    href={`https://github.com/${issue?.owner}/${issue?.name}/issues/${issue?.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitBranch className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
