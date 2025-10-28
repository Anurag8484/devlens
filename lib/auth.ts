import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/db/prisma";
import Github from "next-auth/providers/github";

export const authOptions = {
adapter: PrismaAdapter(prisma),
providers:[
    Github({
        clientId:process.env.GITHUB_ID ?? '',
        clientSecret:process.env.GITHUB_SECRET ?? ''
    })
],
secret: process.env.NEXTAUTH_SECRET

}