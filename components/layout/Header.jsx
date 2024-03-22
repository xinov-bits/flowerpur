'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext, useRef } from 'react'
import { getCookie, getCookies, hasCookie, setCookie } from 'cookies-next'

// NEXT JS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

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
import MobileMenu from '../function/MobileMenu';

// MOMENT JS
import moment from 'moment';

// SWIPER & SPLIDE
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/swiper-bundle.css';


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
            img: 'home_.png',
            link: '/'
        },
        {
            name: 'Flowers',
            img: 'flowers.svg',
            link: '/flowers'
        },
        {
            name: 'Combos',
            img: 'combo_.png',
            link: '/'
        },
        {
            name: 'Plants',
            img: 'plants.png',
            link: '/'
        },
        {
            name: 'Gifts',
            img: 'gifts.svg',
            link: '/'
        },
        {
            name: 'Birthday',
            img: 'cakes.svg',
            link: '/'
        },
        {
            name: 'Anniversary',
            img: 'anniversary.png',
            link: '/'
        },
        {
            name: 'Occasions',
            img: 'diya.png',
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

        setIsSearchMenu(false);

        router.push(`/search?keyword=${searchKey}`);
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


    // SIDE MENU
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuRef = useRef(null);
    const [menuReachedEnd, setMenuReachedEnd] = useState(false)


    // MENU
    const menu = [
        {
            name: "Bouquets",
            url: "/",
            img: "assets/icons/svg/flowers.svg",
        },
        {
            name: "Vases",
            url: "/",
            img: "assets/icons/svg/vase.svg",
        },
        {
            name: "Birthday",
            url: "/",
            img: "assets/icons/svg/cake.svg",
        },
        {
            name: "Plants",
            url: "/",
            img: "assets/icons/svg/plant.svg",
        },
        {
            name: "Gifts",
            url: "/",
            img: "assets/icons/svg/gifts.svg",
        },
        {
            name: "Anniversary",
            url: "/",
            img: "assets/icons/svg/anniversary.svg",
        },
        {
            name: "Occasions",
            url: "/",
            img: "assets/icons/svg/occasions.svg",
        },
    ]

    return (
        <>
            {isHeader && <header>
                <div className="fixed top-0 z-[500] hidden sm:hidden md:block lg:block xl:block items-center w-full bg-white text-[#292929]">
                    <div className="flex justify-center items-center w-full h-16 px-6 py-3 space-x-2 select-none">
                        <div className="flex justify-start items-center w-[22%] h-full space-x-2 cursor-pointer">
                            <button className="relative flex justify-center items-center w-9 h-full cursor-pointer overflow-hidden duration-75 no-outline" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                <svg className="size-5" width={20} height={20}>
                                    <use
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-menu_dd"
                                    ></use>
                                </svg>
                            </button>

                            <div className="flex justify-start items-center w-[12rem] h-full cursor-pointer rounded-md overflow-hidden">
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

                        <div className="flex justify-center items-center w-[48%] h-full space-x-2">
                            <li className="relative flex justify-center items-center w-[35%] h-full bg-[#e5e5e5] hover:bg-[#d6d6d6] rounded-full overflow-hidden">
                                <button className="relative flex justify-center items-center w-auto h-full cursor-pointer no-outline" onClick={() => setIsSelectLocationMenuOpen(!isSelectLocationMenuOpen)}>
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

                            <div className="relative flex justify-center items-center w-[65%] h-full rounded-full overflow-hidden">
                                <button className="relative flex justify-center items-center w-full h-full rounded-full overflow-hidden" onClick={() => setIsSearchMenu(true)}>
                                    <div className="absolute left-2 flex justify-center items-center w-auto h-full select-none pointer-events-none">
                                        <svg className="text-[#494949]" width={24} height={24}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-search_dd"
                                            ></use>
                                        </svg>
                                    </div>

                                    <input className="flex justify-center items-center w-full h-full pl-9 px-4 bg-[#e5e5e5] placeholder:text-[#191919] text-[#191919] font-medium outline-none hover:bg-[#eeeeee] hover:cursor-pointer"
                                        placeholder="Search for flowers, cakes, gifts, etc."
                                        name="search"
                                        type="text"
                                        autoComplete='off'
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end items-center w-[30%] h-full">
                            <ul className="flex justify-end items-center w-full h-full space-x-2 text-base font-semibold">
                                <li className="relative flex flex-col justify-center items-center w-10 h-full bg-[#e5e5e5] hover:bg-[#d6d6d6] rounded-full cursor-pointer overflow-hidden duration-75">
                                    <svg className="size-5" width={20} height={20}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd3"
                                        ></use>
                                    </svg>
                                </li>

                                <li className="flex justify-center items-center w-auto h-full cursor-pointer">
                                    <button className="relative flex justify-center items-center w-full h-full px-2.5 space-x-2 text-white bg-[#191919] hover:bg-[#292929] rounded-full cursor-pointer no-outline duration-75" onClick={() => setIsCartOpen(true)}>
                                        <svg className="size-5" width={20} height={20}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-cart_dd"
                                            ></use>
                                        </svg>

                                        <div className="flex justify-center items-center w-auto">
                                            Cart • {numTotal ? numTotal : 0}
                                        </div>
                                    </button>
                                </li>

                                {isUserSignedIn ? <Link href="/user/orders" className="relative flex justify-center items-center w-auto h-full rounded-full no-outline">
                                    <li className="relative flex justify-center items-center w-auto h-full px-1.5 bg-[#e5e5e5] hover:bg-[#d6d6d6] rounded-full space-x-1 cursor-pointer">
                                        <svg className="" width={26} height={26}>
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
                                            <button className="flex justify-center items-center w-full h-full px-3 bg-[#e5e5e5] hover:bg-[#d6d6d6] font-semibold rounded-full cursor-pointer no-outline leading-none">
                                                Sign In
                                            </button>
                                        </Link>

                                        <Link href="/auth/signup" className="flex justify-center items-center w-auto h-full no-outline">
                                            <button className="flex justify-center items-center w-full h-full px-3 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] text-white font-semibold leading-none rounded-full no-outline cursor-pointer">
                                                <div> Sign Up </div>
                                            </button>
                                        </Link>
                                    </div>
                                </li>}
                            </ul>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="flex justify-center items-center w-full h-16 py-2 space-x-4 bg-[#f7f7f7] overflow-hidden">
                        {menu.map((slide, index) => {
                            return (
                                <Link key={index} href={slide.url} className="relative flex justify-center items-start !w-auto h-full px-2 rounded-full bg-white space-x-1.5 overflow-hidden">
                                    <button className="flex justify-center items-center w-auto h-full no-outline">
                                        <div className="flex justify-start items-center w-auto h-auto">
                                            <Image className="flex justify-center items-center w-auto h-10"
                                                src={slide.img}
                                                width={192}
                                                height={192}
                                                alt={slide.name}
                                            />
                                        </div>

                                        <div className="flex justify-center items-center w-auto leading-none font-semibold text-base">
                                            {slide.name}
                                        </div>
                                    </button>
                                </Link>
                            )
                        })}
                    </div>
                </div>


                <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
                <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />


                {isSearchMenu && (<div className="fixed z-[600] top-0 left-0 flex justify-start items-start w-full h-full text-[#292929]">
                    <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full" onClick={() => setIsSearchMenu(false)} />

                    <div className="absolute z-[200] top-[3.7rem] sm:top-[3.7rem] md:-top-[0.18rem] lg:-top-[0.18rem] xl:-top-[0.18rem] left-1 sm:left-1 md:left-[16rem] lg:left-[16rem] xl:left-[16rem] flex flex-col justify-start items-center w-[98%] sm:w-[98%] md:w-[39%] lg:w-[39%] xl:w-[39%] h-auto bg-white rounded-lg border border-[#e5e5e5]"
                        onBlur={() => setIsSearchMenu(false)}
                        onClick={() => setIsSearchMenu(true)}
                        onFocus={() => setIsSearchMenu(true)}>
                        <div className="relative flex flex-col justify-start items-start w-full h-full pb-2 px-[0.6rem]">
                            <div className="flex justify-start items-start w-full h-ful h-[3.4rem] sm:h-[3.4rem] md:h-[3.25rem] lg:h-[3.25rem] xl:h-[3.25rem] py-2">
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
                                        autoComplete='off'
                                        autoFocus
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
                                                <button className="flex justify-between items-center w-full h-10 px-2 leading-none bg-white hover:bg-[#f7f7f7] border border-[#e5e5e5] active:border-[#e0e0e0] rounded-md">
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
            </header>}


            {/* SELECT LOCATION */}
            <AnimatePresence>
                {isSelectLocationMenuOpen && (
                    <div className="fixed z-[600] top-0 left-0 flex justify-end items-center w-full h-screen select-none duration-75">
                        <div className="absolute z-[610] top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-0"
                            onClick={() => setIsSelectLocationMenuOpen(false)}
                        />

                        <motion.div className="fixed z-[620] top-14 left-14 sm:left-14 md:left-[17.8rem] lg:left-[17.8rem] xl:left-[17.8rem] flex justify-start items-start w-[60%] sm:w-[60%] md:w-[25%] lg:w-[25%] xl:w-[25%] h-auto text-[#292929]"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                        >
                            <div className="relative z-[200] flex flex-col justify-start items-center w-full h-auto bg-white rounded-md
                            after:hidden sm:after:hidden md:after:block lg:after:block xl:after:block after:absolute after:-top-[7px] after:right-7 after:left-8 after:z-10 after:w-3 after:h-3 after:bg-white after:rotate-45 after:rounded-tl shadow-[0px_8px_24px] shadow-black/20">
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
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header