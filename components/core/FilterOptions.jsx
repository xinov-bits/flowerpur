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
        }
        else {
            return filterProducts[item]
        }
    }).map((item) => filterProducts[item])

    return (
        <>
            <div className="flex justify-start items-center w-auto h-9 space-x-2">
                <button className={
                    `
                  flex justify-center items-center w-auto h-full px-2.5 text-base ${qFilter === 'offers' ? 'bg-[#191919] text-white hover:bg-[#191919] active:bg-[#191919]' : 'text-[#191919] bg-[#e7e7e7] active:bg-[#d6d6d6] hover:bg-[#f7f7f7]'} rounded-full font-bold overflow-hidden no-outline duration-100
                  `
                } onClick={() => router.push('?filter=offers')}>
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

                <button className={
                    `
                  flex justify-center items-center w-auto h-full px-2.5 text-base ${qFilter === 'over_4.5' ? 'bg-[#191919] text-white hover:bg-[#191919] active:bg-[#191919]' : 'text-[#191919] bg-[#e7e7e7] active:bg-[#d6d6d6] hover:bg-[#f7f7f7]'} rounded-full font-bold overflow-hidden no-outline duration-100
                  `
                } onClick={() => router.push('?filter=over_4.5')}>
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


                {!(qFilter === undefined || qFilter === null || qFilter === '' || qFilter === 'none') && <button className="flex justify-center items-center w-auto h-full px-2 sm:px-2 md:px-2.5 lg:px-2.5 xl:px-2.5 text-base text-[#191919] bg-[#e7e7e7]  hover:bg-[#f7f7f7] active:bg-[#d6d6d6] rounded-full font-bold overflow-hidden no-outline duration-100" onClick={() => router.push('?filter=none')}>
                    <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-start items-center">
                        Clear all
                    </div>

                    <div className="flex justify-center items-center w-5 h-5 ml-0 sm:ml-0 md:ml-0.5 lg:ml-0.5 xl:ml-0.5">
                        <svg className="flex justify-center items-center w-4 h-4" width={24} height={24}>
                            <use
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"
                            ></use>
                        </svg>
                    </div>
                </button>}
            </div>

            <div className="flex justify-end items-center w-auto text-md font-medium text-[#797979]">
                {(filterQueryProducts).length} results
            </div>
        </>
    )
}
