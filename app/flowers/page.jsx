"use client"

import React, { useState, useEffect, useContext, useRef } from 'react'

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

// CONTEXT
import CartContext from '@/context/CartContext';

const Page = () => {
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

    const flowerKinds = [
        {
            name: 'roses',
            image: 'https://i.ibb.co/fvKtkHt/0349-PF-Spring24-Site-Shop-By-Roses-Cat-Tile.webp',
            url: '/flowers/kinds/roses'
        },
        {
            name: 'sunflowers',
            image: 'https://i.ibb.co/T4jSfjw/0349-PF-Spring24-Site-Shop-By-Sunflowers-Cat-Tile.webp',
            url: '/flowers/kinds/roses'
        },
        {
            name: 'tulips',
            image: 'https://i.ibb.co/b6DmCnD/0349-PF-Spring24-Site-Shop-By-Tulips-Cat-Tile.webp',
            url: '/flowers/kinds/roses'
        },
        {
            name: 'peonies',
            image: 'https://i.ibb.co/ZhnFQjb/0349-PF-Spring24-Site-Shop-By-Peonies-Cat-Tile.webp',
            url: '/flowers/kinds/roses'
        },
    ]

    return (
        <>
            <div className="block justify-start items-start w-screen h-auto bg-white py-6 sm:py-6 md:py-8 lg:py-8 xl:py-8 space-y-6 sm:space-y-6 md:space-y-8 lg:space-y-8 xl:space-y-8 text-[#494949] overflow-x-hidden">
                <div className="block w-full h-auto px-6 sm:px-6 md:px-10 lg:px-10 xl:px-10">
                    <div className="flex flex-col justify-start items-center w-full">
                        <div className="flex justify-start items-center w-full !leading-none text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold text-[#191919]">
                            Flowers
                        </div>
                        <div className="flex justify-start items-center w-full text-base sm:text-base md:text-lg lg:text-lg xl:text-lg font-normal text-[#292929]  font_garmond">
                            shop from categories
                        </div>
                    </div>

                    <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-center items-center w-full mt-4 overflow-x-hidden">
                        <Swiper
                            className="relative flex justify-start items-center w-full h-auto"
                            slidesPerView={4.8}
                            spaceBetween={20}
                            pagination={{ clickable: true }}
                            resistanceRatio={0}
                        >
                            {Object.keys(flowerCategories).map((item) => {
                                return <SwiperSlide key={flowerCategories[item].name} className="flex justify-start items-center w-full h-auto">
                                    <Link href={flowerCategories[item].url} className="rounded-lg">
                                        <div className="flex justify-center items-center w-full h-full bg-[#f7f7f7] rounded-t-lg rounded-b">
                                            <Image className="flex justify-center items-center w-full h-full rounded-t-lg rounded-b"
                                                src={flowerCategories[item].image}
                                                width={800}
                                                height={800}
                                                alt={flowerCategories[item].name}
                                            />
                                        </div>

                                        <div className="flex justify-center items-center w-auto mt-1 text-center text-xl font-medium text-[#292929]">
                                            {flowerCategories[item].name}
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </div>

                    <div className="flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-start w-full mt-2.5 overflow-x-hidden">
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

                <div className="flex justify-center items-center w-full h-2 sm:h-2 md:h-1 lg:h-1 xl:h-1 bg-[#f7f7f7] border-y border-[#e5e5e5]" />

                <div className="block w-full h-auto px-6 sm:px-6 md:px-10 lg:px-10 xl:px-10">
                    <div className="flex flex-col justify-start items-center w-full">
                        <div className="flex justify-start items-center w-full !leading-none text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold text-[#191919]">
                            Flowers
                        </div>
                        <div className="flex justify-start items-center w-full text-base sm:text-base md:text-lg lg:text-lg xl:text-lg font-normal text-[#292929]  font_garmond">
                            popular spring flowers
                        </div>
                    </div>

                    <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-center items-center w-full mt-4">
                        <div className="flex justify-center items-center w-full h-auto select-none space-x-10">
                            {Object.keys(flowerKinds).map((item) => {
                                return <div key={flowerKinds[item].name} className="flex justify-center items-center w-full h-full">
                                    <Link href={flowerKinds[item].url} className="rounded-lg">
                                        <div className="flex justify-center items-center w-full h-full bg-[#f7f7f7] rounded-t-lg rounded-b">
                                            <Image className="flex justify-center items-center w-full h-full rounded-t-lg rounded-b"
                                                src={flowerKinds[item].image}
                                                width={800}
                                                height={800}
                                                alt={flowerKinds[item].name}
                                            />
                                        </div>

                                        <div className="flex justify-center items-center w-auto mt-1 text-center text-xl font-medium text-[#292929]">
                                            {flowerKinds[item].name}
                                        </div>
                                    </Link>
                                </div>
                            })}
                        </div>
                    </div>

                    <div className="flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-center w-full mt-2.5 overflow-x-hidden">
                        <Swiper
                            className="relative flex justify-start items-center w-full h-auto"
                            slidesPerView={2.4}
                            spaceBetween={16}
                            pagination={{ clickable: true }}
                            resistanceRatio={0}
                        >
                            {Object.keys(flowerKinds).map((item) => {
                                return <SwiperSlide key={flowerKinds[item].name} className="flex justify-start items-center w-full h-auto">
                                    <Link href={flowerKinds[item].url} className="rounded-lg">
                                        <div className="flex justify-center items-center w-full h-full bg-[#f7f7f7] rounded-t-lg rounded-b">
                                            <Image className="flex justify-center items-center w-full h-full rounded-t-lg rounded-b"
                                                src={flowerKinds[item].image}
                                                width={800}
                                                height={800}
                                                alt={flowerKinds[item].name}
                                            />
                                        </div>

                                        <div className="flex justify-center items-center w-auto mt-1 text-center text-base font-medium text-[#292929]">
                                            {flowerKinds[item].name}
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page