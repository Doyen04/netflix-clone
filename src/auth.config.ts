import { NextAuthConfig } from "next-auth";





export const authConfig = {
    providers: [],
    session: {
        strategy: 'jwt'
    },

    callbacks: {
        async authorized({ auth }) {
            console.log(!!auth, 2);
            // TODO: how does middleware uses authorise function 
            
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            // try {
            //     const user = await prisma.user.findUnique(
            //         {
            //             where: {
            //                 id: token.id as string,
            //             },
            //             select: {
            //                 id: true,
            //                 email: true,
            //                 name: true,
            //                 image: true,
            //                 emailVerified: true,
            //                 favoriteIds: true
            //             }
            //         }
            //     )
            //     if (user) {
            //         session.user = {
            //             ...user,
            //             email: user.email ?? ''
            //         }
            //     }
            //     return session
            // } catch (e) {
            //     console.log(e)
            // }
            session.user.id = token.id as string
            return session
        },
    },
    pages: {
        signIn: '/login',
    },
    // debug: true,
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;