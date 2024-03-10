"use client"

import React, { useState, useEffect, useContext } from 'react'

// NEXT JS
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// CRYPTO JS
import CryptoJS from 'crypto-js'

// AXIOS
import axios from 'axios';

// FRAMER
import { motion, AnimatePresence } from "framer-motion"

// CONTEXT
import CartContext from '@/context/CartContext';

const Page = () => {
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
    } = useContext(CartContext);

    const router = useRouter();


    const mappedCart = Object.keys(cart).map((k) => cart[k]);

    // ADD TO CART
    const [cartLoading, setCartLoading] = useState([false, '', '']);

    const addProductToCart = (itemCode, url, qty, availableQty, price, img, name, offer) => {
        setCartLoading([true, url, 'add']);

        setTimeout(() => {
            setCartLoading([false, '', '']);

            addToCart(
                itemCode,
                url,
                qty,
                availableQty,
                price,
                img,
                name,
                offer,
            );
        }, 800);
    }
    const removeProductToCart = (itemCode, url, qty, availableQty, price, img, name, offer) => {
        setCartLoading([true, url, 'delete']);

        setTimeout(() => {
            setCartLoading([false, '', '']);

            removeFromCart(
                itemCode,
                url,
                qty,
                availableQty,
                price,
                img,
                name,
                offer,
            );
        }, 800);
    }

    return (
        <>
            <div className="block justify-center items-start w-full h-screen bg-white text-[#494949]">
                <div className="flex justify-center items-center w-full h-14 px-6 sm:px-6 md:px-10 lg:px-10 xl:px-10 bg-white border-b border-[#e5e5e5]">
                    <div className="flex justify-start items-center w-auto h-full">
                        <button className="flex justify-start items-center w-auto h-full no-outline" onClick={() => {
                            router.back();
                        }}>
                            <div className="flex justify-start items-center w-auto h-full font-medium text-[#767676]">
                                <svg className="flex justify-center items-center w-5 h-5 rotate-90" width={24} height={24}>
                                    <use
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"
                                    ></use>
                                </svg>

                                <div> back </div>
                            </div>
                        </button>
                    </div>

                    <Link className="flex justify-center items-center w-full h-full no-outline" href={'/'}>
                        <div className="flex justify-center items-center w-full h-full">
                            <svg className="flex justify-center items-center w-44 h-full" width={760} height={120}>
                                <use
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    xlinkHref="/on/demandware/svg/logo.svg#logo2"
                                ></use>
                            </svg>
                        </div>
                    </Link>
                </div>

                <div className="flex justify-between items-start w-full h-full">
                    <div className="flex flex-col justify-start items-center w-full h-full pt-4 sm:pt-4 md:pt-8 lg:pt-8 xl:pt-8 px-6 sm:px-6 md:px-10 lg:px-10 xl:px-10 select-none overflow-hidden">
                        <div className="flex justify-start items-center w-full !leading-none text-xl sm:text-xl md:text-3xl lg:text-3xl xl:text-3xl font-bold text-[#191919]">
                            Checkout
                        </div>

                        {/* <div className="block justify-start items-center w-full h-auto mt-6 bg-white border border-[#e5e5e5] rounded-lg overflow-hidden">
                            <div className="flex justify-start items-center w-full px-2 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-3 sm:py-3 !leading-none text-[#797979] text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">
                                Cart &#40;{numTotal}&#41;
                            </div>

                            <ul className="flex flex-col justify-start items-center w-full h-auto max-h-[26.5rem] text-[#191919] overflow-y-auto">
                                {mappedCart.map((item, index) => {
                                    return (<li key={index} className="flex justify-between items-center w-full h-28 px-2 sm:px-2 md:px-4 lg:px-4 xl:px-4 bg-white hover:bg-[#f7f7f7] cursor-pointer border-b border-[#e5e5e5] last:border-0">
                                        <Link className="flex justify-start items-center w-[20%] h-full no-outline" href={`/${item.url}`}>
                                            <div className="relative flex justify-start items-center w-full h-full overflow-hidden">
                                                <Image className="flex justify-center items-center w-[5.5rem] h-[5.5rem] rounded-md overflow-hidden no-outline"
                                                    src={item.img}
                                                    width={800}
                                                    height={800}
                                                    alt={item.slug}
                                                />
                                            </div>
                                        </Link>

                                        <div className="flex justify-start items-center w-[80%] h-[85%] text-[#191919]">
                                            <div className="flex flex-col justify-start items-center w-[58%] h-full text-start font-semibold">
                                                <Link className="flex justify-center items-start w-full h-full no-outline" href={`/product/${item.url}`}>
                                                    <div className="flex justify-start items-start w-full h-auto capitalize leading-tight hover:underline decoration-[#797979] decoration-[0.5px] underline-offset-2 cursor-pointer">
                                                        <p className="line-clamp-2 text-ellipsis overflow-y-hidden"> {item.name} </p>
                                                    </div>
                                                </Link>

                                                {item.offer === 'buy-2-get-1-free' && <div className="flex justify-start items-start w-full h-auto">
                                                    <div className="relative flex justify-center items-center w-auto h-6 px-2 leading-none bg-[#ffcc29] text-[#292929] rounded text-[10px] sm:text-[10px] md:text-xs lg:text-xs xl:text-xs  anim__pulse-wave">
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
                                                    </div>
                                                </div>}

                                                <div className="flex justify-start items-end w-full h-auto mt-1">
                                                    ₹{(item.price) * item.qty}.00
                                                </div>
                                            </div>
                                        </div>
                                    </li>)
                                })}
                            </ul>
                        </div> */}
                    </div>

                    <div className="flex justify-end items-center w-full h-full">
                        <div className="flex justify-end items-center w-full h-full bg-[#f7f7f7]">
                            <li className="flex justify-center items-center w-full h-full">

                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page