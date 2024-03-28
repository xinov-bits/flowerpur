'use client';

// REACT JS
import React, { useState, useEffect } from 'react'

// NEXT JS
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// FRAMER
import { motion, AnimatePresence } from "framer-motion"
import ProductCard from '../function/ProductCard';


const Search2 = ({ isSearchMenu, setIsSearchMenu, searchResults, recentSearches }) => {

    return (
        <>
            <AnimatePresence>
                {isSearchMenu && (
                    <div className="fixed z-[400] top-14 left-0 flex justify-center items-start w-full h-full text-[#191919]">
                        <motion.div
                            className="absolute z-[400] top-0 left-0 flex justify-center items-center w-full h-full bg-[#262626] bg-opacity-80"
                            onClick={() => {
                                setIsSearchMenu(false);
                            }}

                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                        />

                        <motion.div className="absolute top-0 z-[401] flex flex-col justify-center items-center w-full h-auto bg-white overflow-hidden"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                        >
                            <div className="relative block justify-start items-start w-full h-full">
                                <div className="block justify-start items-center w-full h-auto py-4 text-[#191919]">
                                    {searchResults?.length > 0 && (
                                        <div className="block justify-start items-center w-full h-auto">
                                            <div className="flex justify-start items-center px-8 mb-2 text-xl font-bold !leading-none">
                                                Results • {searchResults?.length}
                                            </div>

                                            <div className="grid grid-cols-5 gap-4 gap-y-6 justify-start items-start w-full px-8 mt-6">
                                                {Object.keys(searchResults).map((search, index) => (
                                                    <ProductCard key={index}
                                                        itemCode={searchResults[search]._id}
                                                        slug={searchResults[search].slug}
                                                        qty={searchResults[search].qty}
                                                        availableQty={searchResults[search].availableQty}
                                                        price={searchResults[search].price}
                                                        dimg={searchResults[search].dimg}
                                                        title={searchResults[search].title}
                                                        offer={searchResults[search].offer}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}


                                    {searchResults?.length <= 0 && (
                                        <div className="block justify-start items-center w-full h-auto">
                                            <div className="flex justify-start items-center px-4 mb-4 text-xl font-bold !leading-none">
                                                Recent searches
                                            </div>

                                            <ul className="block justify-start items-center w-full divide-y divide-[#e5e5e5]">
                                                {recentSearches.map((search, index) => <li key={index} className="flex justify-start items-center w-full h-12 px-4 bg-white hover:bg-[#f7f7f7] group">
                                                    <Link href={search.url} className="flex justify-start items-center w-full h-full no-outline">
                                                        <div className="flex justify-between items-center w-full h-full no-outline">
                                                            <div className="flex justify-start items-center w-full h-full space-x-2">
                                                                <div className="flex justify-center items-center w-auto">
                                                                    <div className="flex justify-center items-center size-8 rounded-full text-[#494949] bg-[#eeeeee] group-hover:bg-white">
                                                                        <svg className="flex justify-center items-center size-4" width={24} height={24}>
                                                                            <use
                                                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-clock_dd"
                                                                            ></use>
                                                                        </svg>
                                                                    </div>
                                                                </div>

                                                                <div className="flex justify-start items-center w-full font-semibold text-base grou-hover:underline">
                                                                    {search.name}
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-center items-center size-5 text-[#494949]">
                                                                <svg className="flex justify-center items-center size-full" width={24} height={24}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"
                                                                    ></use>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>)}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Search2