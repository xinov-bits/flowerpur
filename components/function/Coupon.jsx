"use client";

// REACT JS
import React, { useState, useEffect } from 'react'

// NEXT JS
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getCookie, getCookies, hasCookie, setCookie } from 'cookies-next'

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
    const router = useRouter();

    // COUPON
    const [coupons, setCoupons] = useState('');
    const [coupon, setCoupon] = useState('');

    const [isLoading, setIsLoading] = useState(false);


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
    }, [coupons, coupon, isCouponOpen, router]);


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


    const handleCouponSubmit = (e) => {
        e.preventDefault();

        const filteredCoupon = coupons.filter((k) => {
            if (k?.code?.toLowerCase() == coupon?.toLowerCase()) {
                return k
            }
        }).map((k) => k)

        setIsLoading(true);

        setTimeout(() => {
            if (filteredCoupon?.length !== 0) {
                const dataToEnc = [
                    filteredCoupon.map((k) => {
                        return {
                            code: k.code,
                            discount: k.discountAmount,
                            type: k.discountType,
                        }
                    })
                ]

                const encCrypto = CryptoJS.AES.encrypt(JSON.stringify(dataToEnc), 'fvnmsdf').toString();

                if (coupon !== '') {
                    setCookie('coupon', encCrypto);
                    setIsCouponOpen(false);

                    setIsLoading(false);

                    router.push(`?rmd=${(Math.random() * 1000).toFixed(0)}`);
                }
            }
            else {
                alert('Not a valid code.')
            }
        }, 1000);
    }


    return (
        <>
            <AnimatePresence>
                {isCouponOpen && (
                    <motion.div
                        className="fixed z-[600] top-0 right-0 flex justify-center items-center w-full h-screen p-4 sm:p-4 md:p-0 lg:p-0 xl:p-0 select-none duration-75"
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

                            <div className="flex justify-center items-center w-full h-auto mt-4 text-lg font-medium">
                                <div className="block justify-center items-center w-full h-auto">
                                    <div className="flex justify-start items-center w-full font-bold text-[#191919] capitalize">
                                        Enter Promo Code
                                    </div>

                                    <form className="relative flex flex-col justify-center items-center w-full h-auto mt-1" onSubmit={handleCouponSubmit}>
                                        <input
                                            className="flex justify-center items-center w-full h-full p-3 bg-[#f7f7f7] rounded-md text-[#191919] font-medium outline-none no-outline"
                                            id="promo_code"
                                            name="promo_code"
                                            onChange={(e) => setCoupon(e.target.value)}
                                            required={true}
                                            type="text"
                                            autoFocus={true}
                                        />


                                        {!isLoading && <>
                                            {coupon === '' ? <button className="absolute right-3 flex justify-center items-center w-auto text-base leading-none text-[#767676] font-bold cursor-not-allowed no-outline">
                                                Apply
                                            </button> :
                                                <button className="absolute right-3 flex justify-center items-center w-auto text-base leading-none text-[#767676] font-bold cursor-pointer no-outline">
                                                    Apply
                                                </button>}
                                        </>}

                                        {isLoading && <>
                                            <button className="absolute right-3 flex justify-center items-center w-auto text-base leading-none text-[#767676] font-bold cursor-not-allowed no-outline">
                                                <svg className="animate-[spin_600ms_linear_infinite]" width={16} height={16}>
                                                    <use
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                    ></use>
                                                </svg>
                                            </button>
                                        </>}
                                    </form>
                                </div>
                            </div>


                            {/* COUPONS */}
                            <ul className="flex flex-col justify-start items-center w-full mt-6">
                                {preCoupons.map((c, index) => <li key={index} className="flex justify-start items-center w-full mt-3 pt-3 border-t border-[#e5e5e5] first:border-0 first:mt-0 first:pt-0 cursor-pointer">
                                    <div className="relative flex justify-start items-center w-full h-auto sm:h-auto md:h-14 lg:h-14 xl:h-14 px-5 py-3.5 sm:py-3.5 md:py-0 lg:py-0 xl:py-0 font-bold bg-[#d7f5f5] text-[#00666d] rounded
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