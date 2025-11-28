// 'use client'
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { Spinner } from "@/components/ui/spinner";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { useEffect } from "react";
// import { parseUrl } from "@/lib/utils/parseUrl";
// export default function Navbar() {
//   const router = useRouter();
//   const {data:session,status} = useSession();
//   useEffect(()=>{
//     const data = parseUrl("https://api.github.com/repos/code100x/cms/issues");
//     console.log(data);
//   },[])
//   console.log(session)
//   return (
//     <div className="flex justify-around mb-10  items-center  rounded-xl  outline-neutral-500 outline-1 p-5 ">
//       <div>DevLens</div>
//       <div className="flex gap-2 justify-center">
//         {status === "unauthenticated" && (
//           <Button
//             className="py-1 px-2 outline-1 rounded-lg cursor-pointer "
//             onClick={() => {
//               signIn("github", { callbackUrl: "/dashboard" });
//             }}
//           >
//             Login
//           </Button>
//         )}
//         {status === "authenticated" && (
//           <div className="flex gap-5 items-center justify-center">
//             <Button
//               className="py-1 px-2 outline-1 rounded-lg cursor-pointer "
//               onClick={() => {
//                 router.push("/api/auth/signout");
//               }}
//             >
//               LogOut
//             </Button>
//             <Avatar>
//               <AvatarImage  src={session.user?.image?? ''} alt="@shadcn" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//           </div>
//         )}
//         {status === "loading" && <Spinner className="size-9" />}
//       </div>
//     </div>
//   );
// }
"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { parseUrl } from "@/lib/utils/parseUrl";
import { Github, LogOut, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const data = parseUrl("https://api.github.com/repos/code100x/cms/issues");
    console.log(data);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => router.push("/")}
        >
          <div className="relative w-9 h-9 bg-gradient-to-br from-black to-black/70 dark:from-white dark:to-white/70 rounded-lg flex items-center justify-center shadow-lg">
            <svg
              className="w-5 h-5 text-white dark:text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6M1 12h6m6 0h6M5.64 5.64l4.24 4.24m5.64 5.64l4.24 4.24M5.64 18.36l4.24-4.24m5.64-5.64l4.24-4.24" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-black to-black/70 dark:from-white dark:to-white/70 bg-clip-text text-transparent">
            DevLens
          </span>
        </div>

        {/* Auth & Theme Section */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </Button>

          {status === "unauthenticated" && (
            <Button
              onClick={() => {
                signIn("github", { callbackUrl: "/dashboard" });
              }}
              className="gap-2 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90"
            >
              <Github className="w-4 h-4" />
              Sign in
            </Button>
          )}
          {status === "authenticated" && (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => {
                  router.push("/api/auth/signout");
                }}
                className="gap-2 text-foreground hover:bg-black/5 dark:hover:bg-white/5"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </Button>
              <Avatar className="h-9 w-9 border-2 border-black/20 dark:border-white/20">
                <AvatarImage
                  src={session.user?.image ?? ("/placeholder.svg")}
                  alt={session.user?.name ?? "User"}
                />
                <AvatarFallback className="bg-black dark:bg-white text-white dark:text-black">
                  {session.user?.name?.charAt(0) ?? "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
          {status === "loading" && <Spinner className="w-5 h-5" />}
        </div>
      </div>
    </nav>
  );
}
