"use server"

import { signIn } from "@/auth";

export const Login = async (email: string, password: string) => {
    try {
        const res = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
            // redirectTo: '/'
        })
        return res
    } catch (error) {
        throw new Error(error as string);
    }

}