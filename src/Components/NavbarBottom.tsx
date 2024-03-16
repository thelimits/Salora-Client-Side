import React from 'react'
import { CiBoxList, CiUser } from 'react-icons/ci';
import { FaHome, FaShoppingBag } from "react-icons/fa";

export const NavbarBottom = () => {
  return (
    <div className='pt-12 lg:hidden'>
        <nav className='fixed bottom-5 h-[70px] w-full rounded-t-lg bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] grid grid-cols-5 z-global'>
            <a href='/' className='relative flex flex-col items-center justify-center gap-y-1'>
                <FaHome className="w-1/6 h-auto"/>
                <span className='text-xxs font-medium'>
                    Home
                </span>
            </a>
            <a href='/' className='relative flex flex-col items-center justify-center gap-y-1'>
                <CiBoxList className='w-1/6 h-auto' />
                <span className='text-xxs font-medium'>
                    Kategori
                </span>
            </a>
            <a href='/' className='relative flex flex-col items-center justify-center gap-y-1'>
                <FaShoppingBag className='w-1/6 h-auto' />
                <span className='text-xxs font-medium'>
                    Belanja
                </span>
            </a>
            <a href='/' className='relative flex flex-col items-center justify-center gap-y-1'>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block h-9 w-auto "><path d="M16.688 3c-1.936 0-3.631.833-4.688 2.24C10.943 3.832 9.248 3 7.312 3A5.82 5.82 0 001.5 8.813c0 6.562 9.73 11.874 10.145 12.093a.75.75 0 00.71 0c.415-.22 10.145-5.531 10.145-12.093A5.819 5.819 0 0016.687 3zM12 19.387c-1.712-.997-9-5.541-9-10.575A4.318 4.318 0 017.313 4.5c1.823 0 3.354.971 3.993 2.531a.75.75 0 001.388 0c.64-1.563 2.17-2.531 3.993-2.531A4.318 4.318 0 0121 8.813c0 5.025-7.29 9.576-9 10.574z" fill="#000"></path></svg>
                <span className='text-xxs font-medium'>
                    Wishlist
                </span>
            </a>
            <a href='/' className='relative flex flex-col items-center justify-center gap-y-1'>
                <CiUser className='w-1/6 h-auto'/>
                <span className='text-xxs font-medium'>
                    Akun Saya
                </span>
            </a>
        </nav>
    </div>
  )
}

export default NavbarBottom;
