'use client'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
export default function Navbar() {
  const router = useRouter();
  const {data:session,status} = useSession();
  console.log(session)
  return (
    <div className="flex justify-around m-9 items-center  rounded-xl  outline-neutral-500 outline-1 p-5 ">
      <div>DevLens</div>
      <div className="flex gap-2 justify-center">
        {status === "unauthenticated" && (
          <Button
            className="py-1 px-2 outline-1 rounded-lg cursor-pointer "
            onClick={() => {
              signIn("github", { callbackUrl: "/dashboard" });
            }}
          >
            Login
          </Button>
        )}
        {status === "authenticated" && (
          <div className="flex gap-5 items-center justify-center">
            <Button
              className="py-1 px-2 outline-1 rounded-lg cursor-pointer "
              onClick={() => {
                router.push("/api/auth/signout");
              }}
            >
              LogOut
            </Button>
            <Avatar>
              <AvatarImage  src={session.user?.image?? ''} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        )}
        {status === "loading" && <Spinner className="size-9" />}
      </div>
    </div>
  );
}
