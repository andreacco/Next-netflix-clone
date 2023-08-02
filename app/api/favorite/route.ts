import { NextResponse } from "next/server";
import { without } from "lodash";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export async function POST(req: Request){
    try {
        const currentUser = await serverAuth();

        const {movieId} = await req.json();
        
        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            }
        });

        if (!existingMovie) {
            throw new Error("Invalid ID")
        }

        const user = await prismadb.user.update({
            where: {
                email: currentUser.email || undefined,
            },
            data: {
                favoriteIds: {
                    push: movieId,
                },
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.log("[POST FAVORITE API ERROR]", error);
        return new NextResponse("Internal API Error", { status: 500 })
    }
}

export async function DELETE(req: Request){
    try {
        const currentUser = await serverAuth();

        const movieId: string = await req.json();

        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            }
        });

        if (!existingMovie) {
            throw new Error('Invalid ID');
        }

        const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

        const updatedUser = await prismadb.user.update({
            where: {
                email: currentUser.email || undefined,
            },
            data: {
                favoriteIds: updatedFavoriteIds,
            }
        });
        return NextResponse.json(updatedUser, { status: 200 });

    } catch (error) {
        console.log("[DELETE FAVORITE API ERROR]", error);
        return new NextResponse("Internal API Error", { status: 500 })
    }
}


