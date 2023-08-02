import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import NavbarItem from '@/components/navbarItem';
import { BsFillCaretDownFill, BsSearch, BsBell } from 'react-icons/bs';
import MobileMenu from '@/components/mobileMenu';
import AccountMenu from '@/components/accountMenu';

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showBackground, setShowBackground] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= TOP_OFFSET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, [])

    return (
        <div className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-9' : 'bg-gradient-to-b from-zinc-900 to-transparent'}`}>
                <Image src="/images/logo.png" width={100} height={0} alt='logo'/>
                <div className='flex-row ml-8 gap-7 hidden lg:flex'>
                    <NavbarItem label="Home"/>
                    <NavbarItem label="TV Shows"/>
                    <NavbarItem label="Movies"/>
                    <NavbarItem label="New & Popular"/>
                    <NavbarItem label="My List"/>
                    <NavbarItem label="Browse by Languages"/>
                </div>
                <div className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative' onClick={toggleMobileMenu}>
                    <p className='text-white text-sm'>Browse</p>
                    <BsFillCaretDownFill className={`text-white transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`}/>
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className='flex flex-row ml-auto gap-7 items-center'>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsSearch/>
                    </div>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsBell/>
                    </div>
                    <div className='flex flex-row items-center gap-2 cursor-pointer relative' onClick={toggleAccountMenu}>
                        <div className='w-5 h-5 lg:w-6 lg:h-6 rounded-md overflow-hidden'>
                            <Image src="/images/default-blue.png" width={100} height={0} alt='logo'/>
                        </div>
                            <BsFillCaretDownFill className={`text-white transition ${showAccountMenu ? "rotate-180" : "rotate-0"}`}/>
                            <AccountMenu visible={showAccountMenu}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar