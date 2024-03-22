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

const ProductCard = ({ itemCode, slug, qty, availableQty, price, dimg, title, offer }) => {
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
    } = useContext(CartContext);

    const [addedAnim, setAddedAnim] = useState([false, '']);

    useEffect(() => {
        if (addedAnim[0] === true) {
            setTimeout(() => {
                setAddedAnim([false, '']);
            }, 2000);
        }
    }, [addedAnim])

    return (
        <>
            <motion.div key={itemCode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="relative flex flex-col justify-start items-center w-full bg-white text-[#191919] rounded-md cursor-pointer select-none group">
                <div className="relative flex justify-start items-center w-full rounded-lg overflow-hidden bg-[#fafafa]">
                    <motion.div className="relative flex justify-start items-center w-full rounded-lg overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link href={`/product/${slug}`}>
                            <Image className="flex justify-center items-center w-full h-full no-outline"
                                src={dimg}
                                width={800}
                                height={800}
                                alt={title}
                            />
                        </Link>

                        <div className="absolute top-2 left-0 flex justify-center items-center space-x-1 overflow-hidden">
                            {JSON.stringify(offer)?.includes('buy-2-get-1-free') && (<div className="flex justify-center items-center w-auto h-6 px-2 rounded-r-full bg-[#0e8345] leading-none text-xs font-semibold text-white overflow-hidden">
                                <div className="flex justify-center items-center w-4 h-4 pr-1 mr-0.5">
                                    <svg className="flex justify-center items-center size-2.5" width={24} height={24}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-offers_dd"
                                        ></use>
                                    </svg>
                                </div>

                                <div className="flex justify-start items-center">
                                    Buy 2 Get 1 Free
                                </div>
                            </div>)}
                        </div>
                    </motion.div>
                </div>

                <Link href={`/product/${slug}`} className="flex justify-start items-center w-full no-outline">
                    <div className="flex justify-start items-start w-full h-9 mt-2 font-bold capitalize line-clamp-2 text-base text-ellipsis !leading-none overflow-y group-hover:underline decoration-[0.9px] underline-offset-1 text-left">
                        {title}
                    </div>
                </Link>

                <div className="flex justify-between items-center w-full h-auto text-base font-semibold text-[#0e8345] !leading-none">
                    ₹{price?.toFixed(2)}
                </div>
            </motion.div>
        </>
    )
}

export default ProductCard