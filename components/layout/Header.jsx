'use client';

// REACT JS
import React, { useState, useEffect, useContext, useRef } from 'react'
import { getCookie } from 'cookies-next'

// NEXT JS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

// CONTEXT
import CartContext from '@/context/CartContext';
import UserContext from '@/context/UserContext';

// COMPONENTS
import Cart from '../function/Cart';
import MobileMenu from '../function/MobileMenu';
import SelectLocation from '../models/SelectLocation'
import Search2 from '../models/Search2';

// FRAMER MOTION
import { motion, AnimatePresence } from 'framer-motion';

// AXIOS
import axios from 'axios';


const Header = () => {
    // USE CONTEXT
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
        isCartOpenATC,
        setIsCartOpenATC,

        isHeader,
        setIsHeader,
    } = useContext(CartContext)
    const {
        user,
        isUserSignedIn,
    } = useContext(UserContext)

    const router = useRouter()
    const query = useSearchParams()


    // CART SIDEMENU
    const [isCartOpen, setIsCartOpen] = useState(false);


    // SEARCH
    const [searchKey, setSearchKey] = useState('')
    const [isSearchMenu, setIsSearchMenu] = useState(false)

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
                }
            }
        }).map((k) => {
            return (
                products[k]
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

    useEffect(() => {
        if (query.get('keyword')) {
            setSearchKey(query.get('keyword'))
        }
    }, [query])


    // SIDE MENU
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    // ADDRESS
    const [isAddressChooser, setIsAddressChooser] = useState(false)

    const [userAddress, setUserAddress] = useState([])

    useEffect(() => {
        setUserAddress(getCookie('user_address')?.split(','))
    }, [getCookie('user_address')])


    return (
        <>
            {isHeader && <header>
                <div className="fixed top-0 z-[500] hidden sm:hidden md:block lg:block xl:block items-center w-full bg-white text-[#292929] border-b border-[#f7f7f7]">
                    <div className="flex justify-center items-center w-full h-14 px-8 select-none">
                        <div className="flex justify-between items-center w-full h-10 space-x-6 select-none">
                            <div className="flex justify-start items-center w-[20%] h-full space-x-2 cursor-pointer">
                                <div className="relative flex justify-start items-center size-10">
                                    <button className="relative flex justify-center items-center size-full bg-white hover:bg-[#eeeeee] rounded-full cursor-pointer overflow-hidden duration-100 no-outline" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                        <svg className="flex justify-center items-center size-5" width={20} height={20}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-menu_dd"
                                            ></use>
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex justify-start items-center w-[10rem] h-full cursor-pointer rounded-md overflow-hidden">
                                    <Link className="flex justify-start items-center w-full h-full no-outline" href={'/'}>
                                        <Image className="flex justify-center items-center w-full"
                                            src="/assets/Logo/logo.svg"
                                            width={489}
                                            height={78}
                                            alt="flowerpur logo"
                                        />
                                    </Link>
                                </div>
                            </div>

                            <div className="flex justify-end items-center w-full h-full space-x-2">
                                {(
                                    getCookie('user_address') === '' ||
                                    getCookie('user_address') === undefined ||
                                    getCookie('user_address') === null
                                ) ? (
                                    <div className="relative justify-start items-center w-[20%] h-full pr-2 bg-white overflow-hidden duration-200">
                                        <button className="relative flex justify-center items-center w-full h-full cursor-pointer no-outline" onClick={() => setIsAddressChooser(!isAddressChooser)}>
                                            <div className="flex justify-start items-center w-auto h-full space-x-1 font-semibold cursor-pointer">
                                                <svg className="flex justify-center items-center size-4" width={16} height={16}>
                                                    <use
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd"
                                                    ></use>
                                                </svg>

                                                <div className="w-max"> Select Address </div>
                                            </div>

                                            <div className="flex justify-center items-center size-5 ml-1 pointer-events-none">
                                                <svg className="text-[#494949]" width={20} height={20}>
                                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"></use>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="relative justify-start items-center w-[40%] h-full pr-2 bg-white overflow-hidden duration-200">
                                        <button className="relative flex justify-center items-center w-full h-full cursor-pointer no-outline" onClick={() => setIsAddressChooser(!isAddressChooser)}>
                                            <div className="flex justify-start items-center w-full h-full px-2 space-x-1 font-semibold cursor-pointer" title={getCookie('user_address')}>
                                                <svg className="flex justify-center items-center size-5" width={16} height={16}>
                                                    <use
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd"
                                                    ></use>
                                                </svg>

                                                <div className="flex justify-start items-center w-full text-left font-bold text-base !leading-none">
                                                    {userAddress[0]}, {userAddress[1]}
                                                </div>
                                            </div>

                                            <div className="flex justify-center items-center size-5 ml-1 pointer-events-none">
                                                <svg className="text-[#494949]" width={20} height={20}>
                                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"></use>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                )}

                                <div className="relative flex justify-end items-center w-[78%] h-full rounded-full overflow-hidden duration-500">
                                    <button className="flex justify-center items-center w-full h-full px-2.5 space-x-1.5 bg-[#eeeeee] hover:bg-[#e5e5e5] rounded-full overflow-hidden cursor-pointer" onClick={() => setIsSearchMenu(true)}>
                                        <svg className="flex justify-center items-center size-[1.35rem] text-[#191919]"
                                            width={24} height={24}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-search_dd"
                                            ></use>
                                        </svg>

                                        <form className="relative flex justify-center items-center w-full h-full overflow-hidden" htmlFor="search" onSubmit={handleSubmitSearch}>
                                            <input className="flex justify-center items-center w-full h-full bg-[#eeeeee] placeholder:text-[#494949] text-[#191919] font-medium hover:bg-[#e5e5e5] no-outline outline-none"
                                                onChange={handleChangeSearch}
                                                value={searchKey}
                                                placeholder="Search for flowers, gifts and more"
                                                name="search"
                                                type="text"
                                                autoComplete='off'
                                                autoFocus
                                            />
                                        </form>
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end items-center w-auto h-full">
                                <ul className="flex justify-end items-center w-full h-full space-x-2 text-base font-semibold">
                                    <li className="relative flex flex-col justify-center items-center size-10 bg-[#eeeeee] hover:bg-[#e5e5e5] rounded-full cursor-pointer duration-100" onClick={() => {
                                        setIsCartOpen(true)
                                    }}>
                                        <svg className="flex justify-center items-center size-6" width={20} height={20}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-cart2_dd"
                                            ></use>
                                        </svg>

                                        <div className="absolute -top-[1px] -right-[1px] flex justify-center items-center text-xs text-medium size-5 bg-[#0e8345] text-white font-semibold rounded-full !leading-none">
                                            {numTotal ? numTotal : 0}
                                        </div>
                                    </li>

                                    {isUserSignedIn ? (
                                        <li className="relative flex flex-col justify-center items-center size-10 bg-[#eeeeee] hover:bg-[#e5e5e5] rounded-full cursor-pointer duration-100">
                                            <svg className="flex justify-center items-center size-6" width={20} height={20}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-user_dd"
                                                ></use>
                                            </svg>
                                        </li>
                                    ) : (
                                        <li className="relative flex justify-center items-center w-auto h-full rounded-full duration-75 space-x-1">
                                            <div className="flex justify-center items-center w-full h-full space-x-2">
                                                <Link href="/auth/signin" className="flex justify-center items-center w-max h-full no-outline">
                                                    <button className="flex justify-center items-center w-full h-full px-3 bg-[#eeeeee] hover:bg-[#e5e5e5] font-semibold rounded-full cursor-pointer no-outline leading-none">
                                                        Sign In
                                                    </button>
                                                </Link>

                                                <Link href="/auth/signup" className="flex justify-center items-center w-max h-full no-outline">
                                                    <button className="flex justify-center items-center w-full h-full px-3 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] text-white font-semibold leading-none rounded-full no-outline cursor-pointer">
                                                        <div> Sign Up </div>
                                                    </button>
                                                </Link>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
                <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />


                <SelectLocation isAddressChooser={isAddressChooser} setIsAddressChooser={setIsAddressChooser} />

                <Search2 isSearchMenu={isSearchMenu} setIsSearchMenu={setIsSearchMenu} searchResults={searchResults} recentSearches={recentSearches} />
            </header>}
        </>
    )
}

export default Header