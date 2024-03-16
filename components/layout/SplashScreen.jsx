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

// MATERIAL UI
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// CONTEXT
import CartContext from '@/context/CartContext';
import UserContext from '@/context/UserContext';

// COMPONENTS
import Cart from '../function/Cart';

// MOMENT JS
import moment from 'moment';
import MobileMenu from '../function/MobileMenu';

const SplashScreen = () => {
    const router = useRouter();

    return (
        <>
            <div className="hidden fixed z-[9999] top-0 left-0 justify-center items-center w-full h-full bg-white">
                <div className="flex flex-col justify-center items-center w-32 h-auto">
                    <AnimatePresence>
                        <motion.div className="z-[2] flex justify-center items-center w-full h-full"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 0, opacity: 0 }}
                            transition={{
                                delay: 0,
                            }}
                        >
                            <Image className="flex justify-center items-center w-26 h-26"
                                width={110}
                                height={117}
                                src="/assets/Logo/parts/1.svg"
                                alt=""
                            />
                        </motion.div>

                        <motion.div className="z-[1] flex justify-center items-center w-full h-full"
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 0, opacity: 0 }}
                            transition={{
                                delay: 0.3,
                            }}
                        >
                            <Image className="flex justify-center items-center w-full h-auto mt-2"
                                width={142}
                                height={27}
                                src="/assets/Logo/parts/2.svg"
                                alt=""
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default SplashScreen;