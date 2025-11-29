'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { CircleAlert, GitBranch, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import CustomSpinner from "./CustomSpinner";
import { useGlobalEmmit } from "../hooks/useRefresh";
import { useRouter } from "next/navigation";

interface Repo {
  id: number;
  githubUrl: string;
  owner: string;
  type: string;
  name: string;
}

export function RepoCard() {
  const router = useRouter();
  const [repos,setRepos] = useState<Repo[]>([])
  const [loading,setLoading] =useState<Boolean>(false);


   const fetchRepos = useCallback(async () => {
     try {
      setLoading(true)
       const res = await axios.get("http://localhost:3000/api/repo");
       const formatted:Repo[] = res.data.repos.map((r: any) => ({
         id: r.id,
         githubUrl: r.githubIrl || r.githubUrl,
         owner: r.owner,
         type: r.type,
         name: r.name
       }));
       setRepos(formatted);
     } catch (err) {
       console.error("Error fetching repos:", err);
     } finally{
      setLoading(false)
     }
   },[]);

  useEffect(() => {
    // setLoading(true);
    fetchRepos();
  },[fetchRepos]);

  useGlobalEmmit("repos:update",fetchRepos)

  return (
    <>
    {loading ?  <CustomSpinner/> :
      <div className="grid grid-cols-3 gap-y-6">
        {repos.map((repo: Repo) => (
          <Card key={repo.id} className="w-full max-w-sm dark:text-white">
            <CardHeader>
              <CardTitle className="flex gap-2 ">
                <GitBranch size={20} className="text-blue-500" />
                <Link href={repo.githubUrl} target="blank">
                  <Badge variant={"secondary"} className="flex">
                    Github <SquareArrowOutUpRight />
                  </Badge>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-neutral-500 text-[.8rem]">
                  {repo.owner}
                </span>
                <span className="font-semibold">{repo.name}</span>
              </div>
              <div>
                <Badge variant={"outline"}>
                  {" "}
                  <CircleAlert /> {repo.type}{" "}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button variant="secondary" className="w-full" onClick={()=>router.push('/issues')}>
                Issues
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      }
    </>
  );
}
