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

const ProductCard = ({ itemCode, slug, qty, availableQty, price, dimg, title, offer, ratings }) => {
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
                className="relative flex flex-col justify-start items-center w-full bg-white rounded-md cursor-pointer select-none group">
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

                        <div className="absolute top-1 left-1 flex justify-center items-center space-x-1 overflow-hidden">
                            {JSON.stringify(offer)?.includes('buy-2-get-1-free') && (<div className="flex justify-center items-center w-auto h-6 px-1.5 rounded bg-[#ffcc29] leading-none text-xs font-bold text-[#191919] overflow-hidden  anim__pulse-wave">
                                <div className="flex justify-center items-center w-4 h-4 pr-1 mr-0.5">
                                    <svg className="flex justify-center items-center w-3 h-3" width={24} height={24}>
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

                            {(ratings !== undefined && ratings !== null && ratings.includes(slug)) && (<div className="flex justify-center items-center w-auto h-6 px-1 rounded bg-[#085b45] leading-none text-xs font-bold text-white overflow-hidden">
                                <div className="flex justify-center items-center w-4 h-4">
                                    <svg className="flex justify-center items-center w-4 h-4" width={24} height={24}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-star_dd"
                                        ></use>
                                    </svg>
                                </div>
                            </div>)}
                        </div>
                    </motion.div>
                </div>

                <Link href={`/product/${slug}`} className="flex justify-start items-center w-full no-outline">
                    <div className="flex justify-start items-start w-full h-12 mt-2 font-bold text-[#191919] capitalize line-clamp-3 text-lg text-ellipsis leading-tight overflow-y group-hover:underline text-left">
                        {title}
                    </div>
                </Link>

                <div className="flex justify-between items-center w-full h-auto">
                    <div className="flex justify-start items-center w-auto space-x-1 text-base sm:text-base md:text-lg lg:text-lg xl:text-lg font-bold">
                        <div className="flex justify-start items-center w-auto text-[#c6222b]">
                            ₹{price}.00
                        </div>

                        <div className="flex justify-start items-center w-auto text-[#767676] font-medium line-through">
                            ₹{price}.00
                        </div>
                    </div>

                    <div className="flex justify-end items-center w-auto text-sm font-semibold text-[#191919]">
                        <Link href={`/product/${slug}`} className="no-outline">
                            <button className="flex justify-center items-center w-auto py-1.5 px-1.5 sm:px-1.5 md:px-2.5 lg:px-2.5 xl:px-2.5 bg-white rounded-full border-[1.5px] border-[#e5e5e5] hover:bg-[#f7f7f7] space-x-1 no-outline">
                                <svg className="text-[#191919]" width={18} height={18}>
                                    <use
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-cart_dd"
                                    ></use>
                                </svg>

                                <div className="hidden sm:hidden md:block lg:block xl:block"> Add to cart </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default ProductCard