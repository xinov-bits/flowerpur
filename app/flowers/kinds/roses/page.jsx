"use client"

import React, { useState, useEffect, useContext, Suspense } from 'react'

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

// COMPONENTS
import ProductCard from '@/components/function/ProductCard'
import { FilteredProducts } from '@/components/function/FilteredProducts'
import { FilterOptions } from '@/components/core/FilterOptions'

const Page = () => {
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


  // RENDER SKELETON
  const Skeleton = (
    <div className="flex justify-center items-center w-[10.2rem] sm:w-[10.2rem] md:w-[13.5rem] lg:w-[13.5rem] xl:w-[13.5rem] h-[13rem] sm:h-[13rem] md:h-[17.5rem] lg:h-[17.5rem] xl:h-[17.5rem] bg-[#f7f7f7] rounded-md cursor-pointer select-none overflow-hidden  c-skeleton">
    </div>
  )


  return (
    <>
      <Suspense>
        <div className="block justify-start items-start w-full h-auto bg-white py-4 sm:py-4 md:py-8 lg:py-8 xl:py-8 text-[#494949]">
          <div className="block w-full h-auto">
            <div className="flex flex-col justify-start items-center w-full select-none">
              <div className="flex justify-start items-center w-full px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 !leading-none text-xl sm:text-xl md:text-3xl lg:text-3xl xl:text-3xl font-bold text-[#191919]">
                Roses
              </div>

              <div className="flex justify-start items-center w-full px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 text-base sm:text-base md:text-lg lg:text-lg xl:text-lg font-normal text-[#767676]">
                Select from different bouquets
              </div>


              <div className="flex justify-between items-center w-full h-12 mt-2">
                <FilterOptions />
              </div>
            </div>

            {products.length <= 0 ? <div className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 gap-y-4 sm:gap-y-4 md:gap-y-6 lg:gap-y-6 xl:gap-y-6 justify-start items-start w-full px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 mt-6">
              {Skeleton}
              {Skeleton}
              {Skeleton}
              {Skeleton}
              {Skeleton}
            </div>
              :
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 gap-y-4 sm:gap-y-4 md:gap-y-6 lg:gap-y-6 xl:gap-y-6 justify-start items-start w-full px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 mt-6">
                <FilteredProducts />
              </div>}
          </div>
        </div>
      </Suspense>

      {/* <AnimatePresence>
        {isSortBy && (
          <motion.div className="fixed z-[500] top-0 left-0 flex justify-center items-end sm:items-end md:items-center lg:items-center xl:items-center w-full h-full"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          >
            <div className="absolute top-0 left-0 z-[500] flex justify-center items-center w-full h-full bg-black/20"
              onClick={() => setIsSortBy(false)}
            />

            <div className="relative z-[550] flex flex-col justify-center items-start w-full h-auto max-w-md m-4 sm:m-4 md:m-0 lg:m-0 xl:0 bg-white text-[#191919] rounded-md overflow-hidden">
              <div className="flex justify-between items-center w-full p-4 leading-none text-xl font-bold border-b border-[#e5e5e5]">
                <div className="flex justify-start items-center w-auto select-none">
                  Sort flowers by
                </div>

                <div className="flex justify-end items-center w-auto">
                  <button className="flex justify-end items-center w-5 h-5 cursor-pointer no-outline" onClick={() => setIsSortBy(false)}>
                    <svg className="flex justify-center items-center w-5 h-5" width={20} height={20}>
                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"></use>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex justify-start items-center w-full p-4 bg-white">
                <div className="flex justify-start items-center w-full leading-none text-base font-medium">
                  <div className="flex justify-start items-center w-full">
                    <button className="flex justify-center items-center w-auto p-3 bg-white border border-[#e5e5e5] hover:bg-[#f7f7f7] rounded-[--global-radius-md] leading-none text-sm">
                      Something
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  )
}

export default Page