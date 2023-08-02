import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: Request){
    try {
        const currentUser = await serverAuth();

        const favoritedMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds,
                }
            }
        });
        
        return NextResponse.json(favoritedMovies, { status: 200 })

    } catch (error) {
        console.log("[GET FAVORITES API ERROR]", error);
        return new NextResponse("Inernal API Error", { status: 500 })
    }
}