'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext } from 'react'
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

export const UserSidebar = () => {
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
            name: 'orders',
            lists: [
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
            ]
        },
        {
            name: 'account',
            lists: [
                {
                    name: 'Details',
                    url: '/user/orders',
                },
                {
                    name: 'Addresses',
                    url: '/user/orders',
                },
            ]
        },
        {
            name: 'settings',
            lists: [
                {
                    name: 'Help',
                    url: '/user/orders',
                },
                {
                    name: 'Sign out',
                    url: '/user/orders',
                },
            ]
        },
    ]

    return (
        <>
            <div className="hidden sm:hidden md:block lg:block xl:block items-start w-[20%] h-full bg-[#f7f7f7] border-r-[1.5px] border-[#e5e5e5] text-[#191919] select-none">
                <div className="block justify-start items-center w-full h-auto p-4 border-b-[1.5px] border-[#e5e5e5]">
                    <div className="flex justify-start items-center w-full text-xl font-bold !leading-none capitalize">
                        🌻 Hello {userName}
                    </div>
                </div>

                <div className="block justify-start items-center w-full h-auto mt-4">
                    <ul className="block justify-start items-center w-full text-base font-medium space-y-[1.85rem]">
                        {menu.map((item, index) => <li key={index} className="block justify-center items-center w-full !leading-none">
                            <div className="flex justify-start items-center w-full px-4 text-sm font-bold uppercase tracking-wide">
                                {item.name}
                            </div>

                            <ul className="block justify-start items-center w-full mt-2 text-base font-medium capitalize">
                                {item.lists.map((k, index) => <li key={index} className="flex justify-start items-center w-full py-2 bg-[#f7f7f7] hover:bg-[#f0f0f0] px-4">
                                    <Link href={k.url} className="flex justify-start items-center w-full no-outline">
                                        {k.name}
                                    </Link>
                                </li>)}
                            </ul>
                        </li>)}
                    </ul>
                </div>
            </div>
        </>
    )
}
