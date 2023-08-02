import { HomeButtons } from '@/components/buttons';
import HomeNavbar from '@/components/home/homeNavbar';
import Image from 'next/image';

const Home = () => {
    return (
        <div className="relative h-4/6 md:h-5/6 lg:h-5/6 w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full bg-opacity-50">
                <HomeNavbar />
                <div className='flex items-center justify-center h-4/6 mt-10 w-screen'>
                    <div className='text-white flex flex-col items-center text-center'>
                        <h2 className='text-xl lg:text-4xl font-bold'>Unlimited movies, TV shows, and more</h2>
                        <br />
                        <p className='text-sm lg:text-xl'>Watch anywhere. Cancel anytime</p>
                        <br />
                        <p className='text-sm lg:text-xl'>Ready to watch? Let`s create or restart your membership!</p>
                        <br />
                        <HomeButtons 
                            buttonText='Get started'
                            icon='arrow'
                            onClick='register'
                        />
                    </div>
                </div>
            </div>
            <div className='bg-zinc-700 h-2'></div>
            <div className='bg-black'>
                <div className='p-8 flex justify-center text-white text-center h-96'>
                    <div className='flex flex-col justify-center items-center mr-5 w-2/6 h-80'>
                        <h2 className='font-bold text-xl lg:text-5xl'>Enjoy on your TV</h2>
                        <br />
                        <p className='text-2xl text-left'>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                    </div>
                    <div className='flex basis-2/4'>
                        <div className='relative'>
                            <Image className='w-[100%]' src='/images/tv.png' alt='tv' width={1000} height={1000}/>
                        </div>
                        <div className='z-[-1] overflow-hidden w-[100%] h-[100%] max-w-[73%] max-h-[54%] absolute top-[46%] left-[50%] translate-x-[50%] translate-y-[50%]' >
                            <video autoPlay loop muted>
                                <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"/>
                            </video>
                        </div>
                    </div>
                    {/* <div className='relative w-[23%] h-4/12'>
                        <div>
                            <Image className='z-10 absolute h-full w-full' src='/images/tv.png' alt='tv' width={1000} height={1000}/>
                        </div>
                        <div className='mt-16 ml-14'>
                            <video autoPlay loop muted className='z-0 h-44 absolute flex justify-center items-center'>
                                <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"/>
                            </video>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className='bg-zinc-700 h-2'></div>
            <div>

            </div>
            <div className='bg-zinc-700 h-2'></div>
            <div>

            </div>
            <div className='bg-zinc-700 h-2'></div>
            <div>

            </div>
        </div>
    )
}

export default Home