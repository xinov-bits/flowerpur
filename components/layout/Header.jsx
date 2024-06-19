'use client';

// REACT JS
import React, { useState, useEffect, useContext, useRef } from 'react';
import { getCookie } from 'cookies-next';

// NEXT JS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

// CONTEXT
import CartContext from '@/context/CartContext';
// import UserContext from '@/context/UserContext';

// COMPONENTS
import Cart from '../function/Cart';
import UserMenu from '../function/UserMenu';
import AuthButtons from '../function/AuthButtons';

// NEXT-AUTH
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";


const Header = () => {
    // USE CONTEXT
    const {
        numTotal,

        // isHeader,
        // setIsHeader,
    } = useContext(CartContext)
    // const {
    //     user,
    //     isUserSignedIn,
    // } = useContext(UserContext)


    // USER
    const { status } = useSession();


    const router = useRouter();
    const query = useSearchParams();


    // CART SIDEMENU
    const [isCartOpen, setIsCartOpen] = useState(false);


    // ADDRESS
    // const [isAddressChooser, setIsAddressChooser] = useState(false)

    // const [userAddress, setUserAddress] = useState([])

    // useEffect(() => {
    //     setUserAddress(getCookie('user_address')?.split(', '))
    // }, [getCookie('user_address')])


    // SIDE MENU
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


    // USER MENU
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)


    return (
        <>
            <header>
                <div className="fixed top-0 z-[500] hidden sm:hidden md:block lg:block xl:block items-center w-full bg-white text-[#292929] border-b border-[#e5e5e5]">
                    <div className="flex justify-center items-center w-full h-14 px-8 select-none">
                        <div className="flex justify-between items-center w-full h-10 space-x-6 select-none">
                            <div className="flex justify-start items-center w-[20%] h-full cursor-pointer">
                                <div className="flex justify-start items-center w-[10rem] h-full cursor-pointer overflow-hidden">
                                    <Link className="flex justify-start items-center w-full h-full no-outline" href={'/'}>
                                        <svg className="flex justify-center items-center h-6" width={177} height={27}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/critical.svg#giftpur"
                                            ></use>
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            <div className="flex justify-end items-center w-auto h-full">
                                <ul className="flex justify-end items-center w-full h-full space-x-2 text-base font-medium">
                                    <li className="relative flex flex-col justify-center items-center size-10 hover:bg-[#eeeeee] rounded-[--global-radius-full] cursor-pointer duration-100">
                                        <svg className="flex justify-center items-center size-6" width={20} height={20} fill="none">
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-love"
                                            ></use>
                                        </svg>

                                        <span className="absolute top-1.5 right-1.5 flex justify-center items-center text-[9px] size-[13px] bg-[--global-button-color-default] text-white font-medium rounded-[--global-radius-full] !leading-none">
                                            {numTotal ? numTotal : 0}
                                        </span>
                                    </li>

                                    <AuthButtons />

                                    <li className="relative flex flex-col justify-center items-center size-10 hover:bg-[#eeeeee] rounded-[--global-radius-full] cursor-pointer duration-100" onClick={() => {
                                        setIsCartOpen(true)
                                    }}>
                                        <svg className="flex justify-center items-center size-6" width={20} height={20}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/critical.svg#icon-basket"
                                            ></use>
                                        </svg>

                                        <span className="absolute top-1.5 right-1.5 flex justify-center items-center text-[9px] size-[13px] bg-[--global-button-color-default] text-white font-medium rounded-[--global-radius-full] !leading-none">
                                            {numTotal ? numTotal : 0}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

                <UserMenu isUserMenuOpen={isUserMenuOpen} setIsUserMenuOpen={setIsUserMenuOpen} />
            </header>
        </>
    )
}

export default Header