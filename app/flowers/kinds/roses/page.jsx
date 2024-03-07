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
    <div className="relative flex flex-col justify-start items-center w-[10.8rem] sm:w-[10.8rem] md:w-[17rem] lg:w-[17rem] xl:w-[17rem] h-[14.6rem] sm:h-[14.6rem] md:h-[18.5rem] lg:h-[18.5rem] xl:h-[18.5rem] bg-[#fafafa] rounded-md cursor-pointer select-none overflow-hidden">
      <div className="absolute flex justify-center items-center w-full sm:w-full md:w-[17rem] lg:w-[17rem] xl:w-[17rem] h-[14.6rem] sm:h-[14.6rem] md:h-[18.5rem] lg:h-[18.5rem] xl:h-[18.5rem]" id="skeleton_gradient" />
    </div>
  )


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
  }, [products]);

  return (
    <>
      <Suspense>
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
                <div className="flex justify-start items-center w-full h-full space-x-2">
                  <button className={
                    `
                  flex justify-center items-center w-auto h-full px-2.5 text-[#191919] text-base bg-[#e7e7e7] hover:bg-[#f7f7f7] active:bg-[#d6d6d6] ${useSearchParams().get('filter') === 'offers' ? 'bg-[#191919] text-white hover:bg-[#191919] active:bg-[#191919]' : ''} rounded-full font-bold overflow-hidden no-outline duration-100
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

                    {/* <div className="relative flex justify-end items-center w-6 h-5 ml-1 after:absolute after:left-0 after:w-0.5 after:h-4 after:bg-[#d6d6d6] after:rounded-full">
                    <svg className="flex justify-end items-center w-5 h-5"
                      width={24} height={24}>
                      <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"
                      ></use>
                    </svg>
                  </div> */}
                  </button>

                  <button className={
                    `
                  flex justify-center items-center w-auto h-full px-2.5 text-base  hover:bg-[#f7f7f7] active:bg-[#d6d6d6] ${useSearchParams().get('filter') === 'over_4.5' ? 'bg-[#191919] text-white hover:bg-[#191919] active:bg-[#191919]' : 'text-[#191919] bg-[#e7e7e7]'} rounded-full font-bold overflow-hidden no-outline duration-100
                  `
                  } onClick={() => router.push('?filter=over_4.5')}>
                    <div className="flex justify-start items-center">
                      Over 4.5
                    </div>

                    <div className="flex justify-center items-center w-5 h-5 pr-1 ml-0.5">
                      <svg className="flex justify-center items-center w-4 h-4" width={24} height={24}>
                        <use
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xlinkHref="/on/demandware/svg/non-critical.svg#icon-star_dd"
                        ></use>
                      </svg>
                    </div>
                  </button>


                  {useSearchParams().get('filter') !== '' && useSearchParams().get('filter') !== 'none' && <button className="flex justify-center items-center w-auto h-full px-2.5 text-base text-[#191919] bg-[#e7e7e7]  hover:bg-[#f7f7f7] active:bg-[#d6d6d6] rounded-full font-bold overflow-hidden no-outline duration-100" onClick={() => router.push('?filter=none')}>
                    <div className="flex justify-start items-center">
                      Clear all
                    </div>

                    <div className="flex justify-center items-center w-5 h-5 pr-1 ml-0.5">
                      <svg className="flex justify-center items-center w-4 h-4" width={24} height={24}>
                        <use
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"
                        ></use>
                      </svg>
                    </div>
                  </button>}
                </div>

                <div className="flex justify-end items-center w-full text-md font-medium text-[#797979]">
                  {filterProducts.length} results
                </div>
              </div>
            </div>

            {products.length <= 0 ? <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 gap-y-4 sm:gap-y-4 md:gap-y-6 lg:gap-y-6 xl:gap-y-6 justify-start items-center w-full mt-6">
              {Skeleton}
              {Skeleton}
              {Skeleton}
              {Skeleton}
              {Skeleton}
            </div>
              :
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 gap-y-4 sm:gap-y-4 md:gap-y-6 lg:gap-y-6 xl:gap-y-6 justify-start items-start w-full mt-6">
                {Object.keys(filterProducts).filter((item) => {
                  if (useSearchParams().get('filter') !== '' && useSearchParams().get('filter') !== 'none') {
                    if (useSearchParams().get('filter') === 'offers') {
                      if (filterProducts[item].offer !== '' && filterProducts[item] !== 'none') {
                        return filterProducts[item];
                      }
                    }
                    else if (useSearchParams().get('filter') === 'over_4.5') {
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
                <div className="flex justify-start items-center w-full leading-none text-base font-semibold">
                  <div className="flex justify-start items-center w-full">
                    <button className="flex justify-center items-center w-auto p-3 bg-white border border-[#e5e5e5] hover:bg-[#f7f7f7] rounded-full leading-none text-sm">
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