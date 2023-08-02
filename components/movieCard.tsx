import Image from 'next/image';
import { FavoriteButton, OpenModalCards, PlayButton } from './buttons';


interface MovieCardProps {
    data: Record<string, any>;
};

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {

    return (
        <div className='group bg-zinc-900 col-span relative h-[12vw]'>
            <Image className="
                cursor-pointer 
                object-cover
                transition
                duration
                shadow-xl
                rounded-md
                group-hover:opacity-90
                sm:group-hover:opacity-0
                delay-300
                w-full
                h-[12vw]
                " src={data.thumbnailUrl} alt='thumbnail' width={500} height={0}/>
            <div className='
                opacity-0
                absolute
                to-0
                transition
                duration-200
                z-10
                invisible
                sm:visible
                delay-300
                scale-0
                group-hover:scale-110
                group-hover:-translate-y-[16vw]
                group-hover:opacity-100
            '>
                <Image className='
                    cursor-pointer
                    object-cover
                    transition
                    duration
                    shadow-xl
                    rounded-t-md
                    w-full
                    h-[12vw]
                    ' src={data.thumbnailUrl} alt='thumbnail' width={500} height={0}/>
                <div className='
                    z-10
                    bg-zinc-800
                    p-2
                    lg:p-4
                    absolute
                    w-full
                    transition
                    shadow-md
                    rounded-b-md
                    '>
                    <div className='flex flex-row items-center gap-3'>
                        <PlayButton movieId={data?.id}/>
                        <FavoriteButton movieId={data?.id}/>
                        <OpenModalCards movieId={data?.id}/>
                    </div>
                    <p className='text-green-400 font-semibold mt-4'>
                        New <span className='text-white'>2023</span>
                    </p>
                    <div className='flex flex-row mt-4 gap-2 items-center'>
                        <p className='text-white text-[10px] lg:text-sm'>{data.duration}</p>
                    </div>
                    <div className='flex flex-row mt-4 gap-2 items-center'>
                        <p className='text-white text-[10px] lg:text-sm'>{data.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;