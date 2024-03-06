'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext } from 'react'
import { getCookie, getCookies, hasCookie, setCookie } from 'cookies-next'

// NEXT JS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// SUB COMPONENTS

// FRAMER
import { motion, AnimatePresence } from "framer-motion";

// AXIOS
import axios from 'axios';

// MATERIAL UI
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// CONTEXT
import CartContext from '@/context/CartContext';
import UserContext from '@/context/UserContext';

// COMPONENTS
import Cart from '../function/Cart';

// MOMENT JS
import moment from 'moment';

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
    } = useContext(CartContext);
    const {
        user,
        isUserSignedIn,
    } = useContext(UserContext);

    const router = useRouter();


    // ADDRESS
    const [address, setAddress] = useState('');
    const [pincodes, setPincodes] = useState([]);
    const [userAddressState, setUserAddressState] = useState('');
    const [isSelectLocationMenuOpen, setIsSelectLocationMenuOpen] = useState(false);

    const addAddressToCookie = () => {
        setCookie('user_pincode', address)
    };

    const addStateToCookie = (data) => {
        setCookie('user_state', data)

        setUserAddressState(data);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/pincodes`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setPincodes(response.data);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();

        const pinArr = pincodes;

        if (JSON.stringify(pinArr)?.includes(address)) {
            addAddressToCookie();

            const filteredPins = pincodes?.filter((k) => k[0].includes(getCookie('user_pincode')));

            if (filteredPins && filteredPins.length > 0) {
                let uState = filteredPins[0][1];
                addStateToCookie(uState);

                router.push(`?rmd=${(Math.random() * 1000).toFixed(0)}`)
            } else {
                console.log('No matching pins found.');
            }
        }
    };

    // MENU ITEMS
    const menuItems = [
        {
            name: 'Home',
            img: 'home.png',
            link: '/'
        },
        {
            name: 'Flowers',
            img: 'flower.png',
            link: '/flowers'
        },
        {
            name: 'Combos',
            img: 'combo.png',
            link: '/'
        },
        {
            name: 'Plants',
            img: 'plant.png',
            link: '/'
        },
        {
            name: 'Gifts',
            img: 'gift.png',
            link: '/'
        },
        {
            name: 'Birthday',
            img: 'cake.png',
            link: '/'
        },
        {
            name: 'Anniversary',
            img: 'rose.png',
            link: '/'
        },
        {
            name: 'Occasions',
            img: 'sunflower.png',
            link: '/'
        }
    ]


    // CART SIDEMENU
    const [isCartOpen, setIsCartOpen] = useState(false);


    // SEARCH
    const [searchKey, setSearchKey] = useState('');
    const [isSearchMenu, setIsSearchMenu] = useState(false);

    const handleChangeSearch = (e) => {
        setSearchKey(e.target.value);
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault();

        router.push(`/search?keyword=${searchKey}`)
    }

    const trendingSearches = [
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
        {
            name: 'Birthday cakes',
            url: '/flowers'
        },
        {
            name: 'Occasional Gifts',
            url: '/'
        },
    ]


    // USER
    function generateGreetings() {
        const hour = moment().hour();

        if (hour > 16) {
            return "evening";
        } else if (hour > 11) {
            return "afternoon";
        }

        return 'morning';
    }

    return (
        <>
            <div className="fixed top-0 z-[500] hidden sm:hidden md:block lg:block xl:block items-center w-full bg-white text-[#292929]">
                {/* THING */}
                <div className="flex justify-center items-center w-full h-8 space-x-2 bg-[#f48196] text-sm text-white font-semibold capitalize select-none">
                    <div className="flex justify-center items-center w-auto">
                        Lorem ipsum dolor sit amet elit. - ₹499
                    </div>

                    <div className="flex justify-center items-center w-auto p-1.5 leading-none bg-[#d34c65] hover:bg-[#d9576f] active:bg-[#c04159] rounded cursor-pointer">
                        Shop now
                    </div>
                </div>

                {/* LOGO & THINGS */}
                <div className="flex justify-center items-center w-full h-12 px-8 py-1.5 space-x-2 border-b border-[#e5e5e5] select-none">
                    <div className="flex justify-start items-center w-[20%] h-full cursor-pointer">
                        <div className="flex justify-start items-center w-[94%] h-full cursor-pointer rounded-md overflow-hidden">
                            <Link className="flex justify-start items-center w-full h-full no-outline" href={'/'}>
                                <div className="flex justify-start items-center w-full h-full">
                                    <svg className="flex justify-start items-center w-[95%] h-full" width={760} height={120}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/logo.svg#logo2"
                                        ></use>
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center items-center w-[40%] h-full">
                        <div className="relative flex justify-center items-center w-full h-full rounded-full overflow-hidden">
                            <button className="relative flex justify-center items-center w-full h-full rounded-full overflow-hidden" onClick={() => setIsSearchMenu(true)}>
                                <div className="absolute left-2 flex justify-center items-center w-auto h-full select-none pointer-events-none">
                                    <svg className="text-[#494949]" width={24} height={24}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-search_dd"
                                        ></use>
                                    </svg>
                                </div>

                                <input className="flex justify-center items-center w-full h-full pl-9 px-4 bg-[#f7f7f7] placeholder:text-[#494949] text-[#494949] font-medium outline-none hover:bg-[#eeeeee] hover:cursor-pointer"
                                    value={searchKey}
                                    placeholder="Search for flowers, cakes, gifts, etc."
                                    name="search"
                                    type="text"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end items-center w-[40%] h-full">
                        <ul className="flex justify-end items-center w-full h-full space-x-2 text-base font-semibold">
                            <li className="relative flex justify-center items-center w-auto h-full bg-[#e5e5e5] hover:bg-[#d6d6d6] rounded-full overflow-hidden">
                                <button className="relative flex justify-center items-center w-auto h-full cursor-pointer" onClick={() => setIsSelectLocationMenuOpen(!isSelectLocationMenuOpen)}>
                                    {(
                                        getCookie('user_state') === '' ||
                                        getCookie('user_state') === undefined ||
                                        getCookie('user_state') === null ||
                                        getCookie('user_pincode') === '' ||
                                        getCookie('user_pincode') === undefined ||
                                        getCookie('user_pincode') === null
                                    ) ? <div className="flex justify-start items-center w-48 h-full px-2 space-x-1 font-semibold cursor-pointer">
                                        <svg className="flex justify-center items-center w-4 h-4" width={16} height={16}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd"
                                            ></use>
                                        </svg>

                                        <div> Select Address </div>
                                    </div>
                                        :
                                        <div className="flex justify-start items-center w-48 h-full px-2 font-semibold cursor-pointer">
                                            <svg className="flex justify-center items-center w-4 h-4" width={16} height={16}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd"
                                                ></use>
                                            </svg>

                                            {getCookie('user_pincode')}, {getCookie('user_state')}
                                        </div>
                                    }

                                    <div className="absolute right-2 flex justify-center items-center w-5 h-5 pointer-events-none">
                                        <svg className="text-[#494949]" width={20} height={20}>
                                            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"></use>
                                        </svg>
                                    </div>
                                </button>
                            </li>

                            <li className="relative flex flex-col justify-center items-center w-9 h-full bg-[#e5e5e5] hover:bg-[#d6d6d6] rounded-full cursor-pointer overflow-hidden duration-75">
                                <svg className="w-5 h-5" width={20} height={20}>
                                    <use
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd3"
                                    ></use>
                                </svg>
                            </li>

                            <li className="flex justify-center items-center w-9 h-full cursor-pointer">
                                <button className="relative flex justify-center items-center w-full h-full space-x-2 bg-[#e5e5e5] hover:bg-[#d6d6d6] rounded-full cursor-pointer overflow-hidden duration-75" onClick={() => setIsCartOpen(true)}>
                                    <svg className="" width={20} height={20}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-cart2_dd"
                                        ></use>
                                    </svg>
                                </button>
                            </li>

                            {isUserSignedIn ? <Link href="/user/orders" className="no-outline">
                                <li className="relative flex justify-center items-center w-auto h-full px-2 bg-white border-[1.5px] border-[#e5e5e5] rounded-full space-x-1 cursor-pointer hover:bg-[#f7f7f7]">
                                    <svg className="text-[#797979]" width={26} height={26}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-user_dd"
                                        ></use>
                                    </svg>

                                    <div className="flex justify-center items-center w-full space-x-2 capitalize">
                                        {generateGreetings()}, {!(user === undefined || user === null || user === '') ? JSON.parse(user)[0] : ''}
                                    </div>
                                </li>
                            </Link> : <li className="relative flex justify-center items-center w-auto h-full rounded-full duration-75 space-x-1">
                                <div className="flex justify-center items-center w-full h-full space-x-2">
                                    <Link href="/auth/signin" className="flex justify-center items-center w-auto h-full no-outline">
                                        <button className="flex justify-center items-center w-full h-full px-3 bg-[#e5e5e5] hover:bg-[#d6d6d6] font-semibold rounded-full cursor-pointer leading-none">
                                            Sign In
                                        </button>
                                    </Link>

                                    <Link href="/auth/signup" className="flex justify-center items-center w-auto h-full no-outline">
                                        <button className="flex justify-center items-center w-full h-full px-3 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] text-white font-semibold leading-none rounded-full cursor-pointer">
                                            <div> Sign Up </div>
                                        </button>
                                    </Link>
                                </div>
                            </li>}
                        </ul>
                    </div>
                </div>

                {/* MENU */}
                <div className="flex justify-center items-center w-full h-18 py-2 px-6 bg-[#f7f7f7] border-b-[1.5px] border-[#e5e5e5] select-none">
                    <ul className="flex justify-center items-center w-full h-full space-x-4">
                        {menuItems.map((item, index) => (
                            <Link className="flex justify-center items-center w-auto h-full rounded-full" key={index} href={item.link}>
                                <li className="flex justify-center items-center w-full h-full px-2.5 py-1.5 bg-white rounded-full capitalize font-medium text-[#494949] cursor-pointer space-x-1 ring-[0.5px] ring-white hover:ring-[#e5e5e5]">
                                    <div className="flex justify-center items-center w-auto h-full">
                                        <Image
                                            src={`/assets/icons/${item.img}`}
                                            alt={item.name}
                                            width={38}
                                            height={38}
                                        />
                                    </div>

                                    <div className="flex justify-center items-center w-auto h-full">
                                        {item.name}
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>


            {/* MOBILE HEADER */}
            <div className="fixed top-0 z-[500] block sm:block md:hidden lg:hidden xl:hidden items-center w-full select-none bg-white text-[#292929]">
                {/* THING */}
                <div className="flex justify-center items-center w-full h-10 space-x-2.5 bg-[#f48196] text-sm text-white font-semibold capitalize select-none">
                    <div className="flex justify-center items-center w-auto">
                        Lorem ipsum dolor sit amet elit. - ₹499
                    </div>

                    <div className="flex justify-center items-center w-auto p-2 leading-none bg-[#d34c65] hover:bg-[#d9576f] active:bg-[#c04159] rounded cursor-pointer">
                        Shop now
                    </div>
                </div>

                <div className="flex justify-start items-center w-full h-[3.65rem] py-1.5 px-3.5 space-x-2">
                    <div className="flex justify-between items-center w-full h-full cursor-pointer space-x-2 text-[#292929]">
                        <div className="flex justify-start items-center w-auto h-full cursor-pointer rounded-md space-x-4">
                            <div className="flex justify-center items-center w-8 h-8">
                                <button className="z-[1] flex justify-center items-center  no-outline">
                                    <svg className="flex justify-center items-center" width={28} height={28}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-menu_dd"
                                        ></use>
                                    </svg>
                                </button>
                            </div>

                            <div className="flex justify-center items-center w-[2.8rem] h-[2.8rem] text-[#085b45] bg-[#f4fbeb] rounded-full">
                                <Link className="no-outline" href={"/"}>
                                    <svg className="flex justify-center items-center w-[2.8rem] h-[2.8rem]" width={95} height={106}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/logo.svg#logo_icon2"
                                        ></use>
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        <div className="flex justify-end items-center w-auto h-full cursor-pointer rounded-md space-x-4">
                            <div className="flex justify-center items-center w-8 h-8">
                                <button className="z-[1] flex justify-center items-center no-outline">
                                    <svg className="flex justify-center items-center" width={28} height={28}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd3"
                                        ></use>
                                    </svg>
                                </button>
                            </div>

                            <div className="relative flex justify-center items-center w-8 h-8">
                                <div className="absolute z-[2] top-0 right-0 flex justify-center items-center w-[15px] h-[15px] leading-none text-[10px] bg-[#085b45] rounded-full font-semibold text-white text-ellipsis overflow-hidden">
                                    {numTotal}
                                </div>

                                <button className="z-[1] flex justify-center items-center  no-outline" onClick={() => setIsCartOpen(true)}>
                                    <svg className="flex justify-center items-center" width={28} height={28}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-cart2_dd"
                                        ></use>
                                    </svg>
                                </button>
                            </div>

                            <div className="flex justify-center items-center w-8 h-8">
                                {isUserSignedIn && <Link href="/">
                                    <button className="z-[1] flex justify-center items-center  no-outline">
                                        <svg className="flex justify-center items-center" width={28} height={28}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-user_dd"
                                            ></use>
                                        </svg>
                                    </button>
                                </Link>}
                                {!isUserSignedIn && <Link href="/auth/signup">
                                    <button className="z-[1] flex justify-center items-center  no-outline">
                                        <svg className="flex justify-center items-center" width={28} height={28}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-user_dd"
                                            ></use>
                                        </svg>
                                    </button>
                                </Link>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start items-center w-full h-14 py-2 px-3.5 space-x-2 border-y border-[#e5e5e5]">
                    <form className="relative flex justify-center items-center w-full h-full rounded-full overflow-hidden" htmlFor="search" onSubmit={handleSubmitSearch}>
                        <div className="absolute left-2 flex justify-center items-center w-auto h-full select-none pointer-events-none">
                            <svg className="text-[#494949]" width={24} height={24}>
                                <use
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-search_dd"
                                ></use>
                            </svg>
                        </div>

                        <input className="flex justify-center items-center w-full h-full pl-9 px-4 bg-[#f7f7f7] placeholder:text-[#494949] text-[#494949] font-medium outline-none hover:bg-[#eeeeee] hover:cursor-pointer"
                            onChange={handleChangeSearch}
                            value={searchKey}
                            placeholder="Search for flowers, cakes, gifts, etc."
                            name="search"
                            type="text"
                        />
                    </form>
                </div>

                {/* MENU (104px) */}
                <div className="relative flex justify-start items-center w-full h-18 py-2 px-3.5 bg-[#f7f7f7] border-b-[1.5px] border-[#e5e5e5]
                    after:absolute after:right-0 after:w-14 after:h-full after:bg-gradient-to-l after:from-[#f7f7f7] after:to-transparent after:pointer-events-none
                ">
                    <ul className="flex justify-start items-center w-full h-full space-x-4 overflow-x-scroll  no-scrollbar">
                        {menuItems.map((item, index) => (
                            <Link className="flex justify-center items-center w-auto h-full  no-outline" key={index} href={item.link}>
                                <li className="flex justify-center items-center w-full h-full px-2.5 py-1.5 bg-white rounded-full capitalize font-medium text-[#494949] cursor-pointer space-x-1 ring-[0.5px] ring-white hover:ring-[#e5e5e5]">
                                    <div className="flex justify-center items-center w-8 h-8">
                                        <Image
                                            src={`/assets/icons/${item.img}`}
                                            alt={item.name}
                                            width={38}
                                            height={38}
                                        />
                                    </div>

                                    <div className="flex justify-center items-center w-auto h-full">
                                        {item.name}
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>

            {/* CART SIDEMENU */}
            <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />


            {/* SEARCH MENU */}
            {isSearchMenu && (<div className="fixed z-[600] top-0 left-0 flex justify-start items-start w-full h-full text-[#292929]">
                <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full" onClick={() => setIsSearchMenu(false)} />

                <div className="absolute z-[200] top-[1.8rem] left-14 sm:left-14 md:left-[16rem] lg:left-[16rem] xl:left-[16rem] flex flex-col justify-start items-center w-[60%] sm:w-[60%] md:w-[39%] lg:w-[39%] xl:w-[39%] h-auto bg-white rounded-lg border border-[#e5e5e5]"
                    onBlur={() => setIsSearchMenu(false)}
                    onClick={() => setIsSearchMenu(true)}
                    onFocus={() => setIsSearchMenu(true)}>
                    <div className="relative flex flex-col justify-start items-start w-full h-full pb-2 px-[0.6rem]">
                        <div className="flex justify-start items-start w-full h-ful h-[3.25rem] py-2">
                            <form className="relative flex justify-center items-center w-full h-full rounded-full overflow-hidden" htmlFor="search" onSubmit={handleSubmitSearch}>
                                <div className="absolute left-2 flex justify-center items-center w-auto h-full select-none pointer-events-none">
                                    <svg className="text-[#494949]" width={24} height={24}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-search_dd"
                                        ></use>
                                    </svg>
                                </div>

                                <input className="flex justify-center items-center w-full h-full pl-9 px-4 bg-[#f7f7f7] placeholder:text-[#494949] text-[#494949] font-medium outline-none hover:bg-[#eeeeee]"
                                    onChange={handleChangeSearch}
                                    value={searchKey}
                                    placeholder="Search for flowers, cakes, gifts, etc."
                                    name="search"
                                    type="text"
                                />
                            </form>
                        </div>

                        <div className="block justify-start items-start w-full h-full mt-2 text-[#191919]">
                            <div className="flex justify-start items-center w-full leading-none text-xl font-semibold">
                                Trending searches
                            </div>

                            <div className="flex justify-start items-center w-full mt-2 leading-none text-base font-medium">
                                <ul className="flex flex-col justify-start items-center w-full h-full space-y-2">
                                    {trendingSearches.map((search, index) => <li key={index} className="flex justify-center items-center w-full h-auto">
                                        <Link href={search.url} className="flex justify-center items-center w-full">
                                            <button className="flex justify-between items-center w-full h-10 px-2 leading-none bg-white hover:bg-[#f7f7f7] border border-[#f7f7f7] active:border-[#e5e5e5] rounded-md">
                                                <div className="flex justify-start items-center w-auto space-x-1">
                                                    <div className="flex justify-start items-center w-auto">
                                                        <svg className="flex justify-center items-center w-5 h-5" strokeWidth={1.5}
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                                        </svg>
                                                    </div>

                                                    <div className="flex justify-start items-center w-auto">
                                                        {search.name}
                                                    </div>
                                                </div>

                                                <div className="flex justify-start items-center w-auto">
                                                    <svg className="flex justify-center items-center w-4 h-4" strokeWidth={1.8}
                                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </Link>
                                    </li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}


            {/* SELECT LOCATION */}
            <AnimatePresence>
                {isSelectLocationMenuOpen && (
                    <motion.div className="fixed top-[4.8rem] right-14 sm:right-14 md:right-[11.2rem] lg:right-[11.2rem] xl:right-[11.2rem] flex justify-start items-start w-[60%] sm:w-[60%] md:w-[25%] lg:w-[25%] xl:w-[25%] h-auto z-[600] text-[#292929]"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        onBlur={() => setIsSelectLocationMenuOpen(false)}
                        onClick={() => setIsSelectLocationMenuOpen(true)}
                        onFocus={() => setIsSelectLocationMenuOpen(true)}
                    >
                        <div className="relative z-[200] flex flex-col justify-start items-center w-full h-auto bg-white rounded-md
                        after:hidden sm:after:hidden md:after:block lg:after:block xl:after:block after:absolute after:-top-[7px] after:right-7 after:left-8 after:z-10 after:w-3 after:h-3 after:bg-white after:rotate-45 after:rounded-tl shadow-[0px_8px_24px] shadow-black/20"
                            onBlur={() => setIsSelectLocationMenuOpen(false)}
                            onClick={() => setIsSelectLocationMenuOpen(true)}
                            onFocus={() => setIsSelectLocationMenuOpen(true)}>
                            <div className="flex flex-col justify-start items-center w-full py-2.5">
                                <div className="flex justify-start items-center w-full px-2.5 font-bold">
                                    Enter Your Address
                                </div>

                                <div className="flex flex-col justify-start items-center w-full px-2.5 mt-1 space-y-2">
                                    <label className="relative flex justify-center items-center w-full" htmlFor="address_input">
                                        <div className="absolute left-1.5 flex justify-center items-center w-5 h-5">
                                            <svg className="text-[#494949]" width={24} height={24}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd2"
                                                ></use>
                                            </svg>
                                        </div>

                                        <input className="flex justify-center items-center w-full h-full pl-8 p-2 rounded-md bg-[#f7f7f7] placeholder:text-[#797979] placeholder:font-medium font-semibold appearance-none"
                                            type="number"
                                            placeholder="Pincode"
                                            name="address_input"
                                            id="address_input"
                                            onChange={handleAddressChange}
                                            value={address}
                                        />
                                    </label>

                                    {address !== '' ? <button className="flex justify-center items-center w-full h-9 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] text-white font-semibold rounded-md duration-75" onClick={handleAddressSubmit}>
                                        Confirm Address
                                    </button>
                                        :
                                        <div className="flex justify-center items-center w-full h-9 bg-[#085b45] text-white font-semibold rounded-md saturate-0 opacity-40 cursor-default">
                                            Confirm Address
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header