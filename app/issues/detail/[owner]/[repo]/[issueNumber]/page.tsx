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
import { useEffect } from "react";
import axios from "axios";

export default function IssueDetail({params}:{params:{owner:string, repo:string, issueNumber: string}}) {
  const router = useRouter();

  useEffect(()=>{
    const fetchIssue = async()=>{
        const paramData = await params;
        const {owner, repo, issueNumber} = paramData;
        try {
            const res = await axios.get(
              `https://api.github.com/repos/${owner}/${decodeURIComponent(repo)}/issues/${issueNumber}`
            );
            console.log("asbdjhabsjhdbaskhbdkhasdbkhbasjbdkjsbda")
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    };

    fetchIssue();
  },[])

  // Mock issue data - replace with real data later
  const issue = {
    id:  "1",
    title: "Bug: Application crashes on startup",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## Steps to Reproduce
1. Launch the application
2. Click on the settings menu
3. Observe the crash

## Expected Behavior
The application should remain stable and display the settings menu.

## Actual Behavior
The application crashes immediately after clicking the settings menu.

## Environment
- OS: Windows 11
- Version: 2.3.1
- Browser: Chrome 120`,
    status: "open",
    createdAt: "2024-01-15",
    repoName: "awesome-project",
    repoOwner: "johndoe",
    labels: ["bug", "high-priority", "needs-investigation"],
    comments: 8,
  };

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
                      {issue.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">
                        {issue.repoOwner}/{issue.repoName}
                      </span>
                      <span>•</span>
                      <span>#{issue.id}</span>
                    </CardDescription>
                  </div>
                  <Badge
                    variant={issue.status === "open" ? "default" : "secondary"}
                    className="shrink-0"
                  >
                    {issue.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created {issue.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{issue.comments} comments</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {issue.labels.map((label) => (
                    <Badge key={label} variant="outline">
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground">
                  {issue.description}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <Button variant="outline" className="hover-scale" asChild>
                  <a
                    href={`https://github.com/${issue.repoOwner}/${issue.repoName}/issues/${issue.id}`}
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
