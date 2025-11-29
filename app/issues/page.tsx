'use client'
// import { RefreshCcw } from "lucide-react"
// import Navbar from "../components/Navbar"
// import { useEffect, useState } from "react";
// import axios from "axios";

// type Issue = {
//   id: number;
//   title: string;
//   url: string;
//   body: string;
//   state: string;
//   labels: string[];
//   comments: number;
//   createdAt: string;
//   updatedAt: string;
// }

// // type Repo = {
// //   repoId: number;
// //   name: string;
// //   owner: string;
// //   issues: Issue[];
// // }


// export default  function () {
//   const [issues,setIssues] = useState<Issue[]>([]);
//   useEffect(()=>{
//     const fetchIssues = async()=>{
//       try {
//         await axios.get("http://localhost:3000/api/issues").then(res=>{
//           setIssues(res.data.data);
//           console.log(res.data.filteredData);
//         })

//       } catch (error) {
//         console.log("Error fetching issues, ", error);
//       }
//     }

//     fetchIssues();
//   },[])
//   return (
//     <div className="m-5">
//       <Navbar />
//       <div className="">
//         <div className=" flex justify-between">
//           <span className="text-2xl">Issues</span>
//           <RefreshCcw />
//         </div>
//         <hr />
//         <div className="flex flex-col items-center my-10 gap-5">
//           <div className="outline-1 w-full rounded-sm p-4 flex justify-around">
//             <span>#</span>
//             <span>Comments</span>
//             <span>State</span>
//             <span>title</span>
//             <span>date</span>
//             <span>labels</span>
//             <span>Link</span>
//           </div>
//           {issues.length === 0 ? (
//             <div className="flex justify-center items-center py-10 text-muted-foreground">
//               Loading issues...
//             </div>
//           ) : (
//               issues.map((issue, idx) => (
//                 <div
//                   key={idx}
//                   className=" w-full  gap-10 bg-neutral-50 rounded-md  p-4 flex justify-around"
//                 >
//                   <span >{issue.id}</span>
//                   <span >{issue.comments}</span>
//                   <span >{issue.state}</span>
//                   <span className="text-red-300  text-sm">{issue.title}</span>
//                   <span className="text-sm text-neutral-700  ">{`${new Date(issue.createdAt)}`}</span>
//                   <span className="text-sm text-red-400">{issue.labels.map((l,idx)=>(<span key={idx}>{l}</span>))}</span>
//                   <a className="text-blue-400">{issue.url}</a>
//                 </div>
//               ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Calendar,
  GitBranch,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Link from "next/link";
import axios from "axios";
// type Issue = {
//   id: number;
//   title: string;
//   url: string;
//   body: string;
//   state: string;
//   labels: string[];
//   comments: number;
//   createdAt: string;
//   updatedAt: string;
// }

// // type Repo = {
// //   repoId: number;
// //   name: string;
// //   owner: string;
// //   issues: Issue[];
// // }

interface Issue {
  id: number;
  title: string;
  body: string;
  state: string;
  labels: string[];
  comments: number;
  createdAt: string;
  url: string;
  name: string;
  owner: string;
}

interface Repo{
  repoId: number;

  issues: Issue[]
}

