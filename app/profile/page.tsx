'use client'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { Badge } from '@/components/ui/badge';
import CustomSpinner from '../components/CustomSpinner';
import { GitBranch, GithubIcon } from 'lucide-react';
import { RepoCard } from '../components/RepoCard';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group';
import prisma from '@/db/prisma';
import { toast } from 'sonner';
import { User } from '@/types/user';
import axios from 'axios';

export default function(){
  const { data: session, status } = useSession();
  const [editBio, setEditbio] = useState(false)
  const [user, setUser] = useState<User>();
  const bioRef = useRef<HTMLTextAreaElement>(null);



  useEffect(()=>{
    const fetchUser = async()=>{
     const res = await axios.get(`/api/user`)
    console.log(res.data.user)
     setUser(res.data.user);

    }

    fetchUser();
  },[])

  return (
    <>
      <Navbar />
      {session?.user?.image ? (
        <div className="flex flex-col  gap-8  rounded-lg mt-20 max-w-7xl p-5 mx-auto">
          <Image
            src={session?.user.image}
            alt="userPic"
            width={100}
            height={100}
            loading="lazy"
            className="rounded-full"
          />

          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-800">
              {session?.user.name}
            </h1>
            <p className="text-neutral-600 font-medium">
              {session?.user.email}
            </p>

            <Badge variant={"outline"} className="mt-7 font-semibold ">
              <GithubIcon /> repository
            </Badge>
          </div>
          {editBio ? (
            <InputGroup>
              <InputGroupTextarea placeholder="Add to your bio"  ref={bioRef} />
              <InputGroupAddon align="block-end">
                <InputGroupText className="text-muted-foreground text-xs">
                  Make it detailed so that AI can filter easily
                </InputGroupText>
                <InputGroupButton
                  size="sm"
                  className="ml-auto"
                  variant="default"
                  onClick={async () => {
                    await axios.post("/api/user", {
                      bio: bioRef.current?.value,
                    });
                    setEditbio(false);
                    toast("Bio updated");
                  }}
                >
                  Submit
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          ) : (
            <InputGroup>
              <InputGroupTextarea
                placeholder="User Bio"
                disabled
                value={user?.bio}
              />
              <InputGroupAddon align="block-end">
                <InputGroupButton
                  size="sm"
                  className="ml-auto"
                  variant="ghost"
                  onClick={() => {
                    setEditbio(true);
                  }}
                >
                  Edit
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          )}
        </div>
      ) : (
        <CustomSpinner />
      )}
      <div className="max-w-7xl mx-auto mt-9">
        <RepoCard />
      </div>
    </>
  );
}

