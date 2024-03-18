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
import MobileMenu from '../function/MobileMenu';

// COMPONENTS
import Cart from '../function/Cart';

// MOMENT JS
import moment from 'moment';

// SWIPER & SPLIDE
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const MobileHeader = () => {
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


    // MOBILE MENU
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuRef = useRef(null);
    const [menuReachedEnd, setMenuReachedEnd] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const menuElement = menuRef.current;
            if (!menuElement) return;

            const isAtEnd = Math.round(menuElement.scrollLeft + menuElement.clientWidth) >= menuElement.scrollWidth;
            if (isAtEnd) {
                setMenuReachedEnd(true);
            }
            else {
                setMenuReachedEnd(false)
            }
        };

        const menuElement = menuRef.current;
        if (menuElement) {
            menuElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (menuElement) {
                menuElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);


    // MENU
    const menu = [
        {
            name: "Grocery",
            img: "https://ubr.to/3vgJg08",
        },
        {
            name: "Fast Food",
            img: "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/FastFood.png",
        },
        {
            name: "Pizza",
            img: "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Pizza.png",
        },
        {
            name: "Sushi",
            img: "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Sushi.png",
        },
        {
            name: "Desserts",
            img: "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Dessert.png",
        },
        {
            name: "Mexican",
            img: "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Mexican.png",
        },
    ]

    return (
        <>
            {isHeader && <header>
                <div className="fixed top-0 z-[500] block sm:block md:hidden lg:hidden xl:hidden items-center w-full py-1.5 select-none bg-white text-[#191919]">
                    <div className="flex justify-start items-center w-full h-[3.65rem] pb-1 px-4 space-x-2">
                        <div className="flex justify-between items-center w-full h-full space-x-1 cursor-pointer text-[#191919]">
                            <div className="flex justify-start items-center w-auto h-full cursor-pointer rounded-md space-x-2">
                                <div className="flex justify-center items-center size-9 p-1.5">
                                    <button className="z-[1] flex justify-center items-center size-full no-outline" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                        <svg className="flex justify-center items-center size-full" width={24} height={24}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-menu_dd"
                                            ></use>
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex justify-center items-center size-9">
                                    <Link className="flex justify-center items-center size-full no-outline" href="/">
                                        <Image className="flex justify-center items-center size-full"
                                            src="/assets/Logo/logo_icon-dark__svg.svg"
                                            width={288}
                                            height={288}
                                            alt="flowerpur logo mobile"
                                        />
                                    </Link>
                                </div>
                            </div>

                            <div className="flex justify-end items-center w-auto h-full space-x-1 cursor-pointer rounded-md text-[#191919]">
                                <div className="flex justify-center items-center size-9 p-1.5">
                                    {isUserSignedIn && <Link href="/user/orders" className="flex justify-center items-center size-full no-outline">
                                        <button className="z-[1] flex justify-center items-center size-full no-outline">
                                            <svg className="flex justify-center items-center size-full" width={24} height={24}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-user_dd2"
                                                ></use>
                                            </svg>
                                        </button>
                                    </Link>}
                                    {!isUserSignedIn && <Link href="/auth/signup" className="flex justify-center items-center size-full no-outline">
                                        <button className="z-[1] flex justify-center items-center size-full no-outline">
                                            <svg className="flex justify-center items-center size-full" width={24} height={24}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-user_dd2"
                                                ></use>
                                            </svg>
                                        </button>
                                    </Link>}
                                </div>

                                <div className="flex justify-center items-center size-9 p-1.5">
                                    <button className="z-[1] flex justify-center items-center size-full no-outline">
                                        <svg className="flex justify-center items-center size-full" width={24} height={24}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd2b"
                                            ></use>
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex justify-center items-center size-9 p-1.5">
                                    <div className="relative flex justify-center items-center size-full">
                                        <div className="absolute z-[2] top-0 right-0 flex justify-center items-center size-[14px] m-[-4px] leading-none text-[10px] bg-[#085b45] rounded-full font-semibold text-white text-ellipsis overflow-hidden">
                                            {numTotal}
                                        </div>

                                        <button className="z-[1] flex justify-center items-center size-full no-outline" onClick={() => setIsCartOpen(!isCartOpen)}>
                                            <svg className="flex justify-center items-center size-full" width={24} height={24}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-cart2_dd2"
                                                ></use>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-start items-center w-full h-14 py-2 px-4 space-x-2">
                        <button className="relative flex justify-center items-center w-full h-full rounded-full overflow-hidden no-outline" onClick={() => setIsSearchMenu(true)}>
                            <div className="absolute left-2.5 flex justify-center items-center w-auto h-full select-none pointer-events-none">
                                <svg className="flex justify-center items-center size-[1.35rem] text-[#191919]" width={24} height={24}>
                                    <use
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-search_dd"
                                    ></use>
                                </svg>
                            </div>

                            <input className="flex justify-center items-center w-full h-full pl-9 px-4 bg-[#f7f7f7] placeholder:text-[#494949] text-[#191919] font-medium outline-none hover:bg-[#eeeeee] hover:cursor-pointer"
                                placeholder="Search for flowers, cakes, gifts, etc."
                                name="search"
                                type="text"
                                autoComplete='off'
                            />
                        </button>
                    </div>

                    <div className="flex justify-start items-center w-full h-auto pb-2">
                        <Swiper
                            className="flex justify-center items-center w-full h-full !px-4 overflow-hidden"
                            slidesPerView={5.2}
                            spaceBetween={10}
                            resistanceRatio={0.4}
                            freeMode={true}
                            minimumVelocity={0.01}
                            momentumVelocityRatio={0.05}
                            modules={[FreeMode]}
                        >
                            {menu.map((slide) => <SwiperSlide key={slide.name} className="relative flex justify-center items-start w-auto h-full">
                                <div className="flex flex-col justify-center items-center w-full h-full">
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
                                </div>
                            </SwiperSlide>)}
                        </Swiper>
                    </div>
                </div>

                <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
                <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />


                {isSearchMenu && (<div className="fixed z-[600] top-0 left-0 flex justify-start items-start w-full h-full text-[#191919]">
                    <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full" onClick={() => setIsSearchMenu(false)} />

                    <div className="absolute z-[200] top-[3.7rem] left-1 flex flex-col justify-start items-center w-[98%] h-auto bg-white rounded-lg border border-[#e5e5e5]"
                        onBlur={() => setIsSearchMenu(false)}
                        onClick={() => setIsSearchMenu(true)}
                        onFocus={() => setIsSearchMenu(true)}>
                        <div className="relative flex flex-col justify-start items-start w-full h-full pb-2 px-[0.6rem]">
                            <div className="flex justify-start items-start w-full h-[3.4rem] py-2">
                                <form className="relative flex justify-center items-center w-full h-full rounded-full overflow-hidden" htmlFor="search" onSubmit={handleSubmitSearch}>
                                    <div className="absolute left-2.5 flex justify-center items-center w-auto h-full select-none pointer-events-none">
                                        <svg className="flex justify-center items-center size-[1.35rem] text-[#191919]" width={24} height={24}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-search_dd"
                                            ></use>
                                        </svg>
                                    </div>

                                    <input className="flex justify-center items-center w-full h-full pl-9 px-4 bg-[#f7f7f7] placeholder:text-[#494949] text-[#191919] font-medium outline-none hover:bg-[#eeeeee]"
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
        </>
    )
}

export default MobileHeader