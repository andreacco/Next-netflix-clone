'use client'
import Billboard from '@/components/billboard';
import InfoModal from '@/components/infoModal';
import MovieList from '@/components/movieList';
import Navbar from '@/components/navbar';
import useFavorites from '@/hooks/useFavorites';
import useInfoModal from '@/hooks/useInfoModal';
import useMovieList from '@/hooks/useMovieList';
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';

export default function Home() {

    useSession({
        required: true, 
        onUnauthenticated() {
            return redirect("/auth")
        },
    });

    const { data: movies = [] } = useMovieList();
    const { data: favorites = [] } = useFavorites();
    const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={() => {closeModal}}/>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  )
}
