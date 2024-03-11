"use client";

// REACT JS
import React, { useState, useEffect } from 'react'

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
import UserContext from '@/context/UserContext';
import { InputField } from '../core/InputField';

export const Coupon = ({ isCouponOpen, setIsCouponOpen }) => {
    // COUPON
    const [coupons, setCoupons] = useState('');
    const [coupon, setCoupon] = useState('');

    const [applyCoupon, setApplyCoupon] = useState([0, '']);

    const fetchCoupons = async () => {
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_HOST}/api/getcoupons`;
            const response = await axios.get(apiUrl);

            if (response.status === 200) {
                setCoupons(response.data);
            }
        } catch (error) {
            console.log("Error: " + error.message);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);


    const preCoupons = [
        {
            code: 'FirstTime',
            discount: 'Get a discount of upto 50% Off on your first order',
        },
        {
            code: 'AirdropIt',
            discount: 'Get free delivery on your first order',
        },
    ]

    return (
        <>
            <AnimatePresence>
                {isCouponOpen && (
                    <motion.div
                        className="fixed z-[600] top-0 right-0 flex justify-center items-center w-full h-screen select-none duration-75"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="absolute z-[610] top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-40" onClick={() => setIsCouponOpen(false)} />

                        <div className="relative z-[620] flex flex-col justify-center items-start w-full max-w-lg h-auto p-4 bg-[white] rounded-lg shadow-lg shadow-black/20 text-[#191919] overflow-hidden">
                            <div className="flex justify-start items-center w-auto h-auto text-[#494949]">
                                <button className="flex justify-center items-center w-6 h-6 no-outline" onClick={() => setIsCouponOpen(false)}>
                                    <svg className="w-6 h-6" width={24} height={24}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"
                                        ></use>
                                    </svg>
                                </button>
                            </div>

                            <div className="flex justify-start items-center w-full h-auto mt-2.5 !leading-none text-xl sm:text-xl md:text-3xl lg:text-3xl xl:text-3xl font-bold">
                                Promo codes, offers & gift cards
                            </div>

                            <div className="flex justify-center items-center w-full h-auto mt-4 text-lg font-semibold">
                                <div className="block justify-center items-center w-full h-auto">
                                    <div className="flex justify-start items-center w-full font-bold text-[#191919] capitalize">
                                        Enter Promo Code
                                    </div>

                                    <div className="relative flex flex-col justify-center items-center w-full h-auto mt-1">
                                        <input
                                            className="flex justify-center items-center w-full h-full p-3 bg-[#f7f7f7] rounded-md text-[#191919] font-medium outline-none"
                                            id="promo_code"
                                            name="promo_code"
                                            onChange={(e) => setCoupon(e.target.value)}
                                            required={true}
                                            type="text"
                                        />

                                        {coupon === '' ? <button className="absolute right-3 flex justify-center items-center w-auto text-base leading-none text-[#767676] font-bold cursor-not-allowed no-outline">
                                            Apply
                                        </button> : 
                                        <button className="absolute right-3 flex justify-center items-center w-auto text-base leading-none text-[#767676] font-bold cursor-pointer no-outline"
                                        onClick={() => {
                                            setApplyCoupon([1, coupon]);
                                            setIsCouponOpen(false);
                                        }}>
                                            Apply
                                        </button>}
                                    </div>
                                </div>
                            </div>


                            {/* COUPONS */}
                            <ul className="flex flex-col justify-start items-center w-full mt-6">
                                {preCoupons.map((c, index) => <li key={index} className="flex justify-start items-center w-full mt-3 pt-3 border-t border-[#e5e5e5] first:border-0 first:mt-0 first:pt-0 cursor-pointer">
                                    <div className="relative flex justify-start items-center w-full h-14 px-5 font-bold bg-[#d7f5f5] text-[#00666d] rounded
                                    after:absolute after:-ml-[1px] after:left-0 after:w-3 after:h-5 after:bg-white after:rounded-r-full
                                    before:absolute before:-mr-[1px] before:right-0 before:w-3 before:h-5 before:bg-white before:rounded-l-full overflow-hidden"
                                    >
                                        <div className="flex justify-center items-center w-full h-full anim__pulse-wave2">
                                            <div className="block justify-center items-center w-full h-auto space-y-1">
                                                <div className="flex justify-start items-center w-auto leading-none text-lg">
                                                    {c.code}
                                                </div>

                                                <div className="flex justify-start items-center w-auto leading-none font-medium">
                                                    {c.discount}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>)}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}