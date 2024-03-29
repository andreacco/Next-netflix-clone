import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

interface AccountMenuProps{
    visible?: boolean;
};

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
    
    const { data: session }  = useSession();

    if(!visible){
        return null;
    } return (
        <div className='bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-none flex'>
            <div className='flex flex-col gap-3'>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full '>
                    <Image className='w-8 rounded-md' src="/images/default-blue.png" width={100} height={0} alt='user'/>
                    <p className='text-white text-sm group-hover/item:underline'>{session?.user?.name}</p>
                </div>
                <hr className='bg-gray-600 border-0 h-px my-4' />
                <div className='px-3 text-center text-white text-sm hover:underline' onClick={() => {signOut()}}>
                    Sign out of Netflix
                </div>
            </div>
        </div>
    )
};

export default AccountMenu;