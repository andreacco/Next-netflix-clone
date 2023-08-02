'use client'

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoIosArrowForward } from 'react-icons/io';
import useCurrentUser from '../hooks/useCurrentUser'
import useFavorites from '../hooks/useFavorites'
import { BiChevronDown, BiPlus } from 'react-icons/bi'
import { BsCheck2, BsFillPlayFill } from 'react-icons/bs'
import useInfoModal from '@/hooks/useInfoModal';

interface ButtonsProps {
    variant: string
    email: string
    name: string
    password: string
    icon?: string
}

export const AuthButton = ({variant, email, name, password, icon}: ButtonsProps) => {

    const logIn = useCallback(async () => {
        try {
            if (icon) {
                icon === 'GOOGLE' ?
                await signIn('google', { callbackUrl: '/profiles' }) 
                : await signIn('github', { callbackUrl: '/profiles' })
            }

            const login = await signIn('credentials', {
                email,
                password,
                redirect: true,
                callbackUrl: '/profiles'
            })


            if (variant === 'login' && !icon) {
                login
            } else if(variant === 'register' && !icon) {
                await axios.post('/api/register', {
                    email, 
                    name,
                    password
                })
                login
            }
        } catch (error) {           
            console.log(error);
        }
    }, [variant, email, password, icon, name])

    return(
        <button className={icon ? "w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition" : "bg-red-700 py-3 text-white rounded-md w-full mt-10 hover:bg-red-800 transition"} onClick={() => logIn()}>
            {icon ?
            icon === "GOOGLE" ? 
            <FcGoogle size={30}/> 
            : <FaGithub size={30}/>
            : variant === "login" ? 
            "Sign In" 
            : "Sign Up"}
        </button>
    )
}

interface HomeButtonsProps {
    buttonText: string
    icon?: string
    onClick?: string
}

export const HomeButtons = ({buttonText, icon}: HomeButtonsProps) => {
    const router = useRouter()
    return (
        <button className={`${icon? "w-48" : ""} flex justify-center items-center bg-red-700 py-2 px-6 text-white rounded-md hover:bg-red-800 transition`} onClick={() => router.push('/auth')}>
            {buttonText}
            {icon ? <IoIosArrowForward size={20}/> : ''}
        </button>
    )
}

interface FavoriteButtonProps {
    movieId: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {

    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();
    console.log(currentUser, "CURRENT USEEEEEEEEEEER");
    
    
    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        
        return list.includes(movieId)
        
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response; 

        if (isFavorite) {
            response = await axios.delete('/api/favorite', { data: { movieId } })
        } else {
            response = await axios.post('/api/favorite', { movieId })
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser, 
            favoriteIds: updatedFavoriteIds,
        });

        mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

    const Icon = isFavorite ? BsCheck2 : BiPlus

    return(
        <div className='
            cursor-pointer
            group/item
            w-6
            h-6
            lg:w-10
            lg:h-10
            border-white
            border-2
            rounded-full
            flex
            justify-center
            items-center
            transition
            hover:border-neutral-300
        ' onClick= {toggleFavorites}>
            <Icon className='text-white' size={30}/>
        </div>
    )
}

interface PlayButtonProps {
    movieId: string
    comesFrom?: string
};

export const PlayButton: React.FC<PlayButtonProps> = ({ movieId, comesFrom }) => {

    const router = useRouter();

    return (
        <button 
            onClick={() => router.push(`/watch/${movieId}`)}
            className={`
                bg-white
                flex
                items-center
                hover:bg-neutral-300
                transition
            ${!comesFrom ? 
                "justify-center w-6 h-6 lg:w-10 lg:h-10 rounded-full" 
                : "flex-row rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold"}
            `}>
                <BsFillPlayFill size={25} className='mr-1'/>
                {comesFrom ? "Play" : ""}
            </button>
    )

    // if (!comesFrom) {
    //     <div
    //     onClick={() => router.push(`/watch/${movieId}`)}
    //     className='
    //         cursor-pointer
    //         w-6
    //         h-6
    //         lg:w-10
    //         lg:h-10
    //         bg-white
    //         rounded-full
    //         flex
    //         justify-center
    //         items-center
    //         transition
    //         hover:bg-neutral-300
    //     '
    //     >
    //         <BsFillPlayFill size={25} className='mr-1'/>
    //         Play
    //     </div>
    // } else {
    //     return (
    //         <button 
    //         onClick={() => router.push(`/watch/${movieId}`)}
    //         className='
    //             bg-white
    //             rounded-md
    //             py-1 md:py-2
    //             px-2 md:px-4
    //             w-auto
    //             text-xs lg:text-lg
    //             font-semibold
    //             flex
    //             flex-row
    //             items-center
    //             hover:bg-neutral-300
    //             transition
    //         '>
    //             <BsFillPlayFill size={25} className='mr-1'/>
    //             Play
    //         </button>
    //     )
    // }
}

interface OpenModalCardsProps{
    movieId: string
}

export const OpenModalCards: React.FC<OpenModalCardsProps> = ({ movieId }) => {
    
    const { openModal } = useInfoModal()

    return (
        <div 
        onClick={() => (openModal(movieId))}
        className='
            cursor-pointer
            ml-auto
            group/item
            w-6
            h-6
            lg:w-10
            lg:h-10
            border-white
            border-2
            rounded-full
            flex
            justify-center
            items-center
            transition
            hover:border-neutral-300
        '>
            <BiChevronDown size={30} className="text-white group-hover/item:text-netral-300" />
        </div>
    )
}