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

// CONTEXT
import CartContext from '@/context/CartContext';

// MUI
import { IconButton } from '@mui/material';

const Cart = ({ isCartOpen, setIsCartOpen }) => {
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


    // SWIPE TO CLOSE
    const [dragStartX, setDragStartX] = useState(0);
    const dragX = useMotionValue(0);

    const handleTouchStart = (e) => {
        setDragStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        const offsetX = e.touches[0].clientX - dragStartX;

        if (offsetX >= 0) {
            dragX.set(offsetX);
        } else {
            dragX.set(0);
        }
    };

    const handleTouchEnd = (e) => {
        const offsetX = e.changedTouches[0].clientX - dragStartX;

        if (offsetX <= 200) {
            dragX.set(0, { duration: 0.15 });
        }
        else if (offsetX > 200) {
            dragX.set(450, { duration: 0.15 });

            setIsCartOpen(false);
            setIsCartOpenATC(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {(isCartOpen || isCartOpenATC) && (
                    <motion.div
                        id="cart"
                        className="fixed z-[600] top-0 right-0 flex justify-end items-center w-full h-screen select-none duration-75"
                        style={{ x: dragX }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}

                        initial={{ x: 400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="absolute z-[610] top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-0" onClick={() => {
                            setIsCartOpen(false);
                            setIsCartOpenATC(false);
                        }} />

                        <div className="relative z-[620] flex flex-col justify-start items-start w-full sm:w-full md:w-[32%] lg:w-[32%] xl:w-[32%] h-full bg-white border-l border-[#e5e5e5]">
                            <div className="flex justify-between items-center w-full h-14 bg-white border-b border-[#e5e5e5]">
                                <div className="flex justify-start items-center w-auto px-4 sm:px-4 md:px-6 lg:px-6 xl:px-6 py-4 sm:py-4 md:py-6 lg:py-6 xl:py-6 text-lg font-bold text-[#191919] leading-none cursor-pointer">
                                    Your Cart
                                    &#40;{numTotal}&#41;
                                </div>

                                <button className="flex justify-center items-center w-14 h-full cursor-pointer  no-outline" onClick={() => {
                                    setIsCartOpen(false);
                                    setIsCartOpenATC(false);
                                }}>
                                    <svg className="flex justify-center items-center w-6 h-6 text-[#292929]" width={28} height={28}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"
                                        ></use>
                                    </svg>
                                </button>
                            </div>

                            <div className="block justify-start items-start w-full h-screen pb-4 bg-whites">
                                <ul className="flex flex-col justify-start items-center w-full h-[32rem] text-[#191919] overflow-y-auto">
                                    {mappedCart.map((item, index) => {
                                        return (<li key={index} className="flex justify-between items-center w-full h-28 px-4 sm:px-4 md:px-6 lg:px-6 xl:px-6 border-b border-[#e5e5e5] last:border-b-0 bg-white hover:bg-[#f7f7f7] cursor-pointer">
                                            <Link className="flex justify-center items-center w-[30%] h-full no-outline" href={`/${item.url}`}>
                                                <div className="relative flex justify-start items-center w-full h-full overflow-hidden">
                                                    <Image className="flex justify-center items-center w-[5.5rem] h-[5.5rem] rounded-md overflow-hidden no-outline"
                                                        src={item.img}
                                                        width={800}
                                                        height={800}
                                                        alt={item.slug}
                                                    />
                                                </div>
                                            </Link>

                                            <div className="flex justify-start items-center w-[70%] h-[85%] text-[#191919]">
                                                <div className="flex flex-col justify-start items-center w-[58%] h-full text-start font-semibold">
                                                    <Link className="flex justify-center items-start w-full h-full no-outline" href={`/product/${item.url}`}>
                                                        <div className="flex justify-start items-start w-full h-auto capitalize leading-tight hover:underline decoration-[#797979] decoration-[0.5px] underline-offset-2 cursor-pointer" onClick={() => {
                                                            setIsCartOpen(false);
                                                            setIsCartOpenATC(false);
                                                        }}>
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

                                                <div className="flex justify-end items-center w-[42%] h-full">
                                                    <div className="flex justify-center items-center w-full h-full">
                                                        <div className="flex justify-between items-center w-full h-[2.75rem] sm:h-[2.75rem] md:h-10 lg:h-10 xl:h-10 px-1 bg-[#f7f7f7] rounded-full border border-[#e5e5e5] text-[#292929] overflow-hidden no-outline">
                                                            {!(cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'delete') && <button className="flex justify-center items-center w-[2.125rem] sm:w-[2.125rem] md:w-7 lg:w-7 xl:w-7 h-[2.125rem] sm:h-[2.125rem] md:h-7 lg:h-7 xl:h-7 bg-white rounded-full border border-[#e5e5e5] no-outline" onClick={() =>
                                                                removeProductToCart(
                                                                    item.url,
                                                                    item.url,
                                                                    item.qty,
                                                                    item.availableQty,
                                                                    item.price,
                                                                    item.img,
                                                                    item.name,
                                                                )
                                                            }>
                                                                <svg className="" width={14} height={14}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-bin_dd"
                                                                    ></use>
                                                                </svg>
                                                            </button>}
                                                            {(cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'delete') && <button className="flex justify-center items-center w-[2.125rem] sm:w-[2.125rem] md:w-7 lg:w-7 xl:w-7 h-[2.125rem] sm:h-[2.125rem] md:h-7 lg:h-7 xl:h-7 bg-white rounded-full border border-[#e5e5e5] cursor-default overflow-hidden no-outline">
                                                                <svg className="animate-[spin_600ms_linear_infinite]" width={12} height={12}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                                    ></use>
                                                                </svg>
                                                            </button>}

                                                            <div className="flex justify-center items-center w-auto font-semibold text-sm sm:text-sm md:text-base lg:text-base xl:text-base">
                                                                {item.qty}×
                                                            </div>

                                                            {!(cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'add') && <button className="flex justify-center items-center w-[2.125rem] sm:w-[2.125rem] md:w-7 lg:w-7 xl:w-7 h-[2.125rem] sm:h-[2.125rem] md:h-7 lg:h-7 xl:h-7 bg-white rounded-full border border-[#e5e5e5] no-outline" onClick={() =>
                                                                addProductToCart(
                                                                    item.url,
                                                                    item.url,
                                                                    1,
                                                                    item.availableQty,
                                                                    item.price,
                                                                    item.img,
                                                                    item.name,
                                                                )
                                                            }>
                                                                <svg className="" width={14} height={14}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-plus_dd"
                                                                    ></use>
                                                                </svg>
                                                            </button>}
                                                            {(cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'add') && <button className="flex justify-center items-center w-[2.125rem] sm:w-[2.125rem] md:w-7 lg:w-7 xl:w-7 h-[2.125rem] sm:h-[2.125rem] md:h-7 lg:h-7 xl:h-7 bg-white rounded-full border border-[#e5e5e5] cursor-default overflow-hidden no-outline">
                                                                <svg className="animate-[spin_600ms_linear_infinite]" width={12} height={12}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                                    ></use>
                                                                </svg>
                                                            </button>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>)
                                    })}
                                </ul>

                                <div className="flex justify-center items-center w-full h-16 p-4 pb-0 border-t border-[#e5e5e5]">
                                    {subTotal > 0 ? (
                                        <div className="flex justify-center items-center w-full h-full">
                                            <button className="flex justify-between items-center w-full h-full px-4 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] rounded-full text-white font-bold duration-75" onClick={() => {
                                                setIsCartOpen(false);
                                                setIsCartOpenATC(false);

                                                router.push('/cart/checkout');
                                            }}>
                                                <div className="flex justify-start items-center w-auto h-full">
                                                    Checkout
                                                </div>

                                                <div className="flex justify-start items-center w-auto h-full">
                                                    ₹{subTotal}.00
                                                </div>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-center w-full h-full px-4 bg-[#085b45] rounded-full text-white font-bold saturate-0 opacity-40">
                                            <div className="flex justify-start items-center w-auto h-full">
                                                Checkout
                                            </div>

                                            <div className="flex justify-start items-center w-auto h-full">
                                                ₹{subTotal.toFixed(2)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Cart