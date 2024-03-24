'use client';

// REACT JS
import React, { useState, useEffect, useContext, useRef } from 'react'
import { getCookie } from 'cookies-next'

// NEXT JS
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// CONTEXT
import CartContext from '@/context/CartContext'
import UserContext from '@/context/UserContext'

// COMPONENTS
import Cart from '../function/Cart'
import MobileMenu from '../function/MobileMenu'
import SelectLocation from '../models/SelectLocation'
import Search from '../models/Search';

// SWIPER & SPLIDE
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import 'swiper/swiper-bundle.css'


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


    // CART SIDEMENU
    const [isCartOpen, setIsCartOpen] = useState(false);


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
            img: "/assets/icons/svg/flowers.svg",
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


    // ADDRESS
    const [isAddressChooser, setIsAddressChooser] = useState(false)


    // Search
    const [isSearchMenu, setIsSearchMenu] = useState(false);


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
                                    <button className="z-[1] flex justify-center items-center size-full no-outline" onClick={() => setIsAddressChooser(!isAddressChooser)}>
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

                    <div className="flex justify-center items-center w-full h-auto duration-200">
                        {showMenu ? (
                            <Swiper
                                className="flex justify-center items-center w-full h-full !px-4 overflow-hidden"
                                slidesPerView={5.2}
                                spaceBetween={10}
                                resistanceRatio={0.4}
                                freeMode={true}
                                modules={[FreeMode]}
                            >
                                {menu.map((slide) => <SwiperSlide key={slide.name} className="relative flex justify-center items-start w-auto h-full">
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
                                <div className="flex justify-start items-start size-[3.5rem] bg-[#f7f7f7] rounded-full  c-skeleton" />
                                <div className="flex justify-start items-start size-[3.5rem] bg-[#f7f7f7] rounded-full  c-skeleton" />
                                <div className="flex justify-start items-start size-[3.5rem] bg-[#f7f7f7] rounded-full  c-skeleton" />
                                <div className="flex justify-start items-start size-[3.5rem] bg-[#f7f7f7] rounded-full  c-skeleton" />
                                <div className="flex justify-start items-start size-[3.5rem] bg-[#f7f7f7] rounded-full  c-skeleton" />
                            </div>
                        )}
                    </div>
                </div>

                <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
                <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />


                <Search isSearchMenu={isSearchMenu} setIsSearchMenu={setIsSearchMenu} />


                <SelectLocation isAddressChooser={isAddressChooser} setIsAddressChooser={setIsAddressChooser} />
            </header>}
        </>
    )
}

export default MobileHeader