'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext } from 'react'
import { useCookies } from 'react-cookie'; // Import useCookies hook

// NEXT JS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// SUB COMPONENTS

// FRAMER
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
    // SWIPE TO CLOSE
    const [dragStartX, setDragStartX] = useState(0);
    const dragX = useMotionValue(0);

    const handleTouchStart = (e) => {
        setDragStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        const offsetX = e.touches[0].clientX - dragStartX;

        if (offsetX <= 0) {
            dragX.set(offsetX);
        } else {
            dragX.set(0);
        }
    };

    const handleTouchEnd = (e) => {
        const offsetX = e.changedTouches[0].clientX - dragStartX;

        if (offsetX >= -200) {
            dragX.set(0, { duration: 0.15 });
        }
        else if (offsetX < -200) {
            dragX.set(-450, { duration: 0.15 });

            setIsMobileMenuOpen(false);
        }
    };


    // MENU
    const [showCategories, setShowCategories] = useState(false)

    const menuItems = [
        {
            name: 'Home',
            url: '/',
            icon: 'icon-home_dd',
        },
    ]
    const sideMenuItems = [
        {
            name: 'Account',
            url: '/',
            icon: 'icon-user_dd',
        },
        {
            name: 'Help',
            url: '/',
            icon: 'icon-help_dd',
        },
        {
            name: 'Track Order',
            url: '/',
            icon: 'icon-pin_dd2',
        },
    ]
    const flowerCategories = [
        {
            name: '🌻 flower in vase',
            url: '/flowers'
        },
        {
            name: '🎂 birthday',
            url: '/flowers'
        },
        {
            name: '🕯️ anniversary',
            url: '/flowers'
        },
        {
            name: '🌹 love & affection',
            url: '/flowers'
        },
        {
            name: '🎁 flower gift boxes',
            url: '/flowers'
        },
    ]

    return (
        <>
            <AnimatePresence>
                {(isMobileMenuOpen) && (
                    <motion.div
                        id="cart"
                        className="fixed z-[600] top-0 left-0 flex justify-start items-center w-full h-screen select-none duration-75"
                        style={{ x: dragX }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}

                        initial={{ x: -400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -400, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="absolute z-[610] top-0 left-0 flex justify-center items-center w-full h-full" onClick={() => {
                            setIsMobileMenuOpen(false);
                        }} />

                        <div className="relative z-[620] flex flex-col justify-start items-start w-full h-full bg-white border-r border-[#e5e5e5] shadow-lg shadow-black/10">
                            <div className="relative flex justify-between items-center w-full h-14 bg-white border-b border-[#e5e5e5] overflow-hidden">
                                <div className="flex justify-start items-center w-full px-4 text-lg font-bold text-[#191919] leading-none cursor-pointer overflow-hidden">
                                    <button className="flex justify-start items-center w-auto h-auto no-outline" onClick={() => {
                                        setIsMobileMenuOpen(false);
                                    }}>
                                        <svg className="flex justify-center items-center w-6 h-6 text-[#494949]" width={24} height={24}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"
                                            ></use>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="block justify-start items-start w-full h-auto bg-white text-[#191919]">
                                <ul className="flex flex-col justify-start items-center w-full h-auto text-lg font-semibold">
                                    {menuItems.map((item) => <li key={item.name} className="flex justify-start items-center w-full p-4 bg-white hover:bg-[#f7f7f7] leading-none hover:underline decoration-[0.5px] underline-offset-2 border-b-[1.5px] border-[#e7e7e7] last:border-0">
                                        <Link href={item.url} className="flex justify-start items-center w-full space-x-1.5 no-outline">
                                            <svg className="flex justify-center items-cener w-6 h-6 text-[#494949]" width={20} height={20}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref={`/on/demandware/svg/non-critical.svg#${item.icon}`}
                                                ></use>
                                            </svg>

                                            <div> {item.name} </div>
                                        </Link>
                                    </li>)}

                                    <li className="block justify-start items-center w-full bg-white leading-none">
                                        <div className="flex justify-start items-center w-full p-4 no-outline" onClick={() => setShowCategories(!showCategories)}>
                                            <div className="flex justify-between items-center w-full">
                                                <div className="flex justify-start items-center w-full space-x-1.5">
                                                    <svg className="flex justify-center items-cener w-6 h-6 text-[#494949]" width={20} height={20}>
                                                        <use
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-e-star_dd"
                                                        ></use>
                                                    </svg>

                                                    <div> Categories </div>
                                                </div>

                                                <div className="flex justify-end items-center w-full">
                                                    <svg className={`flex justify-center items-cener w-6 h-6 text-[#494949] ${showCategories && 'rotate-180'} transition-transform duration-200`} width={20} height={20}>
                                                        <use
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"
                                                        ></use>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {showCategories && <motion.div className="block justify-start items-center w-full"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.1 }}
                                            >
                                                {flowerCategories.map((k, index) => <Link key={index} href={k.url} className="flex justify-start items-center w-full p-4 px-4 bg-white hover:bg-[#f7f7f7] leading-none hover:underline decoration-[0.5px] underline-offset-2 no-outline border-t border-[#e7e7e7]">
                                                    <div className="flex justify-start items-center w-full space-x-1.5">
                                                        <div className="flex justify-start items-center w-full capitalize text-[#494949]">
                                                            {k.name}
                                                        </div>
                                                    </div>
                                                </Link>)}
                                            </motion.div>}
                                        </AnimatePresence>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex justify-start items-center w-full h-2 sm:h-2 md:h-4 lg:h-4 xl:h-4 border-y border-[#e5e5e5] bg-[#f7f7f7]" />

                            <div className="block justify-start items-start w-full h-auto bg-white text-[#191919]">
                                <ul className="flex flex-col justify-start items-center w-full h-auto text-lg font-semibold">
                                    {sideMenuItems.map((item) => <li key={item.name} className="flex justify-start items-center w-full p-4 bg-white hover:bg-[#f7f7f7] leading-none hover:underline decoration-[0.5px] underline-offset-2 border-b-[1.5px] border-[#e7e7e7] pt-1 mt-1">
                                        <Link href={item.url} className="flex justify-start items-center w-full space-x-1.5 no-outline">
                                            <svg className="flex justify-center items-cener w-6 h-6 text-[#494949]" width={20} height={20}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref={`/on/demandware/svg/non-critical.svg#${item.icon}`}
                                                ></use>
                                            </svg>

                                            <div> {item.name} </div>
                                        </Link>
                                    </li>)}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default MobileMenu