'use client'
import { RefreshCcw } from "lucide-react"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react";
import axios from "axios";

export default  function () {
  const [issues,setIssues] = useState<string[]>([]);
  useEffect(()=>{
    const fetchIssues = async()=>{
      try {
        await axios.post("http://localhost:3000/api/issues").then(res=>{
          console.log(res.data)
        })

      } catch (error) {
        console.log(error);
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
            <span>Repo</span>Description<span>Link</span>
          </div>
          <div className=" w-full bg-neutral-50 rounded-md  p-4 flex justify-around">
            <span>#</span>
            <span>Issue</span>
            <span>Repo</span>Description<span>Link</span>
          </div>
        </div>
      </div>
    </div>
  );
};
