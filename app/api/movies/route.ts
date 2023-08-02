import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export async function GET(req: Request, res: Response){
    try {
        
        await serverAuth();

        const movies = await prismadb.movie.findMany();

        return NextResponse.json(movies)
    } catch (error) {
        console.log("[GET MOVIES API ERROR], error");
        return new NextResponse("Internal API Error", { status: 500 } )
    }
}