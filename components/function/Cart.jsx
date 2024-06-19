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
        extraCart,
        subTotal,
        numTotal,
        mrpTotal,
        favList,
        recentView,
        addToCart,
        clearCart,
        removeFromCart,
        removeAdditionalFromCart,
        removeAtOnce,
        isCartOpenATC,
        setIsCartOpenATC,
    } = useContext(CartContext);

    const router = useRouter();


    const mappedCart = Object.keys(cart).map((k) => cart[k])

    // ADD TO CART
    const [cartLoading, setCartLoading] = useState([false, '', ''])

    const addProductToCart = (itemCode, url, qty, availableQty, price, img, name, offer) => {
        setCartLoading([true, url, 'add'])

        setTimeout(() => {
            setCartLoading([false, '', ''])

            addToCart(
                itemCode,
                url,
                qty,
                availableQty,
                price,
                img,
                name,
                offer,
            )
        }, 800)
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
    const [dragStartX, setDragStartX] = useState(0)
    const dragX = useMotionValue(0)

    const handleTouchStart = (e) => {
        setDragStartX(e.touches[0].clientX)
    }

    const handleTouchMove = (e) => {
        const offsetX = e.touches[0].clientX - dragStartX

        if (offsetX >= 0) {
            dragX.set(offsetX)
        } else {
            dragX.set(0)
        }
    }

    const handleTouchEnd = (e) => {
        const offsetX = e.changedTouches[0].clientX - dragStartX;

        if (offsetX <= 200) {
            dragX.set(0, { duration: 0.15 })
        }
        else if (offsetX > 200) {
            dragX.set(450, { duration: 0.15 })

            setIsCartOpen(false)
            setIsCartOpenATC(false)
        }
    }


    return (
        <>
            <AnimatePresence>
                {/* isCartOpen || isCartOpenATC */}
                {(isCartOpen) && (
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
                        <div className="absolute z-[610] top-0 left-0 flex justify-center items-center w-full h-full bg-[#292929] bg-opacity-0" onClick={() => {
                            setIsCartOpen(false)
                            setIsCartOpenATC(false)
                        }} />


                        <div className="relative z-[620] flex flex-col justify-start items-start w-full sm:w-full md:w-[32%] lg:w-[32%] xl:w-[32%] h-full py-4 bg-white shadow-[0px_0px_15px_4px_rgba(25,25,25,0.1)]">
                            <div className="block justify-start items-center w-full px-4 space-y-2">
                                <div className="flex justify-start items-center w-full h-6">
                                    <div className="flex justify-center items-center size-6" onClick={() => {
                                        setIsCartOpen(false)
                                        setIsCartOpenATC(false)
                                    }}>
                                        <svg className="flex justify-center items-center size-6 cursor-pointer" width={24} height={24}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"
                                            ></use>
                                        </svg>
                                    </div>
                                </div>

                                {mappedCart?.length > 0 && (
                                    <div className="flex justify-start items-center w-full mt-2 text-2xl font-bold leading-none">
                                        Your cart
                                    </div>
                                )}
                            </div>

                            <div className="relative block justify-start items-start w-full h-screen mt-2 pb-4">
                                {mappedCart?.length > 0 && (
                                    <ul className="flex flex-col justify-start items-center w-full h-[37.2rem] sm:h-[37.2rem] md:h-[31.6rem] lg:h-[31.6rem] xl:h-[31.6rem] bg-white text-[#191919] overflow-y-auto">
                                        {mappedCart.map((item, index) => (
                                            <li key={index} className="block justify-start items-center w-full h-28 border-b border-[#e5e5e5] last:border-b-0 cursor-pointer">
                                                <div className="flex justify-between items-center w-full h-full px-4 space-x-2 bg-white hover:bg-[#f7f7f7] cursor-pointer">
                                                    <Link className="flex justify-center items-center size-[5.5rem] no-outline" href={`/${item.url}`}>
                                                        <div className="relative flex justify-start items-center w-full h-full overflow-hidden">
                                                            <Image className="flex justify-center items-center size-full rounded-md overflow-hidden no-outline"
                                                                src={item.img}
                                                                width={800}
                                                                height={800}
                                                                alt={item.slug}
                                                            />
                                                        </div>
                                                    </Link>

                                                    <div className="flex justify-start items-center w-[75%] h-[78%] space-x-1 text-[#191919]">
                                                        <div className="flex flex-col justify-start items-center w-[64%] h-full text-start font-medium">
                                                            <Link className="flex justify-center items-start w-full h-full no-outline text-base font-bold !leading-none" href={`/product/${item.url}`}>
                                                                <div className="flex justify-start items-start w-full h-auto capitalize leading-tight hover:underline cursor-pointer" onClick={() => {
                                                                    setIsCartOpen(false)
                                                                    setIsCartOpenATC(false)
                                                                }}>
                                                                    <p className="line-clamp-2 text-ellipsis overflow-y-hidden"> {item.name} </p>
                                                                </div>
                                                            </Link>

                                                            {item.offer === 'buy-2-get-1-free' && <div className="flex justify-start items-start w-full h-auto">
                                                                <div className="relative flex justify-center items-center w-auto h-6 px-2 leading-none bg-[#0e8345] text-white rounded-md text-[10px] sm:text-[10px] md:text-xs lg:text-xs xl:text-xs  anim__pulse-wave">
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

                                                            <div className="flex justify-start items-end w-full h-auto mt-1 text-base !leading-none">
                                                                ₹{(item.price * item.qty)?.toFixed(2)}
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col justify-start items-end w-[36%] h-full space-y-2 text-[#191919]">
                                                            <div className="flex justify-between items-center w-full h-8 rounded-[--global-radius-md] bg-[#f7f7f7] overflow-hidden shadow-[rgba(0,0,0,0.2)_0px_2px_8px]">
                                                                {!(cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'delete') ? (
                                                                    <div className="flex justify-center items-center size-8 bg-white rounded-[--global-radius-md]" onClick={() => {
                                                                        removeProductToCart(
                                                                            item.url,
                                                                            item.url,
                                                                            item.qty,
                                                                            item.availableQty,
                                                                            item.price,
                                                                            item.img,
                                                                            item.name,
                                                                        )
                                                                    }}>
                                                                        <svg className="flex justify-center items-center size-4 text-[#494949]" width={10} height={10}>
                                                                            <use
                                                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-minus_dd"
                                                                            ></use>
                                                                        </svg>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex justify-center items-center size-8 bg-white rounded-[--global-radius-md]">
                                                                        <svg className="animate-[spin_600ms_linear_infinite]" width={12} height={12}>
                                                                            <use
                                                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                                            ></use>
                                                                        </svg>
                                                                    </div>
                                                                )}

                                                                <div className="flex justify-center items-center size-8 font-medium">
                                                                    {item.qty}×
                                                                </div>

                                                                {!(cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'add') ? (
                                                                    <div className="flex justify-center items-center size-8 bg-white rounded-[--global-radius-md]" onClick={() => {
                                                                        addProductToCart(
                                                                            item.url,
                                                                            item.url,
                                                                            1,
                                                                            item.availableQty,
                                                                            item.price,
                                                                            item.img,
                                                                            item.name,
                                                                        )
                                                                    }}>
                                                                        <svg className="flex justify-center items-center size-4 text-[#494949]" width={10} height={10}>
                                                                            <use
                                                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-plus_dd"
                                                                            ></use>
                                                                        </svg>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex justify-center items-center size-8 bg-white rounded-[--global-radius-md]">
                                                                        <svg className="animate-[spin_600ms_linear_infinite]" width={12} height={12}>
                                                                            <use
                                                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                                            ></use>
                                                                        </svg>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="flex justify-between items-center size-8 rounded-[--global-radius-md] bg-[#f7f7f7] overflow-hidden shadow-[rgba(0,0,0,0.2)_0px_2px_8px]">
                                                                <div className="flex justify-center items-center size-8 bg-white hover:bg-[#f7f7f7] rounded-[--global-radius-md]" onClick={() => removeAtOnce(item.url)}>
                                                                    <svg className="flex justify-center items-center size-4 text-[#494949]" width={10} height={10}>
                                                                        <use
                                                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-bin_dd"
                                                                        ></use>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {console.log(extraCart)}

                                                {(extraCart.find(k => k && k[0]?.product === item.url))?.length > 0 && (
                                                    <ul className="block justify-start items-center w-full h-full px-4 py-2 space-y-2 capitalize">
                                                        {(extraCart.find(k => k && k[0]?.product === item.url)).map((k, index) => (
                                                            <li key={index} className="flex justify-start items-center w-full p-1 pr-2 rounded-lg space-x-2 bg-[#f7f7f7]">
                                                                <Image className="flex justify-center items-center size-10 rounded-md bg-[#f7f7f7]"
                                                                    src={k.img}
                                                                    width={100}
                                                                    height={100}
                                                                    alt={k.addition}
                                                                />

                                                                <div className="flex justify-between items-center w-full font-medium">
                                                                    <div className="flex justify-start items-center w-auto">
                                                                        {k.addition}
                                                                    </div>

                                                                    <div className="flex justify-end items-center w-auto">
                                                                        <div className="flex justify-end items-center w-auto font-bold">
                                                                            ₹{(k.price).toFixed(2)}
                                                                        </div>

                                                                        <div className="flex justify-end items-center size-6 ml-2 border-l border-[#c0c0c0]">
                                                                            <svg className="flex justify-center items-center size-4 text-[#494949]" width={12} height={12} onClick={() => removeAdditionalFromCart(item.url, k.addition)}>
                                                                                <use
                                                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-bin_dd"
                                                                                ></use>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {mappedCart?.length === 0 && (
                                    <div className="flex flex-col justify-center items-center w-full h-full px-6 bg-white text-[#191919] text-center overflow-y-auto">
                                        <div className="flex justify-center items-center w-full">
                                            <Image className="flex justify-center items-center size-auto"
                                                src="/assets/icons/empty_cart.svg"
                                                width={176}
                                                height={177}
                                                alt="empty cart"
                                            />
                                        </div>

                                        <div className="flex justify-center items-center w-full text-2xl font-bold">
                                            Add items to start a cart
                                        </div>

                                        <div className="flex justify-center items-center w-full text-base font-medium text-[#494949] leading-tight">
                                            Once you add items from a restaurant or store, your cart will appear here.
                                        </div>

                                        <div className="flex justify-center items-center w-full h-10 mt-4">
                                            <button className="flex justify-center items-center w-auto h-full px-4 bg-[--global-button-color-default] hover:bg-[--global-button-color-hover] active:bg-[#064434] rounded-[--global-radius-md] text-white font-bold duration-75">
                                                Start Shopping
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {subTotal > 0 && (
                                    <div className="fixed bottom-0 flex justify-center items-center w-full sm:w-full md:w-[32%] lg:w-[32%] xl:w-[32%] h-16 px-4 py-2 bg-white shadow-[0px_0px_15px_4px_rgba(25,25,25,0.1)]">
                                        <div className="flex justify-center items-center w-full h-full">
                                            <button className="flex justify-between items-center w-full h-full px-4 bg-[--global-button-color-default] hover:bg-[--global-button-color-hover] active:bg-[#064434] rounded-[--global-radius-md] text-white font-bold duration-75" onClick={() => {
                                                setIsCartOpen(false);
                                                setIsCartOpenATC(false);

                                                router.push('/cart/checkout');
                                            }}>
                                                <div className="flex justify-start items-center w-auto h-full">
                                                    Checkout
                                                </div>

                                                <div className="flex justify-end items-center w-auto h-full">
                                                    ₹{subTotal}.00
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Cart