'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function(){

    const urlRef = useRef<HTMLInputElement>(null);
    const ownerRef = useRef<HTMLInputElement>(null);
    const [type,setType] = useState('');
    const [open,setOpen] = useState(false)

    const  addRepo = async(e:React.FormEvent) =>{
        e.preventDefault();
        const githubUrl = urlRef.current?.value;

        try {
          await axios.post('http://localhost:3000/api/repo',{
            githubUrl,
            type
          }).then((res)=>{
            if(res.status === 201){
              toast("Repo added to db")
              setOpen(false)
            }
          })

        } catch (error) {
            console.log(error);
            toast("Something Went wrong")
            return;
        }
        
        
       
    }

    return (
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button variant="default" onClick={()=>setOpen(true)}>Add Repo to Track</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={addRepo}>
            <DialogHeader>
              <DialogTitle>Add Repo</DialogTitle>
              <DialogDescription>
                Add github repository to be tracked
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Github Repo Url</Label>
                <Input id="name-1" name="name" ref={urlRef} defaultValue="" />
              </div>
              <div className="grid gap-3">
                <Select onValueChange={(value) => setType(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GSOC">GSOC</SelectItem>
                    <SelectItem value="OpenSoruce">Open Soruce</SelectItem>
                    <SelectItem value="Misc">Misc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Repo</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
}