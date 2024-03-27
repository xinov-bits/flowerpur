'use client';

// REACT JS
import React, { useState, useEffect } from 'react'

// NEXT JS
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// FRAMER
import { motion, AnimatePresence } from "framer-motion"

// AXIOS
import axios from 'axios'

const Search2 = ({ isSearchMenu, setIsSearchMenu }) => {
    const router = useRouter();

    const [searchKey, setSearchKey] = useState('');

    const handleChangeSearch = (e) => {
        setSearchKey(e.target.value);
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault();

        setIsSearchMenu(false);

        if (searchKey !== '' && searchKey?.replaceAll(' ', '') != '' && searchKey?.length > 0) {
            router.push(`/search?keyword=${searchKey}`);
        }
    }


    // PRODUCT SEARCH
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

    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        fetchData()

        const filtered = Object.keys(products).filter((k) => {
            if (searchKey !== '') {
                if (products[k]?.category !== 'Special') {
                    if (JSON.stringify(products[k]?.title)?.toLowerCase()?.includes(searchKey.toLowerCase())) {
                        return products[k]
                    }
                    else if (JSON.stringify(products[k]?.slug)?.toLowerCase()?.includes(searchKey.toLowerCase())) {
                        return products[k]

                    }
                    else if (JSON.stringify(products[k]?.desc)?.toLowerCase()?.includes(searchKey.toLowerCase())) {
                        return products[k]

                    }
                    else if (JSON.stringify(products[k]?.category)?.toLowerCase()?.includes(searchKey.toLowerCase())) {
                        return products[k]

                    }
                    else if (JSON.stringify(products[k]?.subCategory)?.toLowerCase()?.includes(searchKey.toLowerCase())) {
                        return products[k]

                    }
                    else if (JSON.stringify(products[k]?.price)?.toLowerCase()?.includes(searchKey.toLowerCase())) {
                        return products[k]

                    }
                    else if (JSON.stringify(products[k]?.offer)?.toLowerCase()?.includes(searchKey.toLowerCase())) {
                        return products[k]
                    }
                }
            }
        }).map((k) => {
            return (
                {
                    'url': products[k].slug,
                    'name': products[k].title,
                    'img': products[k].dimg,
                    'price': products[k].price,
                    'offer': products[k].offer,
                }
            )
        })

        if (searchKey !== '' && searchKey?.replaceAll(' ', '') != '' && searchKey?.length > 0) {
            setSearchResults(filtered)
        } else {
            setSearchResults([])
        }
    }, [searchKey])


    const recentSearches = [
        {
            name: 'Birthday bouquets',
            url: '/'
        },
        {
            name: 'Flowers',
            url: '/flowers'
        },
        {
            name: 'Anniversary',
            url: '/'
        },
    ]


    return (
        <>
            <AnimatePresence>
                {isSearchMenu && (
                    <div className="fixed z-[600] top-0 left-0 flex justify-center items-start w-full h-full text-[#191919]">
                        <motion.div
                            className="absolute z-[600] top-0 left-0 flex justify-center items-center w-full h-full"
                            onClick={() => {
                                setSearchKey('');
                                setIsSearchMenu(false);
                            }}

                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                        />

                        <motion.div className="absolute top-0 right-[8.56rem] z-[601] flex flex-col justify-center items-center w-[44.52%] h-auto rounded-b-xl bg-white shadow-[0px_0px_15px_4px_rgba(25,25,25,0.1)] overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="relative block justify-start items-start w-full h-full pt-2">
                                <div className="flex justify-start items-start w-full h-10 px-2">
                                    <form className="relative flex justify-center items-center w-full h-full rounded-full overflow-hidden" htmlFor="search" onSubmit={handleSubmitSearch}>
                                        <div className="absolute left-2.5 flex justify-center items-center w-auto h-full select-none pointer-events-none">
                                            <svg className="flex justify-center items-center size-[1.35rem] text-[#191919]"
                                                width={24} height={24} onClick={() => {
                                                    setSearchKey('');
                                                    setIsSearchMenu(false);
                                                }}
                                            >
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-search_dd"
                                                ></use>
                                            </svg>
                                        </div>

                                        <input className="flex justify-center items-center w-full h-full pl-9 px-5 bg-[#eeeeee] placeholder:text-[#494949] text-[#191919] font-medium outline-none hover:bg-[#e5e5e5]"
                                            onChange={handleChangeSearch}
                                            value={searchKey}
                                            placeholder="Search for flowers, gifts and more"
                                            name="search"
                                            type="text"
                                            autoComplete='off'
                                            autoFocus
                                        />
                                    </form>
                                </div>


                                <div className="block justify-start items-center w-full h-auto mt-4 text-[#191919]">
                                    {searchResults?.length > 0 && (
                                        <div className="block justify-start items-center w-full h-auto">
                                            <div className="flex justify-start items-center px-2 mb-2 text-xl font-bold !leading-none">
                                                Results
                                            </div>

                                            <ul className="block justify-start items-center w-full divide-y divide-[#e5e5e5]">
                                                {searchResults.map((search, index) => <li key={index} className="flex justify-start items-center w-full h-16 px-2 bg-white hover:bg-[#f7f7f7] group">
                                                    <Link href={`/product/${search.url}`} className="flex justify-start items-center w-full h-full no-outline overflow-hidden">
                                                        <div className="flex justify-start items-center w-full h-full space-x-2">
                                                            <div className="flex justify-center items-center size-14 rounded-md overflow-hidden">
                                                                <Image className="flex justify-center items-center size-auto rounded-md overflow-hidden"
                                                                    src={search.img}
                                                                    width={100}
                                                                    height={100}
                                                                    alt={search.name}
                                                                />
                                                            </div>

                                                            <div className="flex justify-between items-center w-full h-full space-x-2 no-outline">
                                                                <div className="block justify-start items-center w-auto font-semibold">
                                                                    <div className="flex justify-start items-center w-max font-semibold text-base group-hover:underline">
                                                                        <span className="line-clamp-1">
                                                                            {search.name}
                                                                        </span>
                                                                    </div>

                                                                    <div className="flex justify-start items-center w-max font-semibold text-base text-[#767676]">
                                                                        ₹{(search?.price)?.toFixed(2)}
                                                                    </div>
                                                                </div>

                                                                <div className="flex justify-center items-center w-auto">
                                                                    <div className="flex justify-center items-center size-8 rounded-full text-[#494949] bg-[#eeeeee] group-hover:bg-white">
                                                                        <svg className="flex justify-center items-center size-4" width={24} height={24}>
                                                                            <use
                                                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-search_dd"
                                                                            ></use>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>)}
                                            </ul>
                                        </div>
                                    )}


                                    {searchResults?.length <= 0 && (
                                        <div className="block justify-start items-center w-full h-auto">
                                            <div className="flex justify-start items-center px-2 mb-2 text-xl font-bold !leading-none">
                                                Recent searches
                                            </div>

                                            <ul className="block justify-start items-center w-full divide-y divide-[#e5e5e5]">
                                                {recentSearches.map((search, index) => <li key={index} className="flex justify-start items-center w-full h-12 px-2 bg-white hover:bg-[#f7f7f7] group">
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