"use client"

import React, { useState, useEffect, useContext, Suspense } from 'react'

// NEXT JS
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

// CRYPTO JS
import CryptoJS from 'crypto-js'

// AXIOS
import axios from 'axios';

// FRAMER
import { motion, AnimatePresence } from "framer-motion"

// SWIPER & SPLIDE
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// CONTEXT
import CartContext from '@/context/CartContext';

// COMPONENTS
import ProductCard from '@/components/function/ProductCard'

export const FilterOptions = () => {
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

    const router = useRouter();


    const [addedAnim, setAddedAnim] = useState([false, '']);

    useEffect(() => {
        if (addedAnim[0] === true) {
            setTimeout(() => {
                setAddedAnim([false, '']);
            }, 2000);
        }
    }, [addedAnim])


    // GET PRODUCTS
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);

    useEffect(() => {
        setFilterProducts(
            Object.keys(products).filter((k) => {
                if ((products[k].category === 'flowers') && (products[k].subCategory === 'roses')) {
                    return products[k]
                }
            }).map((k) => products[k])
        )
    }, [products])

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getproducts`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setProducts(response.data);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    // ADD TO CART
    const [cartLoading, setCartLoading] = useState([false, '']);

    const addProductToCart = (itemCode, url, qty, availableQty, price, img, name, offer) => {
        setCartLoading([true, url]);

        setTimeout(() => {
            setCartLoading([false, '']);

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
            setAddedAnim([true, url]);
        }, 1000);
    }


    // FILTER & RATINGS
    const query = useSearchParams();
    const qFilter = query.get("filter");

    const [reviewMean, setReviewMean] = useState([]);

    const fetchReviews = async () => {
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_HOST}/api/getmeanreviews`;
            const response = await axios.get(apiUrl);

            if (response.status === 200) {
                setReviewMean(response.data);
            }
        } catch (error) {
            console.log("Error: " + error.message);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [products])

    const filterQueryProducts = Object.keys(filterProducts).filter((item) => {
        if (!(qFilter === undefined || qFilter === null || qFilter === '' || qFilter === 'none')) {
            if (qFilter === 'offers') {
                if (filterProducts[item].offer !== '' && filterProducts[item] !== 'none') {
                    return filterProducts[item];
                }
            }
            else if (qFilter === 'over_4.5') {
                let reviewNames = reviewMean.map((s) => s.name);

                for (let i = 0; i < reviewNames.length; i++) {
                    const element = reviewNames[i];

                    if (filterProducts[item].slug === element) {
                        let reviewStarNames = reviewMean.filter((s) => {
                            if (s.stars > 4) {
                                return s
                            }
                        }).map((s) => s.name);

                        if (!(reviewStarNames == [] || reviewStarNames === undefined || reviewStarNames === null)) {
                            if (reviewStarNames.includes(filterProducts[item].slug)) {
                                return filterProducts[item]
                            }
                        }
                    }
                }
            }
            else if (qFilter === 'under_999') {
                if (parseInt(filterProducts[item].price) < 999) {
                    return filterProducts[item]
                }
            }
        }
        else {
            return filterProducts[item]
        }
    }).map((item) => filterProducts[item])

    return (
        <>
            <div className="block sm:block md:flex lg:flex xl:flex justify-between items-center w-full h-full">
                <div className="flex justify-start items-center w-auto space-x-2 h-9 px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 overflow-x-auto">
                    <div className="flex justify-center items-center w-auto h-full">
                        <button className={`flex justify-center items-center w-max h-full px-2.5 text-base ${qFilter === 'offers' ? 'bg-[#191919] text-white hover:bg-[#191919] active:bg-[#191919]' : 'text-[#191919] bg-[#e7e7e7] active:bg-[#d6d6d6] hover:bg-[#f7f7f7]'} rounded-full font-bold overflow-hidden no-outline duration-100`} onClick={() => router.push('?filter=offers')}>
                            <div className="flex justify-center items-center w-5 h-5 pr-1 mr-0.5">
                                <svg className="flex justify-center items-center w-4 h-4" width={24} height={24}>
                                    <use
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-offers_dd"
                                    ></use>
                                </svg>
                            </div>

                            <div className="flex justify-start items-center">
                                Offers
                            </div>
                        </button>
                    </div>

                    <div className="flex justify-center items-center w-auto h-full">
                        <button className={`flex justify-center items-center w-max h-full px-2.5 text-base ${qFilter === 'over_4.5' ? 'bg-[#191919] text-white hover:bg-[#191919] active:bg-[#191919]' : 'text-[#191919] bg-[#e7e7e7] active:bg-[#d6d6d6] hover:bg-[#f7f7f7]'} rounded-full font-bold overflow-hidden no-outline duration-100`} onClick={() => router.push('?filter=over_4.5')}>
                            <div className="flex justify-start items-center">
                                Over 4.5
                            </div>

                            <div className="flex justify-center items-center w-5 h-5 ml-0.5">
                                <svg className="flex justify-center items-center w-4 h-4" width={24} height={24}>
                                    <use
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-star_dd"
                                    ></use>
                                </svg>
                            </div>
                        </button>
                    </div>

                    <div className="flex justify-center items-center w-auto h-full">
                        <button className={`flex justify-center items-center w-max h-full px-2.5 text-base ${qFilter === 'under_999' ? 'bg-[#191919] text-white hover:bg-[#191919] active:bg-[#191919] fill-[#191919]' : 'text-[#191919] bg-[#e7e7e7] active:bg-[#d6d6d6] hover:bg-[#f7f7f7] fill-[#e7e7e7]'} rounded-full font-bold overflow-hidden no-outline duration-100`} onClick={() => router.push('?filter=under_999')}>
                            <div className="flex justify-center items-center w-5 h-5 pr-1 mr-0.5">
                                <svg className="flex justify-center items-center w-4 h-4" viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_456_6)">
                                        <path
                                            d="M23.7016 3.10179L21.6621 1.10355C20.7387 0.198801 19.2613 0.198801 18.3379 1.10355L16.2984 3.10179C15.8922 3.49981 15.3074 3.65649 14.7566 3.51491L11.9912 2.80412C10.7392 2.4823 9.45965 3.22102 9.11232 4.46626L8.3452 7.21654C8.19241 7.76434 7.76434 8.19241 7.21654 8.3452L4.46626 9.11232C3.22102 9.45965 2.4823 10.7392 2.80412 11.9912L3.51491 14.7566C3.65649 15.3074 3.49981 15.8922 3.10179 16.2984L1.10355 18.3379C0.198801 19.2613 0.198801 20.7387 1.10355 21.6621L3.10179 23.7016C3.49981 24.1079 3.65649 24.6926 3.51491 25.2434L2.80412 28.0088C2.4823 29.2609 3.22102 30.5404 4.46626 30.8877L7.21654 31.6548C7.76434 31.8076 8.19241 32.2357 8.3452 32.7835L9.11232 35.5337C9.45965 36.779 10.7392 37.5177 11.9912 37.1959L14.7566 36.4851C15.3074 36.3435 15.8922 36.5002 16.2984 36.8982L18.3379 38.8965C19.2613 39.8012 20.7387 39.8012 21.6621 38.8965L23.7016 36.8982C24.1079 36.5002 24.6926 36.3435 25.2434 36.4851L28.0088 37.1959C29.2609 37.5177 30.5404 36.779 30.8877 35.5337L31.6548 32.7835C31.8076 32.2357 32.2357 31.8076 32.7835 31.6548L35.5337 30.8877C36.779 30.5404 37.5177 29.2609 37.1959 28.0088L36.4851 25.2434C36.3435 24.6926 36.5002 24.1079 36.8982 23.7016L38.8965 21.6621C39.8012 20.7387 39.8012 19.2613 38.8965 18.3379L36.8982 16.2984C36.5002 15.8922 36.3435 15.3074 36.4851 14.7566L37.1959 11.9912C37.5177 10.7392 36.779 9.45965 35.5337 9.11232L32.7835 8.3452C32.2357 8.19241 31.8076 7.76434 31.6548 7.21654L30.8877 4.46626C30.5404 3.22102 29.2609 2.4823 28.0088 2.80412L25.2434 3.51491C24.6926 3.65649 24.1079 3.49981 23.7016 3.10179Z"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeWidth="0.75"
                                        />
                                        <path
                                            d="M26 12H17M17 12H14M17 12C18.5913 12 20.1174 12.6321 21.2426 13.7574C22.3679 14.8826 23 16.4087 23 18M26 18H23M23 18H14M23 18C23 19.5913 22.3679 21.1174 21.2426 22.2426C20.1174 23.3679 18.5913 24 17 24H14L20 30"
                                            stroke={qFilter === 'under_999' ? '#191919' : 'white'}
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_456_6">
                                            <rect width="40" height="40" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>

                            <div className="flex justify-start items-center">
                                Under ₹999
                            </div>
                        </button>
                    </div>

                    {!(qFilter === undefined || qFilter === null || qFilter === '' || qFilter === 'none') && (
                        <button className="hidden sm:hidden md:flex lg:flex xl:flex justify-end items-center w-auto h-full text-base text-[#191919] underline font-bold !leading-none no-outline duration-100" onClick={() => router.push('?filter=none')}>
                            Clear all
                        </button>
                    )}
                </div>

                <div className="flex justify-between items-center w-auto mt-1 px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8">
                    <div className="flex justify-start sm:justify-start md:justify-end lg:justify-end xl:justify-end items-center w-auto text-md font-medium text-[#494949]">
                        {(filterQueryProducts).length} results
                    </div>

                    {!(qFilter === undefined || qFilter === null || qFilter === '' || qFilter === 'none') && (
                        <button className="flex sm:flex md:hidden lg:hidden xl:hidden justify-end items-center w-auto h-full text-base text-[#191919] underline font-bold !leading-none no-outline duration-100" onClick={() => router.push('?filter=none')}>
                            Clear all
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
