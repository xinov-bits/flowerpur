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

export const FilteredProducts = () => {
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

    return (
        <>
            {Object.keys(filterProducts).filter((item) => {
                if (qFilter !== '' && qFilter !== 'none') {
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
            }).map((item) => {
                return <ProductCard key={filterProducts[item]._id}
                    itemCode={filterProducts[item]._id}
                    slug={filterProducts[item].slug}
                    qty={filterProducts[item].qty}
                    availableQty={filterProducts[item].availableQty}
                    price={filterProducts[item].price}
                    dimg={filterProducts[item].dimg}
                    title={filterProducts[item].title}
                    offer={filterProducts[item].offer}
                />
            })}
        </>
    )
}
