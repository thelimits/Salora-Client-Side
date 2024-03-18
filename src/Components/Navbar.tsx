"use client"

import React, { useEffect, useState } from 'react'
import logo from '../../public/logo.png'
import { CiSearch, CiUser  } from "react-icons/ci";
import { RiShoppingCartLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuDropdown from './MenuDropdown';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { getRole, getUname } from '@/Server/lib';

export const Navbar = () => {
  return (
    <Router>
        <Header />
    </Router>
  )
}

const Header = () => {
    const navItems = [
        {nav: "PRIA", path: "/s/pria"},
        {nav: "WANITA", path: "/s/wanita"},
        {nav: "SPORTS", path: "/s/sports"},
        {nav: "ANAK", path: "/s/anak"},
        {nav: "LUXURY", path: "/s/luxury"},
        {nav: "BEAUTY", path: "/s/beauty"},
        {nav: "LIFESTYLE", path: "/s/lifestyle"},
    ]
    const [sessionUname, setSessionUname] = useState<string | undefined>();
    const [sessionRole, setSessionRole] = useState<string | undefined>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchUnameCookies = async () => {
            const uname = await getUname();
            setSessionUname(uname);
          };
          fetchUnameCookies();
    }, []);

    useEffect(() => {
        const fetchRoleCookies = async () => {
            const role = await getRole();
            setSessionRole(role);
          };
          fetchRoleCookies();
    }, []);

    return (
        <header className="sticky -top-10 z-10 bg-white px-4 md:top-0 lg:px-12 md:shadow-md">
            <div className='mx-auto flex max-w-screen-xl flex-col items-center gap-y-4 py-4 lg:pb-0'>
                <div className='flex w-full flex-row gap-y-4 tablet:flex-row tablet:items-center tablet:gap-x-8 lg:gap-x-20 items-center justify-around'>
                    <Link className='logo' href="/" aria-label="Salora">
                        <Image alt='' className='w-[120px] h-auto' src={logo}/>  
                    </Link>
                    <div className='basis-1/2'>
                        <div className='flex grow'>
                            <form className='relative flex grow items-center tablet:px-4'>
                                <input className='h-10 w-auto flex-1 grow truncate rounded-full border-2 border-grey-20 py-1 pl-4 pr-9 text-base outline-none'
                                    placeholder='Check Out Salora Menyala 🔥'
                                    autoComplete='off'
                                >
                                </input>
                                <button className='absolute right-1 h-8 w-8 rounded-full bg-black tablet:right-5 justify-center flex items-center'>
                                    <CiSearch className='text-white h-4/5 w-auto'/>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Akun dan shoping button */}
                    <div className='items-center gap-x-6 lg:flex hidden'>
                        <div className='relative flex cursor-pointer items-center gap-x-1'>
                            <div className=':ReLoH1 ' aria-haspopup="menu" aria-expanded="false">
                                <div className='relative flex cursor-pointer items-center hover:after:absolute hover:after:-bottom-1 hover:after:left-0 after:right-0 hover:after:h-1 hover:after:bg-black'> 
                                    {!sessionUname ? (
                                        <div>
                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                <CiUser className='text-black h-7 w-7'/>
                                                <span className='whitespace-nowrap text-sm font-bold text-grey-100'>
                                                    Masuk / Daftar
                                                </span>
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuDropdown />
                                            </Menu>
                                        </div>
                                    ): (
                                        <div className='mt-1'>
                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                <CiUser className='text-black h-7 w-7'/>
                                                <span className='whitespace-nowrap text-sm font-bold text-grey-100'>
                                                    {sessionUname}
                                                </span>
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuDropdown session={sessionUname} role={sessionRole}/>
                                            </Menu>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Link href='/' rel='noindex,nofollow'>
                                <div className='relative hover:after:absolute hover:after:-bottom-0.5 hover:after:left-0 after:right-0 hover:after:h-1 hover:after:bg-black'>
                                    <Button
                                        id="button-wishlist"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block h-7 w-7 "><path d="M16.688 3c-1.936 0-3.631.833-4.688 2.24C10.943 3.832 9.248 3 7.312 3A5.82 5.82 0 001.5 8.813c0 6.562 9.73 11.874 10.145 12.093a.75.75 0 00.71 0c.415-.22 10.145-5.531 10.145-12.093A5.819 5.819 0 0016.687 3zM12 19.387c-1.712-.997-9-5.541-9-10.575A4.318 4.318 0 017.313 4.5c1.823 0 3.354.971 3.993 2.531a.75.75 0 001.388 0c.64-1.563 2.17-2.531 3.993-2.531A4.318 4.318 0 0121 8.813c0 5.025-7.29 9.576-9 10.574z" fill="#000"></path></svg>
                                    </Button>
                                </div>
                            </Link>
                            <div className=':ReCRTH1 ' aria-haspopup="menu" aria-expanded="false">
                                <Link href='/' rel='noindex,nofollow'>
                                    <div className='relative hover:after:absolute hover:after:-bottom-1 hover:after:left-0 after:right-0 hover:after:h-1 hover:after:bg-black'>
                                        <Button
                                            id="button-cart"
                                        >
                                            <RiShoppingCartLine className='text-black h-6 w-6' />
                                        </Button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kategori */}
                <div className='w-full lg:flex ml-36 translate-x-1'>
                    <nav>
                        <ul className='flex gap-x-3 text-sm sm:justify-center xl:justify-normal' aria-expanded="false" aria-haspopup="dialog">
                            {
                                navItems.map(({nav, path}) => (
                                    <li className='z-popover first:-ml-4' key={nav}>
                                        <Link href={path} className='block rounded-tl-2xl rounded-tr-2xl px-4 py-2 font-bold uppercase decoration-transparent decoration-4 underline-offset-8 hover:underline hover:decoration-inherit'>
                                            {nav}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </div>
    </header>
    )
}

export default Navbar;
