'use client';

// REACT JS
import React, { useState, useContext } from 'react'

// NEXT JS
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// CONTEXT
import CartContext from '@/context/CartContext';
import UserContext from '@/context/UserContext';

// FRAMER
import { motion, AnimatePresence } from "framer-motion";

const MobileBar = () => {
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

    const pathname = usePathname();


    // ITEMS
    const menuItems = [
        {
            name: 'Home',
            link: `/`,
            icon: 'icon-home_dd2',
            padding: 'p-0.5'
        },
        {
            name: 'Flowers',
            link: `/flowers`,
            icon: 'icon-flower_dd',
            padding: 'p-0.5'
        },
        {
            name: 'Browse',
            link: `/search`,
            icon: 'icon-browse_dd',
            padding: 'p-0.5'
        },
        {
            name: 'Orders',
            link: `/user/orders`,
            icon: 'icon-orders_dd',
            padding: 'p-0.5'
        },
        {
            name: 'User',
            link: `/user`,
            icon: 'icon-user_dd',
            padding: 'p-0.5'
        },
    ]

    return (
        <>
            <div className="fixed bottom-0 z-[500] block sm:block md:hidden lg:hidden xl:hidden items-center w-full h-auto select-none bg-white shadow-[0px_0px_15px_4px_rgba(25,25,25,0.1)]">
                <ul className="flex justify-center items-center w-full h-full">
                    {menuItems.map((item, index) => {
                        return (
                            <li key={index} className={`flex justify-center items-center w-full h-full py-2.5 ${pathname === item.link ? 'text-[#085b45]' : 'text-[#848484]'} duration-200`}>
                                <Link href={item.link} className="no-outline">
                                    <div className="relative flex flex-col justify-center items-center w-full h-full">
                                        <div className="relative z-[2] flex justify-center items-center w-full h-full">
                                            <svg className={`size-8 ${item.padding}`} width={24} height={24}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref={`/on/demandware/svg/non-critical.svg#${item.icon}`}
                                                ></use>
                                            </svg>
                                        </div>

                                        <div className="flex justify-center items-center w-auto text-sm font-semibold">
                                            {item.name}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default MobileBar