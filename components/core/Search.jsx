'use client'

import React, { useState, useEffect, useContext } from 'react'
import { Suspense } from 'react'

// NEXT JS
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';

// FRAMER MOTION
import { AnimatePresence, motion } from 'framer-motion';

// AXIOS
import axios from 'axios';

// CONTEXT
import CartContext from '@/context/CartContext';

export const Search = () => {
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
    const searchParams = useSearchParams();

    const keyword = (searchParams.get('keyword'))?.toLowerCase();


    // ADD ANIMATION

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


    // SEARCH
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        router.push(`/search?keyword=${searchKeyword}`)
    }

    useEffect(() => {
        setSearchKeyword(keyword);
    }, [keyword])

    const filteredProducts = Object.keys(products).filter((item) => {
        if ((JSON.stringify(products[item].slug)?.toLowerCase().includes(searchKeyword)
            || JSON.stringify(products[item].title)?.toLowerCase().includes(searchKeyword)
            || JSON.stringify(products[item].price)?.toLowerCase().includes(searchKeyword)
            || JSON.stringify(products[item].desc)?.toLowerCase().includes(searchKeyword)
            || JSON.stringify(products[item].category)?.toLowerCase().includes(searchKeyword))
            && !JSON.stringify(products[item].category)?.includes('Special')
            && !JSON.stringify(products[item].category)?.includes('Special')
        ) {
            return products[item];
        }
    }).map((item) => products[item]);

    return (
        <>
            <div className="block w-full h-auto px-6 sm:px-6 md:px-10 lg:px-10 xl:px-10">
                <div className="flex flex-col justify-start items-center w-full select-none">
                    <div className="flex justify-start items-center w-full text-2xl font-bold text-[#191919]">
                        Search results for &#34;{searchKeyword}&#34;
                    </div>

                    {filteredProducts?.length > 0 && <div className="flex justify-start items-center w-full text-md font-medium text-[#797979]">
                        {filteredProducts.length} results
                    </div>}
                </div>

                <div className="flex justify-start items-start w-full mt-4">
                    {filteredProducts.length > 0 ? <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-2 sm:gap-2 md:gap-5 lg:gap-5 xl:gap-5 justify-start items-start w-full">
                        {Object.keys(filteredProducts).map((k) => {
                            return <motion.div key={filteredProducts[k]._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative flex flex-col justify-start items-center w-full bg-white rounded-md cursor-pointer select-none group overflow-hidden">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="relative flex justify-start items-center w-full border border-[#e5e5e5] rounded-md overflow-hidden">
                                    <Link href={`/product/${filteredProducts[k].slug}`}>
                                        <Image className="flex justify-center items-center w-full h-full"
                                            src={filteredProducts[k].dimg}
                                            width={800}
                                            height={800}
                                            alt={filteredProducts[k].title}
                                        />
                                    </Link>

                                    {JSON.stringify(filteredProducts[k].offer)?.includes('buy-2-get-1-free') && (<motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.8 }}
                                        className="absolute bottom-0 -right-1 flex justify-center items-center w-auto h-7 px-2.5 rounded-tl-md bg-[#65CDE7] leading-none text-xs font-semibold text-[#010E36] -skew-x-12  anim__pulse-wave"
                                    >
                                        <span className="skew-x-12">
                                            Buy 2 Get 1 Free
                                        </span>
                                    </motion.div>)}
                                </motion.div>

                                <Link href={`/product/${filteredProducts[k].slug}`}>
                                    <div className="flex justify-start items-start w-full h-10 mt-2 text-nd font-semibold text-[#191919] capitalize line-clamp-3 text-ellipsis leading-tight overflow-y-hidden group-hover:underline decoration-[#797979] decoration-[0.5px] underline-offset-2">
                                        {filteredProducts[k].title}
                                    </div>
                                </Link>

                                <div className="flex justify-between items-center w-full h-auto mt-1">
                                    <div className="flex justify-start items-center w-auto text-lg font-bold text-[#7a7a7a]">
                                        ₹{filteredProducts[k].price}.00
                                    </div>
                                    {(!cartLoading[0] || cartLoading[1] != filteredProducts[k].slug) ? <div className="flex justify-end items-center w-auto text-sm font-semibold text-[#191919]">
                                        {(!addedAnim[0] || addedAnim[1] != filteredProducts[k].slug) && <button
                                            onClick={() => addProductToCart(
                                                filteredProducts[k].slug,
                                                filteredProducts[k].slug,
                                                1,
                                                filteredProducts[k].availableQty,
                                                filteredProducts[k].price,
                                                filteredProducts[k].dimg,
                                                filteredProducts[k].title,
                                                filteredProducts[k].offer,
                                            )}
                                            className="flex justify-center items-center w-auto py-1.5 px-1.5 sm:px-1.5 md:px-2.5 lg:px-2.5 xl:px-2.5 bg-white rounded-full border-[1.5px] border-[#e5e5e5] hover:bg-[#f7f7f7] space-x-1">
                                            <svg className="text-[#191919]" width={18} height={18}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-cart_dd"
                                                ></use>
                                            </svg>

                                            <div className="hidden sm:hidden md:block lg:block xl:block"> Add to cart </div>
                                        </button>}

                                        {(addedAnim[0] && addedAnim[1] === filteredProducts[k].slug) && <button className="flex justify-center items-center w-auto py-1.5 px-1.5 sm:px-1.5 md:px-2.5 lg:px-2.5 xl:px-2.5 bg-[#e0f2f7] rounded-full border-[1.5px] border-[#528c8e] text-[#528c8e] space-x-1">
                                            <svg className="" width={14} height={14}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-check_dd"
                                                ></use>
                                            </svg>

                                            <div className="hidden sm:hidden md:block lg:block xl:block"> Added </div>
                                        </button>}
                                    </div>
                                        :
                                        <div className="flex justify-end items-center w-auto text-sm font-semibold text-[#767676] cursor-default">
                                            <button className="flex justify-center items-center w-auto py-1.5 px-1.5 sm:px-1.5 md:px-2.5 lg:px-2.5 xl:px-2.5 bg-white rounded-full border-[1.5px] border-[#e5e5e5] space-x-1">
                                                <svg className="animate-[spin_600ms_linear_infinite]" width={12} height={12}>
                                                    <use
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                    ></use>
                                                </svg>

                                                <div className="hidden sm:hidden md:block lg:block xl:block"> Adding </div>
                                            </button>
                                        </div>}
                                </div>
                            </motion.div>
                        })}
                    </div>
                        :
                        <div className="flex justify-start items-center w-full">
                            <div className="flex justify-start items-center w-full text-lg font-medium text-[#767676] leading-none">
                                &#40; No results for the search &#41;
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}