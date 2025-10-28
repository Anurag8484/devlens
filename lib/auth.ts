import { PrismaAdapter } from "@auth/prisma-adapter";
import { adapter } from "next/dist/server/web/adapter";

export const authOptions = {
adapter: PrismaAdapter

}