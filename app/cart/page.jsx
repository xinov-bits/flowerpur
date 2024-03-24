"use client"

import React, { useState, useEffect, useContext } from 'react'

// NEXT JS
import Link from 'next/link'
import Image from 'next/image'

// CRYPTO JS
import CryptoJS from 'crypto-js'

// AXIOS
import axios from 'axios';

// FRAMER
import { motion, AnimatePresence } from "framer-motion"

// CONTEXT
import CartContext from '@/context/CartContext';

const Page = () => {
    return (
        <>
            <div className="block justify-start items-start w-full h-auto bg-white py-4 sm:py-4 md:py-8 lg:py-8 xl:py-8 text-[#494949]">
                <div className="block w-full h-auto px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8">
                    <div className="flex flex-col justify-start items-center w-full select-none">
                        <div className="flex justify-start items-center w-full text-2xl font-bold text-[#191919]">
                            Cart
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page