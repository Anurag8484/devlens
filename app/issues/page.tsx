'use client'
import { RefreshCcw } from "lucide-react"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react";
import axios from "axios";

type Issue = {
  id: number;
  title: string;
  url: string;
  body: string;
  state: string;
  labels: string[];
  comments: number;
  createdAt: string;
  updatedAt: string;
}

// type Repo = {
//   repoId: number;
//   name: string;
//   owner: string;
//   issues: Issue[];
// }


export default  function () {
  const [issues,setIssues] = useState<Issue[]>([]);
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
            <span>Comments</span>
            <span>State</span>
            <span>title</span>
            <span>body</span>
            <span>labels</span>
            <span>Link</span>
          </div>
          {issues.length === 0 ? (
            <div className="flex justify-center items-center py-10 text-muted-foreground">
              Loading issues...
            </div>
          ) : (
              issues.map((issue, idx) => (
                <div
                  key={idx}
                  className=" w-full  gap-10 bg-neutral-50 rounded-md  p-4 flex justify-around"
                >
                  <span >{issue.id}</span>
                  <span >{issue.comments}</span>
                  <span >{issue.state}</span>
                  <span className="text-red-300 w-5 text-sm">{issue.title}</span>
                  <span className="text-sm text-neutral-700  ">{issue.body}</span>
                  <span className="text-sm text-red-400">{issue.labels.map((l)=>(<span>{l}</span>))}</span>
                  <a className="text-blue-400">{issue.url}</a>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};
