'use client';

// REACT JS
import React, { useState } from 'react'

// NEXT JS
import Link from 'next/link';

// FRAMER
import { motion, useMotionValue, AnimatePresence } from "framer-motion";

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
    const menu = [
        {
            name: 'Home',
            url: '/',
            icon: 'icon-home_dd2',
        },
        {
            name: 'Flowers',
            url: '/flowers',
            icon: 'icon-flower_dd',
        },
        {
            name: 'Offers',
            url: '/',
            icon: 'icon-offers_dd2',
        },
        {
            name: 'Help',
            url: '/',
            icon: 'icon-help_dd',
        },
    ]

    const secondaryMenu = [
        {
            name: 'About Us',
            url: '/',
        },
        {
            name: 'Contact Us',
            url: '/',
        },
    ]


    return (
        <>
            <AnimatePresence>
                {(isMobileMenuOpen) && (
                    <div className="fixed z-[600] top-0 right-0 flex justify-start items-center w-full h-screen select-none duration-75">
                        <motion.div className="absolute z-[610] top-0 right-0 flex justify-center items-center w-full h-full bg-[#262626] bg-opacity-80" onClick={() => {
                            setIsMobileMenuOpen(false);
                        }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />


                        <motion.div className="relative z-[620] flex flex-col justify-start items-start w-full sm:w-full md:w-[28%] lg:w-[28%] xl:w-[28%] h-full py-4 bg-white shadow-[0px_0px_15px_4px_rgba(25,25,25,0.1)]"
                            style={{ x: dragX }}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}

                            initial={{ x: -400, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -400, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="block justify-start items-center w-full h-6 px-4 mb-4">
                                <svg className="flex justify-center items-center size-6 cursor-pointer" width={24} height={24}>
                                    <use
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"
                                    ></use>
                                </svg>
                            </div>

                            <div className="block justify-start items-start w-full h-auto pb-4">
                                <ul className="flex flex-col justify-start items-start w-full h-auto text-[#191919] overflow-y-auto">
                                    {menu.map((item, index) => (
                                        <Link key={index} href={item.url} className="flex justify-start items-center w-full no-outline">
                                            <li key={index} className="flex justify-start items-center w-full h-auto p-4 space-x-2 text-lg font-bold border-b border-[#e5e5e5] bg-white hover:bg-[#f7f7f7] !leading-none cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                                                <svg className="flex justify-center items-center size-[1.3rem] cursor-pointer" width={24} height={24}>
                                                    <use
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        xlinkHref={`/on/demandware/svg/non-critical.svg#${item.icon}`}
                                                    ></use>
                                                </svg>

                                                <div> {item.name} </div>
                                            </li>
                                        </Link>
                                    ))}

                                    <Link className="flex justify-start items-center w-full no-outline" href="/auth/signup">
                                        <li className="flex justify-start items-center w-full h-auto p-4 space-x-2 text-lg font-bold border-b border-[#e5e5e5] bg-white hover:bg-[#f7f7f7] !leading-none cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                                            <svg className="flex justify-center items-center size-[1.3rem] cursor-pointer" width={24} height={24}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-user_dd"
                                                ></use>
                                            </svg>

                                            <div> Sign Up or Sign In </div>
                                        </li>
                                    </Link>
                                </ul>

                                <div className="flex justify-center items-center w-full h-1.5 bg-[#f7f7f7] border-y border-[#e5e5e5]" />

                                <ul className="flex flex-col justify-start items-start w-full h-auto text-[#191919] overflow-y-auto">
                                    {secondaryMenu.map((item, index) => (
                                        <li key={index} className="flex justify-start items-center w-full h-auto p-4 space-x-2 text-base font-semibold bg-white hover:bg-[#f7f7f7] !leading-none cursor-pointer">
                                            <div> {item.name} </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default MobileMenu