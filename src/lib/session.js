"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const session = async () => {
    await getServerSession(authOptions);
}