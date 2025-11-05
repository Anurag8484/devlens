import { Button } from "@/components/ui/button"
import Navbar from "../components/Navbar"
import AddRepoDialog from "../components/AddRepoDialog"
import RepoCard from "../components/RepoCard";
import Link from "next/link";
export default function dashboard(){
  
    return (
      <div className="m-9">
        <Navbar />
        <div className=" flex justify-between">
          <AddRepoDialog />
          <Button>
          <Link href={"/issues/"}>Issues</Link>
          </Button>
        </div>
        <RepoCard/>
      </div>
    );
}