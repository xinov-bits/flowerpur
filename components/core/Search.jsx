'use client'

import React, { useState, useEffect, useContext } from 'react'

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

// COMPONENTS
import ProductCard from '../function/ProductCard';

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
    const [cartLoading, setCartLoading] = useState([false, ''])

    const addProductToCart = (itemCode, url, qty, availableQty, price, img, name, offer) => {
        setCartLoading([true, url])

        setTimeout(() => {
            setCartLoading([false, ''])

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
            setAddedAnim([true, url])
        }, 1000)
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
            <div className="block w-full h-auto p-4 sm:p-4 md:p-8 lg:p-8 xl:p-8 text-[#191919]">
                {filteredProducts?.length > 0 && (
                    <div className="flex justify-start items-center w-full text-md font-medium !leading-none select-none">
                        {filteredProducts.length} results
                    </div>
                )}

                <div className="flex justify-start items-start w-full mt-4">
                    {filteredProducts.length > 0 ? <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-3 md:gap-5 lg:gap-5 xl:gap-5 justify-start items-start w-full">
                        {Object.keys(filteredProducts).map((k, index) => <ProductCard key={index}
                            itemCode={filteredProducts[k]._id}
                            slug={filteredProducts[k].slug}
                            qty={filteredProducts[k].qty}
                            availableQty={filteredProducts[k].availableQty}
                            price={filteredProducts[k].price}
                            dimg={filteredProducts[k].dimg}
                            title={filteredProducts[k].title}
                            offer={filteredProducts[k].offer}
                        />)}
                    </div>
                        :
                        <div className="flex justify-start items-center w-full">
                            <div className="flex justify-start items-center w-full text-lg font-medium text-[#767676] leading-none">
                                &#40;No results for the search&#41;
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}