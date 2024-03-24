"use client"

import React, { useState, useEffect, useContext, Suspense } from 'react'

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

// COMPONENTS
import { Search } from '@/components/core/Search'

const Page = () => {
    return (
        <>
            <Suspense>
                <div className="block justify-start items-start w-full h-auto bg-white">
                    <Search />
                </div>
            </Suspense>
        </>
    )
}

export default Page