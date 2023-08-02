"use client"

// import React from 'react'
import Image from 'next/image';
import { useCallback, useState } from 'react';
import Input from '@/components/input';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { AuthButton } from '@/components/buttons';

const Page = () => {

    const [variant, setVariant] = useState("login");
    
    const toggleVariant = useCallback(() => {
        setVariant((current) => current === "login" ? "register" : "login")
    }, []);
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    // const logIn = useCallback(async() => {
    //     try {
    //         await signIn('credentials', {
    //             email,
    //             password,
    //             callbackUrl: '/profiles'
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     };
    // }, [email, password])

    // const signUp = useCallback(async() => {
    //     try {
    //         await axios.post('/api/register', {
    //             email, 
    //             name,
    //             password
    //         })
    //         logIn();
    //     } catch (error) {
    //         console.log(error);
    //     };
    // }, [email, name, password, logIn])

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <Image src="/images/logo.png" alt='logo' width={100} height={100}/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === "login" ? "Sign In" : "Sign Up"}
                        </h2>
                        <div className="flex flex-col gap-4">
                        {variant === 'register' && (<Input 
                                label="Username"
                                onChange={(e: any) => {setName(e.target.value)}}
                                id= "name"
                                type= "name"
                                value={name}
                            />)}
                            <Input 
                                label="Email or phone number"
                                onChange={(e: any) => {setEmail(e.target.value)}}
                                id= "email"
                                type= "email"
                                value={email}
                            />
                            <Input 
                                label="Password"
                                onChange={(e: any) => {setPassword(e.target.value)}}
                                id= "password"
                                type= "password"
                                value={password}
                            />
                        </div>
                        <AuthButton 
                            variant={variant}
                            email={email}
                            name={name}
                            password={password}
                        />
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <AuthButton 
                                variant={variant}
                                email={email}
                                name={name}
                                password={password}
                                icon='GOOGLE'
                            />
                            <AuthButton 
                                variant={variant}
                                email={email}
                                name={name}
                                password={password}
                                icon='GITHUB'
                            />
                        </div>

                        {/* <button className="bg-red-700 py-3 text-white rounded-md w-full mt-10 hover:bg-red-800 transition" onClick={variant === 'login' ? logIn : signUp}>
                            {variant === "login" ? "Sign In" : "Sign Up"}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div onClick={() => signIn('google', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30}/>
                            </div>
                            <div onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition" >
                                <FaGithub size={30}/>
                            </div>
                        </div> */}
                        <p className="text-neutral-500 mt-12">
                            {variant === "login" ? "New to Netflix?" : "Already have an account?"}
                            
                            <span className="text-white ml-1 hover hover:underline cursor-pointer" onClick={toggleVariant}>
                            {variant === "login" ? "Sign up now" : "Sign In now"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Page;