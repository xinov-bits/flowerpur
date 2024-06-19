'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext, useRef } from 'react'
import { getCookie, getCookies, hasCookie, setCookie } from 'cookies-next'

// NEXT JS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

// FRAMER
import { motion, AnimatePresence } from "framer-motion";

// AXIOS
import axios from 'axios';

// CONTEXT
import CartContext from '@/context/CartContext';
import UserContext from '@/context/UserContext';

// COMPONENTS
import Cart from '../function/Cart';

// MOMENT JS
import moment from 'moment';

export const MobileUserSidebar = () => {
    // USE CONTEXT
    const {
        cart,
        subTotal,
        numTotal,
        mrpTotal,
        favList,
        recentView,
        addToCart,
        clearCart,
        removeFromCart,
        removeAtOnce,
        isCartOpenATC,
        setIsCartOpenATC,

        isHeader,
        setIsHeader,
    } = useContext(CartContext);
    const {
        user,
        isUserSignedIn,
    } = useContext(UserContext);

    const router = useRouter();


    // USER
    const [userName, setUserName] = useState('')

    useEffect(() => {
        if (isUserSignedIn) {
            if (!(user === undefined || user === null || user === '')) {
                setUserName(JSON.parse(user)[0])
            }
        }
    }, [isUserSignedIn, user])


    // MENU
    const menu = [
        {
            name: 'Order History',
            url: '/user/orders?ref=order_history',
        },
        {
            name: 'Active Orders',
            url: '/user/orders',
        },
        {
            name: 'Cancelled Orders',
            url: '/user/orders',
        },
        {
            name: 'Invoices',
            url: '/user/orders',
        },
        {
            name: 'Details',
            url: '/user/orders',
        },
        {
            name: 'Addresses',
            url: '/user/orders',
        },
        {
            name: 'Help',
            url: '/user/orders',
        },
        {
            name: 'Sign out',
            url: '/user/orders',
        },
    ]

    const menuRef = useRef(null);
    let lastScrollLeft = 0;
    const [menuReachedEnd, setMenuReachedEnd] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const menuElement = menuRef.current;
            if (!menuElement) return;

            const isAtEnd = menuElement.scrollLeft + menuElement.clientWidth >= menuElement.scrollWidth;
            if (isAtEnd) {
                setMenuReachedEnd(true);
            }
            else {
                setMenuReachedEnd(false)
            }
        };

        const menuElement = menuRef.current;
        if (menuElement) {
            menuElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (menuElement) {
                menuElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <>
            <div className="block sm:block md:hidden lg:hidden xl:hidden items-start w-full h-auto bg-[#f7f7f7] border-r-[1.5px] border-[#e5e5e5] text-[#191919] select-none">
                <div className="block justify-start items-center w-full h-auto p-4 border-b-[1.5px] border-[#e5e5e5]">
                    <div className="flex justify-start items-center w-full text-xl font-bold !leading-none capitalize">
                        🌻 Hello {userName}
                    </div>
                </div>

                <div className="relative flex justify-start items-center w-full h-auto px-4 overflow-hidden">
                    <ul
                        id="menuElement"
                        ref={menuRef}
                        className="flex justify-start items-center w-[100rem] text-base font-medium space-x-4 overflow-x-auto"
                    >
                        {menu.map((k, index) => <li key={index} className="flex justify-start items-center w-auto py-4 bg-[#f7f7f7] leading-none text-base font-medium capitalize">
                            <Link href={k.url} className="flex justify-start items-center w-max no-outline">
                                {k.name}
                            </Link>
                        </li>)}
                    </ul>

                    {!menuReachedEnd && <div className="absolute right-0 flex justify-end items-center w-20 h-full bg-gradient-to-l from-[#f7f7f7] to-transparent pointer-events-none" />}
                </div>
            </div>
        </>
    )
}