const Issues = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("all");
  const [selectedLabel, setSelectedLabel] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(()=>{
      const fetchIssues = async()=>{
        try {
          await axios.get("http://localhost:3000/api/issues").then(res=>{
            setIssues(res.data.data);
            console.log(res.data.filteredData);
          })

        } catch (error) {
          console.log("Error fetching issues, ", error);
        }
      }

      fetchIssues();
    },[])

  // Mock data
  // const issues: Issue[] = [
  //   {
  //     id: 1,
  //     title: "Add TypeScript support for new API",
  //     body: "We need to add proper TypeScript definitions for the new API endpoints...",
  //     labels: ["enhancement", "typescript"],
  //     comments: 12,
  //     createdAt: "2024-11-20",
  //     repoName: "react",
  //     repoOwner: "facebook",
  //     url: "https://github.com/facebook/react/issues/1",
  //   },
  //   {
  //     id: 2,
  //     title: "Memory leak in production build",
  //     body: "There seems to be a memory leak when using the production build with...",
  //     labels: ["bug", "critical"],
  //     comments: 8,
  //     createdAt: "2024-11-18",
  //     repoName: "typescript",
  //     repoOwner: "microsoft",
  //     url: "https://github.com/microsoft/typescript/issues/2",
  //   },
  //   {
  //     id: 3,
  //     title: "Documentation improvements needed",
  //     body: "The current documentation lacks examples for advanced use cases...",
  //     labels: ["documentation"],
  //     comments: 5,
  //     createdAt: "2024-11-15",
  //     repoName: "next.js",
  //     repoOwner: "vercel",
  //     url: "https://github.com/vercel/next.js/issues/3",
  //   },
  // ];

  const repos = [
    "all",
    "facebook/react",
    "microsoft/typescript",
    "vercel/next.js",
  ];
  const labels = [
    "all",
    "bug",
    "enhancement",
    "documentation",
    "typescript",
    "critical",
  ];

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRepo =
      selectedRepo === "all" ||
      `${issue.owner}/${issue.name}` === selectedRepo;
    const matchesLabel =
      selectedLabel === "all" || issue.labels.includes(selectedLabel);

    let matchesTime = true;
    if (timeFilter === "6months") {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      matchesTime = new Date(issue.createdAt) >= sixMonthsAgo;
    }

    return matchesSearch && matchesRepo && matchesLabel && matchesTime;
  });

  const getLabelColor = (label: string) => {
    const colors: Record<string, string> = {
      bug: "bg-destructive/10 text-destructive border-destructive/20",
      enhancement: "bg-primary/10 text-primary border-primary/20",
      documentation: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      typescript: "bg-blue-700/10 text-blue-700 border-blue-700/20",
      critical: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    };
    return colors[label] || "bg-secondary text-secondary-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold">Issues</h1>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
            <p className="text-muted-foreground">
              All issues from your tracked repositories
            </p>
          </div>

          <Card className="p-6 mb-6 border-border/50">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                <SelectTrigger>
                  <SelectValue placeholder="All repositories" />
                </SelectTrigger>
                <SelectContent>
                  {repos.map((repo) => (
                    <SelectItem key={repo} value={repo}>
                      {repo === "all" ? "All repositories" : repo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLabel} onValueChange={setSelectedLabel}>
                <SelectTrigger>
                  <SelectValue placeholder="All labels" />
                </SelectTrigger>
                <SelectContent>
                  {labels.map((label) => (
                    <SelectItem key={label} value={label}>
                      {label === "all" ? "All labels" : label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          <div className="space-y-4">
            {filteredIssues.length === 0 ? (
              <Card className="p-12 text-center border-border/50">
                <h3 className="text-xl font-semibold mb-2">No Issues Found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or add more repositories
                </p>
                <Button asChild>
                  <Link href="/add-repo">Add Repository</Link>
                </Button>
              </Card>
            ) : (
              filteredIssues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    key={issue.id}
                    className="p-6 hover:shadow-md transition-shadow border-border/50 cursor-pointer"
                    onClick={() => router.push(`/issues/${issue.id}`)}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start gap-3">
                          <h3 className="text-lg font-semibold leading-tight flex-1">
                            {issue.title}
                          </h3>
                          <a
                            href={issue.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="gap-1">
                            <GitBranch className="w-3 h-3" />
                            {issue.owner}/{issue.name}
                          </Badge>
                          {issue.labels.map((label) => (
                            <Badge
                              key={label}
                              variant="outline"
                              className={getLabelColor(label)}
                            >
                              {label}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {issue.comments} comments
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(issue.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Issues;

