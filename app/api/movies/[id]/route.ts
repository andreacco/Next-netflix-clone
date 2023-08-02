import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export async function GET(req: Request, { params }: { params: { id: string } }){
    try {
        
        await serverAuth();
        const movieId = params.id;

        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if (!movie) {
            throw new Error("Invalid ID")
        };

        return NextResponse.json(movie, { status: 200 })

    } catch (error) {
        console.log("[GET MOVIES ID API ERROR]", error);
        return new NextResponse("Internal API Error", { status: 500 })
    }
}