'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext, useRef } from 'react'
import { deleteCookie, getCookie, getCookies, hasCookie, setCookie } from 'cookies-next'

// NEXT JS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

// FRAMER
import { motion, AnimatePresence } from "framer-motion";

// AXIOS
import axios from 'axios';

// CONTEXT
import CartContext from '@/context/CartContext';
import UserContext from '@/context/UserContext';

// GOOGLE MAPS AUTOCOMPLETE
import { getAutocompleteResults } from '@/utils/tomtomAutocomplete';


const Additions = ({ isAdditions, setIsAdditions }) => {
    // USE CONTEXT
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

        isHeader,
        setIsHeader,
    } = useContext(CartContext);
    const {
        user,
        isUserSignedIn,
    } = useContext(UserContext);

    const router = useRouter();


    // ADD TO CART
    const [cartLoading, setCartLoading] = useState(false)
    const [additionals, setAdditionals] = useState([])

    const addAdditionals = () => {
        if (additionals?.length > 0) {
            if (additionals.length === 1 && additionals[0] === 'vase') {
                router.push('#additionals=vase')
            }
            else if (additionals.length === 1 && additionals[0] === 'double') {
                router.push('#additionals=double')
            }
            else if (additionals.length === 2 && additionals.includes('vase') && additionals.includes('double')) {
                router.push('#additionals=vase&double')
            }
        }

        setAdditionals([])
        setIsAdditions(false)
    }


    return (
        <>
            <AnimatePresence>
                {isAdditions && (
                    <div className="fixed z-[600] top-0 left-0 flex justify-center items-center xl:items-center w-full h-screen select-none duration-75">
                        <motion.div
                            className="absolute z-[600] top-0 left-0 flex justify-center items-center w-full h-full bg-[#262626] bg-opacity-80"
                            onClick={() => setIsAdditions(false)}

                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <motion.div className="relative z-[601] flex justify-center items-center w-[96%] sm:w-[96%] md:w-full lg:w-full xl:w-full max-w-md h-auto mb-2 sm:mb-2 md:mb-0 lg:mb-0 xl:mb-0 text-[#191919]"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                        >
                            <div className="relative z-[200] flex flex-col justify-start items-center w-full h-auto p-4 space-y-4 bg-white rounded-lg overflow-hidden">
                                <label htmlFor="additions_selector-vase" className="flex justify-between items-center w-full h-auto p-2.5 bg-white rounded-lg border-[1.5px] border-[#e5e5e5] cursor-pointer hover:bg-[#f7f7f7] duration-100" id="additions_selector">
                                    <div className="flex justify-start items-center w-auto">
                                        <div className="relative flex justify-center items-center size-[1.175rem] overflow-hidden">
                                            <input
                                                className="absolute flex justify-center items-center size-full opacity-0"
                                                type="checkbox"
                                                name="additions_selector"
                                                id="additions_selector-vase"
                                                value="vase"
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    const selectedValue = e.target.value;

                                                    // Ensure additionals is initialized as an array
                                                    const updatedAdditionals = Array.isArray(additionals) ? [...additionals] : [];

                                                    if (isChecked) {
                                                        updatedAdditionals.push(selectedValue);
                                                    } else {
                                                        const index = updatedAdditionals.indexOf(selectedValue);
                                                        if (index !== -1) {
                                                            updatedAdditionals.splice(index, 1);
                                                        }
                                                    }

                                                    setAdditionals(updatedAdditionals);
                                                }}

                                            />


                                            <div className="absolute flex justify-center items-center size-full bg-white border-2 border-[#191919] rounded-md curosr-pointer duration-100 pointer-events-none overflow-hidden" id="additions_c_input-vase">
                                                <svg className="z-[2] flex justify-center items-center size-2.5 text-white" width={10} height={9}>
                                                    <use
                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-check_dd"
                                                    ></use>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="block justify-start items-center w-auto ml-2.5 font-bold">
                                            <div className="flex justify-start items-center w-auto font-bold">
                                                Minimal Flower Vase
                                            </div>

                                            <div className="flex justify-start items-center w-auto text-[#00838a] text-lg font-medium">
                                                ₹199.00
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end items-center w-auto overflow-hidden">
                                        <Image className="flex justify-center items-center size-16 rounded-md overflow-hidden"
                                            src="https://i.ibb.co/QjvwMwP/image.png"
                                            width={600}
                                            height={600}
                                            alt="additional_vase"
                                        />
                                    </div>
                                </label>

                                <label htmlFor="additions_selector-double" className="flex justify-between items-center w-full h-auto p-2.5 bg-white rounded-lg border-[1.5px] border-[#e5e5e5] cursor-pointer hover:bg-[#f7f7f7] duration-100" id="additions_selector">
                                    <div className="flex justify-start items-center w-auto">
                                        <div className="relative flex justify-center items-center size-[1.175rem] overflow-hidden">
                                            <input className="absolute flex justify-center items-center size-full opacity-0"
                                                type="checkbox"
                                                name="additions_selector"
                                                id="additions_selector-double"
                                                value="double"
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    const selectedValue = e.target.value;

                                                    // Ensure additionals is initialized as an array
                                                    const updatedAdditionals = Array.isArray(additionals) ? [...additionals] : [];

                                                    if (isChecked) {
                                                        updatedAdditionals.push(selectedValue);
                                                    } else {
                                                        const index = updatedAdditionals.indexOf(selectedValue);
                                                        if (index !== -1) {
                                                            updatedAdditionals.splice(index, 1);
                                                        }
                                                    }

                                                    setAdditionals(updatedAdditionals);
                                                }}

                                            />

                                            <div className="absolute flex justify-center items-center size-full bg-white border-2 border-[#191919] rounded-md curosr-pointer duration-100 pointer-events-none overflow-hidden" id="additions_c_input-double">
                                                <svg className="z-[2] flex justify-center items-center size-2.5 text-white" width={10} height={9}>
                                                    <use
                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-check_dd"
                                                    ></use>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="block justify-start items-center w-auto ml-2.5 font-bold">
                                            <div className="flex justify-start items-center w-auto font-bold">
                                                Double Flower Quantity
                                            </div>

                                            <div className="flex justify-start items-center w-auto text-[#00838a] text-lg font-medium">
                                                ₹349.00
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end items-center w-auto overflow-hidden">
                                        <Image className="flex justify-center items-center size-16 rounded-md overflow-hidden"
                                            src="https://i.ibb.co/3RTxMGR/x2-flowers.png"
                                            width={600}
                                            height={600}
                                            alt="additional_double-flower"
                                        />
                                    </div>
                                </label>

                                {additionals.length > 0 ? (
                                    <div className="flex justify-center items-center w-full h-12 mt-4">
                                        {!cartLoading ? (
                                            <button className="flex justify-center items-center w-full h-full bg-[--global-button-color-default] hover:bg-[--global-button-color-hover] active:bg-[#064434] text-white font-medium rounded-lg duration-75" onClick={() => addAdditionals()}>
                                                <div>
                                                    Add additionals to cart
                                                </div>
                                            </button>
                                        ) : (
                                            <button className="flex justify-center items-center w-full h-full bg-[--global-button-color-default] text-white font-medium rounded-lg duration-75">
                                                <svg className="animate-[spin_600ms_linear_infinite]" width={16} height={16}>
                                                    <use
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                    ></use>
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center w-full h-12 mt-4">
                                        <button className="flex justify-center items-center w-full h-full bg-[--global-button-color-default] text-white font-medium rounded-lg saturate-0 opacity-40 cursor-not-allowed">
                                            <div>
                                                Add additionals to cart
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Additions