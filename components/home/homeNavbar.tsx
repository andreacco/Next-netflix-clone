import React from 'react'
import Image from 'next/image'
import { HomeButtons } from '../buttons'

const HomeNavbar = () => {

    return (
        <div className='flex justify-between items-center px-12 py-5'>
            <Image src='/images/logo.png' alt='logo' width={100} height={100}/>
            <HomeButtons 
                buttonText='Sign in'
                onClick='login'
            />
        </div>
    )
}

export default HomeNavbar