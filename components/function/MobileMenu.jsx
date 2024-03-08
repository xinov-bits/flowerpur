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
    const menuItems = [
        {
            name: 'All Flowers',
            url: '/',
        },
        {
            name: 'Occasions',
            url: '/',
        },
        {
            name: 'Birthday',
            url: '/',
        },
        {
            name: 'Anniversary',
            url: '/',
        },
        {
            name: 'Love & Affection',
            url: '/',
        },
        {
            name: 'Flower in Vase',
            url: '/',
        },
        {
            name: 'Flower gift boxes',
            url: '/',
        },
    ]

    const sideItems = [
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
                                        <div className="flex justify-start items-center w-auto h-auto">
                                            <svg className="flex justify-center items-center w-5 h-5 rotate-90" width={24} height={24}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"
                                                ></use>
                                            </svg>

                                            <div> Back </div>
                                        </div>
                                    </button>
                                </div>

                                {/* <button className="flex justify-center items-center w-14 h-full cursor-pointer bg-white no-outline" onClick={() => {
                                    setIsMobileMenuOpen(false);
                                }}>
                                    <svg className="flex justify-center items-center w-6 h-6 text-[#292929]" width={28} height={28}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"
                                        ></use>
                                    </svg>
                                </button> */}
                            </div>

                            <div className="block justify-start items-start w-full h-auto py-1 my-1 bg-white text-[#191919]">
                                <ul className="flex flex-col justify-start items-center w-full h-auto text-lg font-normal">
                                    {menuItems.map((item) => <li key={item.name} className="flex justify-start items-center w-full p-4 bg-white hover:bg-[#f7f7f7] leading-none hover:underline decoration-[0.5px] underline-offset-2">
                                        <Link href={item.url} className="flex justify-start items-center w-full no-outline">
                                            {item.name}
                                        </Link>
                                    </li>)}
                                </ul>
                            </div>

                            <div className="absolute bottom-0 justify-start items-start w-full h-auto pt-2 bg-white text-[#191919] border-t border-[#e5e5e5]">
                                <ul className="flex flex-col justify-start items-center w-full h-auto text-lg font-normal">
                                    {sideItems.map((item) => <li key={item.name} className="flex justify-start items-center w-full p-4 bg-white hover:bg-[#f7f7f7] leading-none hover:underline decoration-[0.5px] underline-offset-2">
                                        <Link href={item.url} className="flex justify-start items-center w-full no-outline space-x-2">
                                            <svg className="flex justify-center items-cener w-6 h-6" width={20} height={20}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref={`/on/demandware/svg/non-critical.svg#${item.icon}`}
                                                ></use>
                                            </svg>

                                            <div>
                                                {item.name}
                                            </div>
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