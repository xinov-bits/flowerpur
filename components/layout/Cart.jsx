'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext } from 'react'
import { useCookies } from 'react-cookie'; // Import useCookies hook

// NEXT JS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

// SUB COMPONENTS

// FRAMER
import { motion, AnimatePresence } from "framer-motion";

// CONTEXT
import CartContext from '@/context/CartContext';

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
    } = useContext(CartContext);

    const mappedCart = Object.keys(cart).map((k) => cart[k])


    // ADD TO CART
    const [cartLoading, setCartLoading] = useState([false, '', '']);

    const addProductToCart = (itemCode, url, qty, availableQty, price, img, name) => {
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
            );
        }, 800);
    }
    const removeProductToCart = (itemCode, url, qty, availableQty, price, img, name) => {
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
            );
        }, 800);
    }

    return (
        <>
            <AnimatePresence>
                {isCartOpen && (
                    <motion.div className="fixed z-[600] top-0 right-0 flex justify-end items-center w-full h-screen select-none"
                        initial={{ x: 400, opacity: 0.6 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 400, opacity: 0.6 }}
                        transition={{
                            ease: "linear",
                        }}
                    >
                        <div className="absolute z-[610] top-0 left-0 flex justify-center items-center w-full h-full" onClick={() => setIsCartOpen(false)} />

                        <div className="relative z-[620] flex flex-col justify-start items-start w-full sm:w-full md:w-[32%] lg:w-[32%] xl:w-[32%] h-full bg-white border-l border-[#e5e5e5] shadow-lg shadow-black/10">
                            <div className="flex justify-start items-center w-full h-10 px-2 py-6 bg-white border-b border-[#e5e5e5]">
                                <button className="flex justify-center items-center w-10 h-10 hover:bg-[#f7f7f7] rounded-full cursor-pointer" onClick={() => setIsCartOpen(false)}>
                                    <svg className="w-6 h-6 text-[#292929]" width={28} height={28}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"
                                        ></use>
                                    </svg>
                                </button>
                            </div>

                            <div className="block justify-start items-start w-full h-full py-4 bg-white">
                                <div className="flex justify-start items-center w-full px-6 text-lg font-bold text-[#191919] leading-none">
                                    Your Cart
                                </div>

                                <ul className="flex flex-col justify-start items-center w-full h-full mt-4 text-[#191919] overflow-y-auto">
                                    {mappedCart.map((item) => {
                                        return (<li className="flex justify-between items-center w-full h-28 px-6 border-t border-[#e5e5e5] bg-white hover:bg-[#f7f7f7] cursor-pointer last:border-b last:border-[#e5e5e5]" key={item.slug}>
                                            <Link className="flex justify-center items-center w-[30%] h-full" href={`/${item.url}`}>
                                                <div className="relative flex justify-start items-center w-full h-full overflow-hidden">
                                                    <div className="absolute top-2 right-4 flex justify-center items-center w-5 h-5 bg-[#eb1700] rounded-full text-white text-xs font-bold">
                                                        {item.qty}
                                                    </div>

                                                    <Image className="flex justify-center items-center w-20 h-20 border border-[#e5e5e5] rounded-md overflow-hidden"
                                                        src={item.img}
                                                        width={800}
                                                        height={800}
                                                        alt={item.slug}
                                                    />
                                                </div>
                                            </Link>

                                            <div className="flex justify-start items-center w-[70%] h-[85%] text-[#191919]">
                                                <div className="flex flex-col justify-start items-center w-[62%] h-full text-start font-semibold">
                                                    <Link className="flex justify-center items-start w-full h-full" href={`/${item.url}`}>
                                                        <div className="flex justify-start items-start w-full h-auto capitalize line-clamp-3 text-ellipsis leading-tight overflow-y-hidden hover:underline decoration-[#797979] decoration-[0.5px] underline-offset-2 cursor-pointer">
                                                            {item.name}
                                                        </div>
                                                    </Link>

                                                    <div className="flex justify-start items-end w-full h-auto mt-1">
                                                        ₹{item.price}.00
                                                    </div>
                                                </div>

                                                <div className="flex justify-end items-center w-[38%] h-full">
                                                    <div className="flex justify-center items-center w-full h-full">
                                                        <button className="flex justify-between items-center w-full h-8 bg-[#f7f7f7] rounded-full shadow-lg shadow-black/10 text-[#292929] overflow-hidden">
                                                            {!(cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'delete') && <button className="flex justify-center items-center w-8 h-8 bg-white rounded-full" onClick={() =>
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
                                                            {(cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'delete') && <button className="flex justify-center items-center w-8 h-8 bg-white rounded-full cursor-default overflow-hidden">
                                                                <svg className="animate-[spin_800ms_linear_infinite]" width={12} height={12}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                                    ></use>
                                                                </svg>
                                                            </button>}

                                                            <div className="flex justify-center items-center w-auto font-semibold">
                                                                {item.qty}×
                                                            </div>

                                                            {!(cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'add') && <button className="flex justify-center items-center w-8 h-8 bg-white rounded-full" onClick={() =>
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
                                                            {(cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'add') && <button className="flex justify-center items-center w-8 h-8 bg-white rounded-full cursor-default overflow-hidden">
                                                                <svg className="animate-[spin_800ms_linear_infinite]" width={12} height={12}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                                    ></use>
                                                                </svg>
                                                            </button>}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>)
                                    })}
                                </ul>

                                <div className="absolute z-[650] bottom-0 flex justify-center items-center w-full h-20 p-4 border-t border-[#e5e5e5]">
                                    <button className="flex justify-between items-center w-full h-full px-4 bg-[#eb1700] hover:bg-[#d91400] active:bg-[#b71000] rounded-full text-white font-bold duration-200">
                                        <div className="flex justify-start items-center w-auto h-full">
                                            Checkout
                                        </div>

                                        <div className="flex justify-start items-center w-auto h-full">
                                            ₹{subTotal}.00
                                        </div>
                                    </button>
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