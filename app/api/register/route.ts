import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const { email, name, password } = body;

        const existingUser = await prismadb.user.findUnique({
            where:{
                email
            }
        });

        if (existingUser) {
            return new NextResponse("Email taken", { status: 422 })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name, 
                hashedPassword,
                image: '',
                emailVerified: new Date()
            }
        });

        return NextResponse.json(user)

    } catch (error) {
        console.log("[POST REGISTER API ERROR]", error);
        return new NextResponse("Internal Api Error", { status: 500 })
    }
}