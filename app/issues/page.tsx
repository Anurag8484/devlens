'use client'
import { RefreshCcw } from "lucide-react"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react";
import axios from "axios";

type Issue = {
  number: number;
  title: string;
  url: string;
  body: string;
}

type Repo = {
  repoId: number;
  name: string;
  owner: string;
  issues: Issue[];
}


export default  function () {
  const [repos,setRepos] = useState<Repo[]>([]);
  useEffect(()=>{
    const fetchIssues = async()=>{
      try {
        await axios.get("http://localhost:3000/api/issues").then(res=>{
          setRepos(res.data.data);
          console.log(res.data.data)
        })

      } catch (error) {
        console.log("Error fetching issues, ", error);
      }
    }

    fetchIssues();
  },[])
  return (
    <div className="m-5">
      <Navbar />
      <div className="">
        <div className=" flex justify-between">
          <span className="text-2xl">Issues</span>
          <RefreshCcw />
        </div>
        <hr />
        <div className="flex flex-col items-center my-10 gap-5">
          <div className="outline-1 w-full rounded-sm p-4 flex justify-around">
            <span>#</span>
            <span>Issue</span>
            <span>Repo</span>
            <span>Description</span>
            <span>Link</span>
          </div>
          {repos.length === 0 ? (
            <div className="flex justify-center items-center py-10 text-muted-foreground">
              Loading issues...
            </div>
          ) : (
            repos.map((repo) =>
              repo.issues.map((issue, idx) => (
                <div
                  key={idx}
                  className=" w-full  gap-10 bg-neutral-50 rounded-md  p-4 flex justify-around"
                >
                  <span>{issue.number}</span>
                  <span className="text-red-300">{issue.title}</span>
                  <span className="text-sm text-neutral-500">{issue.body}</span>
                  <span className="text-4xl text-red-400">{repo.name}</span>
                  <a className="text-blue-400">{issue.url}</a>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};
