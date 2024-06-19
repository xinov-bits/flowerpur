"use client"

import React, { useState, useEffect, useContext, Suspense } from 'react'

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
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

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
  const [products, setProducts] = useState([])
  const [filterProducts, setFilterProducts] = useState([])

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
      })
      setProducts(response.data)
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  // MAIN SLIDES
  const mainSlides = [
    {
      name: "Birthday Bouquets",
      desc: "Offers, coupons and discounts <br /> available",
      img: "https://i.ibb.co/9yX5PS1/flower-1.png",
      pattern: "/assets/banners/pattern.png",
      color: ['bg-[#06C167]', 'text-[#FFFFFF]', 'bg-[#142328]']
    },
    {
      name: "Anniversary Bouquets",
      desc: "Offers, coupons and discounts <br /> available",
      img: "https://i.ibb.co/zPNNs49/flower-2.png",
      pattern: "/assets/banners/pattern3.png",
      color: ['bg-[#FFD7D2]', 'text-[#DB3D33]', 'bg-[#C1291F]']
    },
    {
      name: "With Vase",
      desc: "Offers, coupons and discounts <br /> available",
      img: "https://i.ibb.co/30Z7Psy/flower-3.png",
      pattern: "/assets/banners/pattern4.png",
      color: ['bg-[#FFC043]', 'text-[#191919]', 'bg-[#142328]']
    },
    {
      name: "Revitalizing Plants",
      desc: "Offers, coupons and discounts <br /> available",
      img: "https://i.ibb.co/yqhpx79/flower-4.png",
      pattern: "/assets/banners/pattern5.png",
      color: ['bg-[#0F462D]', 'text-[#FFFFFF]', 'bg-[#06C167]']
    },
  ]

  const [showHero, setShowHero] = useState(false)

  useEffect(() => {
    if (!showHero) {
      setTimeout(() => {
        setShowHero(true);
      }, 1000);
    }
  }, [showHero])


  // RATINGS
  const [addedAnim, setAddedAnim] = useState([false, '']);

  useEffect(() => {
    if (addedAnim[0] === true) {
      setTimeout(() => {
        setAddedAnim([false, '']);
      }, 1000);
    }
  }, [addedAnim])

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


  // MENU
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (!showMenu) {
      setTimeout(() => {
        setShowMenu(true);
      }, 1000);
    }
  }, [showMenu])

  const menu = [
    {
      name: "Bouquets",
      url: "/flowers",
      img: "/assets/icons/svg/flowers.png",
    },
    {
      name: "Vases",
      url: "/",
      img: "/assets/icons/svg/vase.svg",
    },
    {
      name: "Birthday",
      url: "/",
      img: "/assets/icons/svg/cake.svg",
    },
    {
      name: "Plants",
      url: "/",
      img: "/assets/icons/svg/plant.svg",
    },
    {
      name: "Gifts",
      url: "/",
      img: "/assets/icons/svg/gifts.svg",
    },
    {
      name: "Anniversary",
      url: "/",
      img: "/assets/icons/svg/anniversary.svg",
    },
    {
      name: "Occasions",
      url: "/",
      img: "/assets/icons/svg/occasions.svg",
    },
  ]

  return (
    <>
      <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-center items-center w-full h-16 py-2 space-x-4 bg-[#f7f7f7] select-none overflow-hidden">
        {menu.map((slide, index) => {
          return (
            <Link key={index} href={slide.url} className="relative flex justify-center items-start !w-auto h-full px-2 rounded-[--global-radius-md] bg-white space-x-1.5 overflow-hidden">
              <button className="flex justify-center items-center w-auto h-full no-outline">
                <div className="flex justify-start items-center w-auto h-auto">
                  <Image className="flex justify-center items-center w-auto h-10"
                    src={slide.img}
                    width={192}
                    height={192}
                    alt={slide.name}
                  />
                </div>

                <div className="flex justify-center items-center w-auto leading-none font-medium text-base">
                  {slide.name}
                </div>
              </button>
            </Link>
          )
        })}
      </div>

      <div className="flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-center w-full h-auto py-2 duration-200">
        {showMenu ? (
          <Swiper
            className="flex justify-center items-center w-full h-full !px-4 overflow-hidden"
            slidesPerView={5.2}
            spaceBetween={10}
            resistanceRatio={0.4}
            freeMode={true}
            modules={[FreeMode]}
          >
            {menu.map((slide, index) => <SwiperSlide key={index} className="relative flex justify-center items-start w-auto h-full">
              <Link href={slide.url} className="flex flex-col justify-center items-center w-full h-full">
                <div className="flex justify-center items-center w-auto h-auto">
                  <Image className="flex justify-center items-center w-auto h-14"
                    src={slide.img}
                    width={192}
                    height={192}
                    alt={slide.name}
                  />
                </div>

                <div className="flex justify-center items-center w-auto leading-none font-bold text-xs">
                  {slide.name}
                </div>
              </Link>
            </SwiperSlide>)}
          </Swiper>
        ) : (
          <div className="flex justify-center items-center w-auto h-auto !px-4 space-x-4 overflow-hidden">
            <div className="flex justify-start items-start size-[3.5rem] bg-[#f7f7f7] rounded-[--global-radius-md]  c-skeleton" />
            <div className="flex justify-start items-start size-[3.5rem] bg-[#f7f7f7] rounded-[--global-radius-md]  c-skeleton" />
            <div className="flex justify-start items-start size-[3.5rem] bg-[#f7f7f7] rounded-[--global-radius-md]  c-skeleton" />
            <div className="flex justify-start items-start size-[3.5rem] bg-[#f7f7f7] rounded-[--global-radius-md]  c-skeleton" />
            <div className="flex justify-start items-start size-[3.5rem] bg-[#f7f7f7] rounded-[--global-radius-md]  c-skeleton" />
          </div>
        )}
      </div>

      <div className="block w-full h-full justify-center items-start bg-white">
        <div className="flex w-full h-full justify-start items-start select-none">
          <div className="relative hidden sm:hidden md:flex lg:flex xl:flex w-full h-full justify-start items-start select-none">
            {showHero > 0 ? (
              <Swiper
                className="flex justify-center items-center w-auto h-auto !p-4 overflow-hidden"
                slidesPerView={3.04}
                spaceBetween={16}
                resistanceRatio={0.4}
                freeMode={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, FreeMode]}
              >
                {mainSlides.map((slide, index) => <SwiperSlide key={index} className="relative flex justify-start items-start w-[23rem] h-auto rounded-lg overflow-hidden">
                  <div className={`flex justify-start items-start w-[23rem] h-[14rem] ${slide.color[0]} rounded-lg overflow-hidden`}>
                    <div className={`z-[2] flex flex-col justify-center items-center w-auto h-full pl-4 ${slide.color[1]} overflow-hidden`}>
                      <div className="flex justify-start items-center w-full text-[1.2rem] font-bold !leading-none">
                        {slide.name}
                      </div>

                      <div className="flex justify-start items-center w-full mt-1 text-[0.82rem] font-medium !leading-none"
                        dangerouslySetInnerHTML={{ __html: slide.desc }}
                      />

                      <div className="flex justify-start items-center w-full mt-2.5 text-sm">
                        <button className={`flex justify-center items-center w-auto h-auto px-3 py-2 font-medium !leading-none ${slide.color[2]} text-white rounded-[--global-radius-md]`}>
                          Shop now
                        </button>
                      </div>
                    </div>

                    <div className="absolute z-[1] top-0 right-0 flex justify-end items-center w-[10rem] h-full bg-[#f6f0ea] overflow-hidden">
                      <Image className="flex justify-center items-center w-auto h-auto"
                        width={180}
                        height={250}
                        src={slide.pattern}
                        alt={slide.name}
                      />
                    </div>

                    <div className="absolute z-[2] top-6 right-0.5 flex justify-end items-center w-[14rem] h-full">
                      <Image className="flex justify-center items-center w-auto h-auto"
                        width={262}
                        height={192}
                        src={slide.img}
                        alt={slide.name}
                      />
                    </div>
                  </div>
                </SwiperSlide>)}
              </Swiper>
            ) : (
              <div className="flex justify-center items-center w-auto h-auto !p-4 space-x-4 overflow-hidden">
                <div className="flex justify-start items-start w-[23rem] h-[14rem] bg-[#f7f7f7] rounded-lg  c-skeleton" />
                <div className="flex justify-start items-start w-[23rem] h-[14rem] bg-[#f7f7f7] rounded-lg  c-skeleton" />
                <div className="flex justify-start items-start w-[23rem] h-[14rem] bg-[#f7f7f7] rounded-lg  c-skeleton" />
              </div>
            )}
          </div>

          <div className="flex sm:flex md:hidden lg:hidden xl:hidden w-full h-full justify-start items-start select-none">
            {showHero > 0 ? (
              <Swiper
                className="flex justify-center items-center w-auto h-auto !p-4 overflow-hidden"
                slidesPerView={1.02}
                spaceBetween={10}
                resistanceRatio={0.4}
                freeMode={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, FreeMode]}
              >
                {mainSlides.map((slide, index) => <SwiperSlide key={index} className="relative flex justify-start items-start w-[23rem] h-auto rounded-lg overflow-hidden">
                  <div className={`flex justify-start items-start w-[23rem] h-[14rem] ${slide.color[0]} rounded-lg overflow-hidden`}>
                    <div className={`z-[2] flex flex-col justify-center items-center w-auto h-full pl-4 ${slide.color[1]} overflow-hidden`}>
                      <div className="flex justify-start items-center w-full text-[1.15rem] min-[412px]:text-2xl font-bold !leading-none">
                        {slide.name}
                      </div>

                      <div className="flex justify-start items-center w-full mt-1 text-[0.7rem] min-[412px]:text-[0.9rem] font-medium !leading-none"
                        dangerouslySetInnerHTML={{ __html: slide.desc }}
                      />

                      <div className="flex justify-start items-center w-full mt-2.5 text-[0.8rem] min-[412px]:text-[0.85rem]">
                        <button className={`flex justify-center items-center w-auto h-auto px-3 py-2 font-medium !leading-none ${slide.color[2]} text-white rounded-[--global-radius-md]`}>
                          Shop now
                        </button>
                      </div>
                    </div>

                    <div className="absolute z-[1] top-0 right-0 flex justify-end items-center w-[10rem] h-full bg-[#f6f0ea] overflow-hidden">
                      <Image className="flex justify-center items-center w-auto h-auto"
                        width={180}
                        height={250}
                        src={slide.pattern}
                        alt=""
                      />
                    </div>

                    <div className="absolute z-[2] top-6 right-0.5 flex justify-end items-center w-[14rem] h-full">
                      <Image className="flex justify-center items-center w-auto h-auto"
                        width={262}
                        height={192}
                        src={slide.img}
                        alt=""
                      />
                    </div>
                  </div>
                </SwiperSlide>)}
              </Swiper>
            ) : (
              <div className="flex justify-center items-center w-auto h-auto !p-4 space-x-4 overflow-hidden">
                <div className="flex justify-start items-start w-[23rem] h-[14rem] bg-[#f7f7f7] rounded-lg  c-skeleton" />
              </div>
            )}
          </div>
        </div>


        <div className="block justify-start items-start w-full h-full py-4 sm:py-4 md:py-4 lg:py-4 xl:py-4 bg-white space-y-8 text-[#494949]">
          <div className="block items-center w-full h-full select-none">
            <div className="flex justify-start items-center w-full px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 mb-2 text-2xl font-bold text-[#191919]">
              Best-Selling Bouquets
            </div>

            <div className="flex justify-start items-center w-full">
              <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-start items-start w-full">
                {(filterProducts != [] && filterProducts.length > 0) ? (
                  <Swiper
                    className="flex justify-center items-center w-full h-auto !px-8 rounded-md overflow-hidden"
                    slidesPerView={4.8}
                    spaceBetween={16}
                    pagination={{ clickable: true }}
                    resistanceRatio={0}
                  >
                    {Object.keys(products).filter((item) => {
                      if ((products[item].category === 'flowers') && (products[item].subCategory === 'roses')) {
                        return products[item]
                      }
                    }).map((item, index) => {
                      return (<SwiperSlide key={index} className="flex justify-center items-center w-full h-full overflow-hidden">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.1 }}
                        >
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
                        </motion.div>
                      </SwiperSlide>
                      )
                    })}
                  </Swiper>
                ) : (
                  <div className="flex justify-start items-center w-full h-[12rem] sm:h-[12rem] md:h-[18.2rem] lg:h-[18.2rem] xl:h-[18.2rem] !px-8 rounded-lg">
                    <div className="flex justify-start items-center w-full h-full space-x-4">
                      <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                      <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                      <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                      <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                      <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex sm:flex md:hidden lg:hidden xl:hidden justify-start items-start w-full">
                {(filterProducts != [] && filterProducts.length > 0) ? (
                  <Swiper
                    className="flex justify-center items-center w-full h-auto !px-4 rounded-md overflow-hidden"
                    slidesPerView={2.06}
                    spaceBetween={12}
                    pagination={{ clickable: true }}
                    resistanceRatio={0}
                  >
                    {Object.keys(products).filter((item) => {
                      if ((products[item].category === 'flowers') && (products[item].subCategory === 'roses')) {
                        return products[item]
                      }
                    }).map((item, index) => {
                      return (
                        <SwiperSlide key={index} className="flex justify-center items-center w-full h-full overflow-hidden">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.1 }}
                          >
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
                          </motion.div>
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                ) : (
                  <div className="flex justify-start items-center w-full h-[12rem] sm:h-[12rem] md:h-[18.2rem] lg:h-[18.2rem] xl:h-[18.2rem] !px-4 rounded-lg">
                    <div className="flex justify-start items-center w-full h-full space-x-4">
                      <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                      <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center w-full h-1 bg-[#f7f7f7] border-y border-[#e5e5e5]" />

          <div className="block items-center w-full h-full select-none">
            <div className="flex flex-col justify-start items-center w-full h-full select-none">
              <div className="flex justify-start items-center w-full px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 mb-2 text-2xl font-bold text-[#191919]">
                Top-Rated Bouquets
              </div>

              <div className="flex justify-start items-center w-full">
                <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-start items-start w-full">
                  {(filterProducts != [] && filterProducts.length > 0) ? (
                    <Swiper
                      className="flex justify-center items-center w-full h-auto !px-8 rounded-md overflow-hidden"
                      slidesPerView={4.8}
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
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <ProductCard key={filterProducts[item]._id}
                                itemCode={filterProducts[item]._id}
                                slug={filterProducts[item].slug}
                                qty={filterProducts[item].qty}
                                availableQty={filterProducts[item].availableQty}
                                price={filterProducts[item].price}
                                dimg={filterProducts[item].dimg}
                                title={filterProducts[item].title}
                                offer={filterProducts[item].offer}
                              />
                            </motion.div>
                          </SwiperSlide>
                        )
                      })}
                    </Swiper>
                  ) : (
                    <div className="flex justify-start items-center w-full h-[12rem] sm:h-[12rem] md:h-[18.2rem] lg:h-[18.2rem] xl:h-[18.2rem] !px-8 rounded-lg">
                      <div className="flex justify-start items-center w-full h-full space-x-4">
                        <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                        <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                        <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                        <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                        <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex sm:flex md:hidden lg:hidden xl:hidden justify-start items-start w-full">
                  {(filterProducts != [] && filterProducts.length > 0) ? (
                    <Swiper
                      className="flex justify-start items-center w-full h-auto !px-4 rounded-md overflow-hidden"
                      slidesPerView={2.06}
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
                      }).map((item, index) => {
                        return (
                          <SwiperSlide key={index} className="flex justify-center items-center w-full h-full overflow-hidden">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <ProductCard key={filterProducts[item]._id}
                                itemCode={filterProducts[item]._id}
                                slug={filterProducts[item].slug}
                                qty={filterProducts[item].qty}
                                availableQty={filterProducts[item].availableQty}
                                price={filterProducts[item].price}
                                dimg={filterProducts[item].dimg}
                                title={filterProducts[item].title}
                                offer={filterProducts[item].offer}
                              />
                            </motion.div>
                          </SwiperSlide>
                        )
                      })}
                    </Swiper>
                  ) : (
                    <div className="flex justify-start items-center w-full h-[12rem] sm:h-[12rem] md:h-[18.2rem] lg:h-[18.2rem] xl:h-[18.2rem] !px-4 rounded-lg">
                      <div className="flex justify-start items-center w-full h-full space-x-4">
                        <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                        <div className="flex justify-center items-center w-[11.2rem] sm:w-[11.2rem] md:w-[14.4rem] lg:w-[14.4rem] xl:w-[14.4rem] h-full bg-[#f7f7f7] rounded-lg  c-skeleton" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}