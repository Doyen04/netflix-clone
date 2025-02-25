
import prisma from "@/lib/prismadb"
import { compare } from "bcryptjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials";


export const { handlers: {GET, POST}, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password required')
                }

                // user authentication logic
                const user = await prisma.user.findUnique(
                    {
                        where: {
                            email: credentials?.email as string,
                        }
                    }
                )

                if (!user || !user.hashedPassword) {
                    throw new Error('Email does not exist')
                }

                const isPasswordValid = await compare(credentials.password as string, user.hashedPassword)

                if (!isPasswordValid) {
                    throw new Error('Invalid password')
                }

                return user //
            }
        })

    ],
    pages:{
        signIn: '/login',
    },
    // debug: true,
    secret: process.env.AUTH_SECRET,


})