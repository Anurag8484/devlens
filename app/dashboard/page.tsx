import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import AddRepoDialog from "../components/AddRepoDialog";
import Link from "next/link";
export default function dashboard() {
  return (
    <>
      <Navbar />
      <div className=" flex justify-between m-9  ">
          <div className="flex flex-col">
            <span className="text-3xl font-bold">Your Repositories</span>
            <span className="text-neutral-500">
              Manage and track issues across your GitHub repositories
            </span>
          </div>
          <AddRepoDialog/>
      </div>
    </>
  );
}
