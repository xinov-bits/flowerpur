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


  return (
    <>
      <div className="flex flex-col w-full h-full justify-center items-start bg-white overflow-x-hidden">
        <div className="flex w-full h-full justify-center items-start select-none">
          <div className="relative hidden sm:hidden md:block lg:block xl:block justify-start items-start w-full text-[#333333]">
            <div className="relative flex justify-center items-start w-full">
              <Link href="/flowers" className="flex justify-center items-center w-full no-outline">
                <div className="absolute right-8 flex justify-end items-center w-full">
                  <div className="flex flex-col justify-end items-center w-full text-right">
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
                        <Link href="/flowers" className="flex justify-center items-center w-auto">
                          <button className="flex justify-center items-center w-auto h-10 px-3.5 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] text-white font-semibold rounded">
                            <div> Shop Birthday </div>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center w-full p-0 overflow-hidden">
                  <Image className="flex justify-center items-center w-full h-full overflow-hidden"
                    src={"https://i.ibb.co/CnLzvb3/banner-01.webp"}
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
                  src={"https://i.ibb.co/vsrVHwW/0215-HPUpdate-For-Every-Ocasssion-HPPods-Subs-Mobile.jpg"}
                  width={480}
                  height={426}
                  alt="banner_01__mobile"
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
                    <div className="flex justify-center items-center w-[40%]">
                      <Link href="/flowers" className="flex justify-center items-center w-auto">
                        <button className="flex justify-center items-center w-auto h-[2.75rem] px-4 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] text-white font-semibold rounded-md">
                          <div> Shop Birthday </div>
                        </button>
                      </Link>
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


        <div className="block justify-start items-start w-full h-full bg-white py-6 sm:py-6 md:py-8 lg:py-8 xl:py-8 text-[#494949]">
          <div className="block w-full h-full px-6 sm:px-6 md:px-10 lg:px-10 xl:px-10">
            <div className="flex flex-col justify-start items-center w-full h-full select-none">
              <div className="flex justify-start items-center w-full text-2xl font-bold text-[#191919]">
                Best-Selling Bouquets
              </div>

              <div className="flex justify-start items-center w-full">
                <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-start items-start w-full mt-4">
                  <Swiper
                    className="flex justify-center items-center w-full h-auto rounded-md overflow-hidden"
                    slidesPerView={3.8}
                    spaceBetween={12}
                    pagination={{ clickable: true }}
                    resistanceRatio={0.2}
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
                    resistanceRatio={0.2}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}