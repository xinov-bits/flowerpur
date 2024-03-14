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

// COMPONENTS
import { UserSidebar } from '@/components/layout/UserSidebar'
import { MobileUserSidebar } from '@/components/layout/MobileUserSidebar'
import { Orders } from '@/components/core/User/Orders/Orders'

const Page = () => {
  return (
    <>
      <div className="block sm:block md:flex lg:flex xl:flex justify-start items-start w-full h-screen bg-white text-[#191919]">
        <UserSidebar />
        <MobileUserSidebar />

        {/* Orders */}
        <Orders />

      </div>
    </>
  )
}

export default Page