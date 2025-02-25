
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({ message: 'Hello, World!' })
}

export async function POST(req: NextRequest) {
    try {
        const { email, name, password } = await req.json()

        const isUserExist = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (isUserExist) {
            return NextResponse.json({ error: 'User already exist', status: 400 })
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword: hashedPassword,
                image: '',
                emailVerified: new Date()
            }
        })
        return NextResponse.json({user: user, message: 'User Creation Successful', status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Something went wrong', status: 500 })
    }

}