"use client"

import React, { useState, useEffect, useContext } from 'react'

// NEXT JS
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

// CRYPTO JS
import CryptoJS from 'crypto-js'

// AXIOS
import axios from 'axios';

// FRAMER
import { motion, AnimatePresence } from "framer-motion"

// SWIPER & SPLIDE
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

// CONTEXT
import CartContext from '@/context/CartContext';

// COMPONENTS
import ProductCard from "@/components/function/ProductCard";


export default function Home() {
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


  // FLOWER CATEGORIES
  const flowerCategories = [
    {
      name: 'flower in vase',
      image: 'https://i.ibb.co/ZgbRxJ9/img-to-enhance-ED-sqr-min.webp',
      url: '/flowers'
    },
    {
      name: 'birthday',
      image: 'https://i.ibb.co/gP9Mbq1/BD2-D-LOL-preset-proflowers-mx-tile-wide-sv-new.jpg',
      url: '/flowers'
    },
    {
      name: 'anniversary',
      image: 'https://i.ibb.co/mJKwq3Y/P2168-LOL-preset-proflowers-mx-tile-wide-sv-new.jpg',
      url: '/flowers'
    },
    {
      name: 'love & affection',
      image: 'https://i.ibb.co/Yd5BMfg/B59-D-LOL-preset-proflowers-mx-tile-wide-sv-new.jpg',
      url: '/flowers'
    },
    {
      name: 'flower gift boxes',
      image: 'https://i.ibb.co/4M6dcGp/gift-box.jpg',
      url: '/flowers'
    },
  ]


  // RATINGS
  const [addedAnim, setAddedAnim] = useState([false, '']);

  useEffect(() => {
    if (addedAnim[0] === true) {
      setTimeout(() => {
        setAddedAnim([false, '']);
      }, 2000);
    }
  }, [addedAnim])

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

  // FILTER & RATINGS
  const [reviewMean, setReviewMean] = useState([]);
  const [reviewStarNames, setReviewStarNames] = useState([]);
  const [reviewNamesToSend, setReviewNamesToSend] = useState([]);

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

  useEffect(() => {
    let reviewNames = reviewMean.map((s) => s.name);

    setReviewStarNames(reviewMean.filter((s) => {
      if (s.stars >= 4) {
        return s
      }
    }).map((s) => s.name))
  }, [reviewMean])

  useEffect(() => {
    setReviewNamesToSend(reviewStarNames);
  }, [reviewStarNames])

  return (
    <>
      <div className="block w-full h-full justify-center items-start bg-white overflow-x-hidden">
        <div className="flex w-full h-full justify-center items-start select-none">
          <div className="relative hidden sm:hidden md:block lg:block xl:block justify-start items-start w-full text-[#333333]">
            <div className="relative flex justify-center items-start w-full">
              <Link href="/flowers" className="flex justify-center items-center w-full no-outline">
                <div className="absolute right-8 flex justify-end items-center w-full">
                  <div className="block justify-end items-center w-full text-right">
                    <div className="flex justify-end items-center w-full text-lg font-semibold leading-tight">
                      <div className="flex justify-end items-center w-[40%]">
                        IN FULL BLOOM:
                      </div>
                    </div>

                    <div className="flex justify-end items-center w-full my-2 text-4xl font-semibold leading-none font_libre">
                      <div className="flex justify-end items-center w-[40%]">
                        Exquisite Joy, Birthday Bouquets Await
                      </div>
                    </div>

                    <div className="flex justify-end items-center w-full text-lg font-semibold leading-none">
                      <div className="flex justify-end items-center w-[40%]">
                        Commend the sun&#39;s voyage with euphoric, mood-enhancing floral masterpieces.
                      </div>
                    </div>


                    <div className="flex justify-end items-center w-full mt-4 text-lg font-semibold leading-none">
                      <div className="flex justify-end items-center w-[40%]">
                        <button className="flex justify-center items-center w-auto h-10 px-3.5 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] text-white font-semibold rounded">
                          <div> Shop Birthday </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center w-full h-full bg-[#f7f7f7] overflow-hidden">
                  <Image className="flex justify-center items-center w-full h-full overflow-hidden"
                    src={"https://i.ibb.co/LYNP60X/banner-01-min.webp"}
                    width={1400}
                    height={535}
                    alt="banner_01"
                  />
                </div>
              </Link>
            </div>

            <div className="flex justify-center items-start w-full">
              <Link href="/flowers" className="flex justify-center items-start w-full no-outline">
                <div className="flex justify-center items-center w-full py-4 px-1 bg-[#FFE69B] text-center space-x-2">
                  <div className="text-base font-semibold leading-none">
                    Send fresh, long-lasting flowers that won&#39;t wilt your wallet.
                  </div>

                  <div className="text-base font-bold underline">
                    Shop under ₹899
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="relative flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-start w-full text-[#191919]">
            <Link href="/flowers" className="block justify-center items-start w-full no-outline">
              <div className="flex justify-center items-center w-full p-0 overflow-hidden">
                <Image className="flex justify-center items-center w-full h-full overflow-hidden"
                  src={"https://i.ibb.co/FBWdxkp/0215-HPUpdate-For-Every-Ocasssion-HPPods-Subs-Mobile.webp"}
                  width={480}
                  height={426}
                  alt="order flowers online from flowerpur in minutes for birthday"
                />
              </div>

              <div className="flex justify-center items-center w-full py-6 px-2 bg-[#FFFCF9]">
                <div className="block justify-center items-center w-full text-center">
                  <div className="flex justify-center items-center w-full text-lg font-semibold leading-tight">
                    <div className="flex justify-center items-center w-full">
                      IN FULL BLOOM:
                    </div>
                  </div>

                  <div className="flex justify-center items-center w-full my-1 text-2xl font-semibold leading-snug font_libre">
                    <div className="flex justify-center items-center w-full">
                      Exquisite Joy, Birthday Bouquets Await
                    </div>
                  </div>

                  <div className="flex justify-center items-center w-full text-lg font-semibold leading-tight">
                    <div className="flex justify-center items-center w-full">
                      Commend the sun&#39;s voyage with euphoric, mood-enhancing floral masterpieces.
                    </div>
                  </div>


                  <div className="flex justify-center items-center w-full mt-4 text-lg font-semibold leading-none">
                    <div className="flex justify-center items-center w-[60%]">
                      <button className="flex justify-center items-center w-auto h-[2.75rem] px-4 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] text-white font-semibold rounded-md">
                        <div> Shop Birthday </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center w-full py-4 px-1 bg-[#FFE69B]">
                <div className="block justify-center items-center w-full text-center">
                  <div className="text-sm font-semibold leading-none">
                    Send fresh, long-lasting flowers that won&#39;t wilt your wallet.
                  </div>

                  <div className="text-base font-bold underline">
                    Shop under ₹899
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-start w-full h-full bg-white py-6 text-[#494949] border-b border-[#e5e5e5] select-none">
          <ul className="hidden sm:hidden md:flex lg:flex xl:flex justify-center items-center w-full h-full space-x-6">
            {Object.keys(flowerCategories).map((item) => {
              return <Link href={flowerCategories[item].url} key={flowerCategories[item].name} className="rounded-t-lg rounded-b">
                <li className="flex flex-col justify-center items-center w-auto h-auto rounded-t-lg rounded-b">
                  <div className="flex justify-center items-center w-32 h-32 bg-[#f7f7f7] rounded-t-lg rounded-b overflow-hidden">
                    <Image className="flex justify-center items-center w-full h-full rounded-t-lg rounded-b"
                      src={flowerCategories[item].image}
                      width={800}
                      height={800}
                      alt={flowerCategories[item].name}
                    />
                  </div>

                  <div className="flex justify-center items-center w-auto mt-1 leading-none text-sm sm:text-sm md:text-base lg:text-base xl:text-base font-semibold">
                    {flowerCategories[item].name}
                  </div>
                </li>
              </Link>
            })}
          </ul>

          <div className="flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-start w-full px-4 overflow-x-hidden">
            <Swiper
              className="relative flex justify-start items-start w-full"
              slidesPerView={2.4}
              spaceBetween={16}
              resistanceRatio={0}
            >
              {Object.keys(flowerCategories).map((item) => {
                return (
                  <SwiperSlide key={flowerCategories[item].name} className="flex justify-start items-center w-full">
                    <Link href={flowerCategories[item].url} className="rounded-lg">
                      <div className="flex justify-center items-center w-full h-full bg-[#f7f7f7] rounded-t-lg rounded-b">
                        <Image
                          className="flex justify-center items-center w-full h-full rounded-t-lg rounded-b"
                          src={flowerCategories[item].image}
                          width={719}
                          height={719}
                          alt={flowerCategories[item].name}
                        />
                      </div>

                      <div className="flex justify-center items-center w-auto mt-1 text-center text-base font-medium text-[#292929]">
                        {flowerCategories[item].name}
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="block justify-start items-start w-full h-full bg-white py-6 sm:py-6 md:py-8 lg:py-8 xl:py-8 space-y-10 text-[#494949]">
          <div className="block w-full h-full px-6 sm:px-6 md:px-10 lg:px-10 xl:px-10">
            {!(products == [] || products === undefined || products === null || products.length <= 0) && <div className="flex flex-col justify-start items-center w-full h-full select-none">
              <div className="flex justify-start items-center w-full text-2xl font-bold text-[#191919]">
                Best-Selling Bouquets
              </div>

              <div className="flex justify-start items-center w-full">
                <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-start items-start w-full mt-4">
                  <Swiper
                    className="flex justify-center items-center w-full h-auto rounded-md overflow-hidden"
                    slidesPerView={3.8}
                    spaceBetween={16}
                    pagination={{ clickable: true }}
                    resistanceRatio={0}
                  >
                    {Object.keys(products).filter((item) => {
                      if ((products[item].category === 'flowers') && (products[item].subCategory === 'roses')) {
                        return products[item]
                      }
                    }).map((item) => {
                      return (<SwiperSlide key={products[item]._id} className="flex justify-center items-center w-full h-full overflow-hidden">
                        <ProductCard key={products[item]._id}
                          itemCode={products[item]._id}
                          slug={products[item].slug}
                          qty={products[item].qty}
                          availableQty={products[item].availableQty}
                          price={products[item].price}
                          dimg={products[item].dimg}
                          title={products[item].title}
                          offer={products[item].offer}
                        />
                      </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </div>

                <div className="flex sm:flex md:hidden lg:hidden xl:hidden justify-start items-start w-full mt-6">
                  <Swiper
                    className="flex justify-center items-center w-full h-auto rounded-md overflow-hidden"
                    slidesPerView={1.75}
                    spaceBetween={12}
                    pagination={{ clickable: true }}
                    resistanceRatio={0}
                  >
                    {Object.keys(products).filter((item) => {
                      if ((products[item].category === 'flowers') && (products[item].subCategory === 'roses')) {
                        return products[item]
                      }
                    }).map((item) => {
                      return (
                        <SwiperSlide key={products[item]._id} className="flex justify-center items-center w-full h-full overflow-hidden">
                          <ProductCard
                            itemCode={products[item]._id}
                            slug={products[item].slug}
                            qty={products[item].qty}
                            availableQty={products[item].availableQty}
                            price={products[item].price}
                            dimg={products[item].dimg}
                            title={products[item].title}
                            offer={products[item].offer}
                          />
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </div>
              </div>
            </div>}
          </div>

          <div className="flex justify-center items-center w-full h-2 sm:h-2 md:h-1 lg:h-1 xl:h-1 bg-[#f7f7f7] border-y border-[#e5e5e5]" />

          <div className="block w-full h-full px-6 sm:px-6 md:px-10 lg:px-10 xl:px-10">
            {!(products == [] || products === undefined || products === null || products.length <= 0) && <div className="flex flex-col justify-start items-center w-full h-full select-none">
              <div className="flex justify-start items-center w-full text-2xl font-bold text-[#191919]">
                Top-Rated Bouquets
              </div>

              <div className="flex justify-start items-center w-full">
                <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-start items-start w-full mt-4">
                  <Swiper
                    className="flex justify-center items-center w-full h-auto rounded-md overflow-hidden"
                    slidesPerView={3.8}
                    spaceBetween={16}
                    pagination={{ clickable: true }}
                    resistanceRatio={0}
                  >
                    {Object.keys(filterProducts).filter((item) => {
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
                    }).map((item) => {
                      return (
                        <SwiperSlide key={products[item]._id} className="flex justify-center items-center w-full h-full overflow-hidden">
                          <ProductCard key={filterProducts[item]._id}
                            itemCode={filterProducts[item]._id}
                            slug={filterProducts[item].slug}
                            qty={filterProducts[item].qty}
                            availableQty={filterProducts[item].availableQty}
                            price={filterProducts[item].price}
                            dimg={filterProducts[item].dimg}
                            title={filterProducts[item].title}
                            offer={filterProducts[item].offer}

                            ratings={reviewNamesToSend}
                          />
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </div>

                <div className="flex sm:flex md:hidden lg:hidden xl:hidden justify-start items-start w-full mt-6">
                  <Swiper
                    className="flex justify-start items-center w-full h-auto rounded-md overflow-hidden"
                    slidesPerView={1.75}
                    spaceBetween={12}
                    pagination={{ clickable: true }}
                    resistanceRatio={0}
                  >
                    {Object.keys(filterProducts).filter((item) => {
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
                    }).map((item) => {
                      return (
                        <SwiperSlide key={products[item]._id} className="flex justify-center items-center w-full h-full overflow-hidden">
                          <ProductCard key={filterProducts[item]._id}
                            itemCode={filterProducts[item]._id}
                            slug={filterProducts[item].slug}
                            qty={filterProducts[item].qty}
                            availableQty={filterProducts[item].availableQty}
                            price={filterProducts[item].price}
                            dimg={filterProducts[item].dimg}
                            title={filterProducts[item].title}
                            offer={filterProducts[item].offer}

                            ratings={reviewNamesToSend}
                          />
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}