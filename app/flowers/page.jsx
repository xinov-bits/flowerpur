"use client"

import React from 'react'

// NEXT JS
import Link from 'next/link'
import Image from 'next/image'

// SWIPER & SPLIDE
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const Page = () => {
    const flowerCategories = [
        {
            name: 'with vase',
            image: 'https://images.ctfassets.net/ztm44xofsurz/7gxoaeU5BdR5magaXotVSq/01914c4d37b89448baffb074788022b8/4492_PF_Summer23_June_ThankYou_CategoryTile.jpg?w=384&fm=webp&q=70',
            url: '/flowers'
        },
        {
            name: 'birthday',
            image: 'https://images.ctfassets.net/ztm44xofsurz/1i5dX5yARLOPyL4I9vPm1q/53f8e6f1f72a334d1aeff0adf864f502/4492_PF_Summer23_June_Baby_CategoryTile.jpg?w=384&fm=webp&q=70',
            url: '/flowers'
        },
        {
            name: 'anniversary',
            image: 'https://images.ctfassets.net/ztm44xofsurz/5Q3PIJ8fgAZEBSk9qS47i/62553a70420ca5b30b5310d799cf3b8e/4492_PF_Summer23_June_Anniversary_CategoryTile.jpg?w=384&fm=webp&q=70',
            url: '/flowers'
        },
        {
            name: 'love',
            image: 'https://images.ctfassets.net/ztm44xofsurz/6dZqTQEMxKrYnHjJQN7P8G/e1619dbc6e1ed32246b841bab0a31a55/4492_PF_Summer23_June_Congratulations_CategoryTile.jpg?w=384&fm=webp&q=70',
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
            <div className="block justify-start items-start w-screen h-auto bg-white py-4 sm:py-4 md:py-8 lg:py-8 xl:py-8 space-y-6 sm:space-y-6 md:space-y-8 lg:space-y-8 xl:space-y-8 text-[#494949] overflow-x-hidden">
                <div className="block items-center w-full h-auto">
                    <div className="flex flex-col justify-start items-center w-full px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8">
                        <div className="flex justify-start items-center w-full !leading-none text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold text-[#191919]">
                            Flowers
                        </div>
                        <div className="flex justify-start items-center w-full text-sm sm:text-sm md:text-base lg:text-base xl:text-base font-normal text-[#292929]">
                            shop from categories
                        </div>
                    </div>

                    <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-center items-center w-full mt-4 !pr-4">
                        <Swiper
                            className="relative flex justify-start items-center w-full h-auto !px-4"
                            slidesPerView={4.8}
                            spaceBetween={20}
                            resistanceRatio={0.4}
                            modules={[FreeMode]}
                            freeMode={true}
                        >
                            {Object.keys(flowerCategories).map((item, index) => {
                                return <SwiperSlide key={index} className="flex justify-start items-center w-full h-auto">
                                    <Link href={flowerCategories[item].url} className="rounded-lg">
                                        <div className="flex justify-center items-center w-full h-full p-2 bg-[#f6edec] rounded-md">
                                            <Image className="flex justify-center items-center w-full h-full rounded-md"
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

                    <div className="flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-center w-full mt-2.5 !pr-4">
                        <Swiper
                            className="relative flex justify-start items-center w-full h-auto !px-4"
                            slidesPerView={2.4}
                            spaceBetween={10}
                            resistanceRatio={0.4}
                            modules={[FreeMode]}
                            freeMode={true}
                        >
                            {Object.keys(flowerCategories).map((item, index) => {
                                return (
                                    <SwiperSlide key={index} className="flex justify-start items-center w-full">
                                        <Link href={flowerCategories[item].url} className="rounded-lg">
                                            <div className="flex justify-center items-center w-full h-full p-2 bg-[#f6edec] rounded-md">
                                                <Image
                                                    className="flex justify-center items-center w-full h-full rounded-md"
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

                <div className="flex justify-center items-center w-full h-1 bg-[#f7f7f7] border-y border-[#e5e5e5]" />

                <div className="block items-center w-full h-auto">
                    <div className="flex flex-col justify-start items-center w-full px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8">
                        <div className="flex justify-start items-center w-full !leading-none text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold text-[#191919]">
                            Flowers
                        </div>
                        <div className="flex justify-start items-center w-full text-sm sm:text-sm md:text-base lg:text-base xl:text-base font-normal text-[#292929]">
                            popular spring flowers
                        </div>
                    </div>

                    <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-center items-center w-full mt-4 !pr-4">
                        <Swiper
                            className="relative flex justify-start items-center w-full h-auto !px-4"
                            slidesPerView={4.8}
                            spaceBetween={20}
                            resistanceRatio={0.4}
                            modules={[FreeMode]}
                            freeMode={true}
                        >
                            {Object.keys(flowerKinds).map((item, index) => {
                                return <SwiperSlide key={index} className="flex justify-start items-center w-full h-auto">
                                    <Link href={flowerKinds[item].url} className="rounded-lg">
                                        <div className="flex justify-center items-center w-full h-full bg-[#f7f7f7] rounded-md">
                                            <Image className="flex justify-center items-center w-full h-full rounded-md"
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
                                </SwiperSlide>
                            })}
                        </Swiper>
                    </div>

                    <div className="flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-center w-full mt-2.5 !pr-4">
                        <Swiper
                            className="relative flex justify-start items-center w-full h-auto !px-4"
                            slidesPerView={2.4}
                            spaceBetween={10}
                            resistanceRatio={0.4}
                            modules={[FreeMode]}
                            freeMode={true}
                        >
                            {Object.keys(flowerKinds).map((item, index) => {
                                return <SwiperSlide key={index} className="flex justify-start items-center w-full h-auto">
                                    <Link href={flowerKinds[item].url} className="rounded-lg">
                                        <div className="flex justify-center items-center w-full h-full bg-[#f7f7f7] rounded-md">
                                            <Image className="flex justify-center items-center w-full h-full rounded-md"
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