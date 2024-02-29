"use client"

import React, { useState, useEffect, useContext } from 'react'

// NEXT JS
import Link from 'next/link'
import Image from 'next/image'

// CRYPTO JS
import CryptoJS from 'crypto-js'

// AXIOS
import axios from 'axios';

// FRAMER
import { motion, AnimatePresence } from "framer-motion"

// CONTEXT
import CartContext from '@/context/CartContext';

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


  // RENDER SKELETON
  const Skeleton = (
    <div className="relative flex flex-col justify-start items-center w-[9.5rem] sm:w-[9.5rem] md:w-[13rem] lg:w-[13rem] xl:w-[13rem] h-[14.6rem] sm:h-[14.6rem] md:h-[18.5rem] lg:h-[18.5rem] xl:h-[18.5rem] bg-[#fafafa] rounded-md cursor-pointer select-none overflow-hidden">
      <div className="absolute flex justify-center items-center w-[9.5rem] sm:w-[9.5rem] md:w-[13rem] lg:w-[13rem] xl:w-[13rem] h-[14.6rem] sm:h-[14.6rem] md:h-[18.5rem] lg:h-[18.5rem] xl:h-[18.5rem]" id="skeleton_gradient" />
    </div>
  )


  // SORT BY
  const [isSortBy, setIsSortBy] = useState(false);


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

  return (
    <>
      <div className="block justify-start items-start w-full h-auto bg-white py-4 sm:py-4 md:py-8 lg:py-8 xl:py-8 text-[#494949]">
        <div className="block w-full h-auto px-6 sm:px-6 md:px-10 lg:px-10 xl:px-10">
          <div className="flex flex-col justify-start items-center w-full select-none">
            <div className="flex justify-start items-center w-full text-2xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-[#191919]">
              Roses
            </div>

            <div className="flex justify-start items-center w-full text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl font-normal text-[#797979]">
              Select from different bouquets
            </div>


            <div className="flex justify-between items-center w-full h-8 mt-2">
              <div className="flex justify-start items-center w-full h-full">
                <button className="flex justify-center items-center w-auto h-full px-2.5 text-[#191919] text-base bg-[#e7e7e7] hover:bg-[#f7f7f7] rounded-full font-bold overflow-hidden" onClick={() => setIsSortBy(!isSortBy)}>
                  <div className="flex justify-center items-center w-5 h-5 pr-1 mr.5">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <div className="">
                    Sort by
                  </div>

                  <div className="flex justify-center items-center w-6 h-6 border-l-[1.5px] border-[#c9c9c9] pl-1 ml-1.5">
                    <svg className=""
                      width={24} height={24}>
                      <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"
                      ></use>
                    </svg>
                  </div>
                </button>
              </div>

              <div className="flex justify-end items-center w-full text-md font-medium text-[#797979]">
                {products.length} results
              </div>
            </div>
          </div>

          {products.length <= 0 ? <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-2 sm:gap-2 md:gap-5 lg:gap-5 xl:gap-5 justify-start items-center w-full mt-6">
            {Skeleton}
            {Skeleton}
            {Skeleton}
            {Skeleton}
            {Skeleton}
          </div>
            :
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-2 sm:gap-2 md:gap-5 lg:gap-5 xl:gap-5 justify-start items-start w-full mt-6">
              {Object.keys(products).filter((item) => {
                if ((products[item].category === 'flowers') && (products[item].subCategory === 'roses')) {
                  return products[item]
                }
              }).map((item) => {
                return <motion.div key={products[item]._id}
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
                    <Link href={`/product/${products[item].slug}`}>
                      <Image className="flex justify-center items-center w-full h-full"
                        src={products[item].dimg}
                        width={800}
                        height={800}
                        alt={products[item].title}
                      />
                    </Link>

                    {JSON.stringify(products[item].offer)?.includes('buy-2-get-1-free') && (<motion.div
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

                  <Link href={`/product/${products[item].slug}`}>
                    <div className="flex justify-start items-start w-full h-10 mt-2 text-nd font-semibold text-[#191919] capitalize line-clamp-3 text-ellipsis leading-tight overflow-y-hidden group-hover:underline decoration-[#797979] decoration-[0.5px] underline-offset-2">
                      {products[item].title}
                    </div>
                  </Link>

                  <div className="flex justify-between items-center w-full h-auto mt-1">
                    <div className="flex justify-start items-center w-auto text-lg font-bold text-[#7a7a7a]">
                      ₹{products[item].price}.00
                    </div>
                    {(!cartLoading[0] || cartLoading[1] != products[item].slug) ? <div className="flex justify-end items-center w-auto text-sm font-semibold text-[#191919]">
                      {(!addedAnim[0] || addedAnim[1] != products[item].slug) && <button
                        onClick={() => addProductToCart(
                          products[item].slug,
                          products[item].slug,
                          1,
                          products[item].availableQty,
                          products[item].price,
                          products[item].dimg,
                          products[item].title,
                          products[item].offer,
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

                      {(addedAnim[0] && addedAnim[1] === products[item].slug) && <button className="flex justify-center items-center w-auto py-1.5 px-1.5 sm:px-1.5 md:px-2.5 lg:px-2.5 xl:px-2.5 bg-[#e0f2f7] rounded-full border-[1.5px] border-[#528c8e] text-[#528c8e] space-x-1">
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
            </div>}
        </div>
      </div>

      <AnimatePresence>
        {isSortBy && (
          <motion.div className="fixed top-1/2 left-1/2 flex justify-center items-center w-[50%] h-[50%] bg-white text-[#292929] rounded-md shadow-md shadow-black/10"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            onBlur={() => setIsSortBy(false)}
            onClick={() => setIsSortBy(true)}
            onFocus={() => setIsSortBy(true)}
          >
            <div className="flex justify-center items-center w-full h-auto">
              Sort flowers by
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Page