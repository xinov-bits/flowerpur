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

// MOMENT JS
import moment from 'moment';
import Search from '../models/Search';


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


    // Search
    const [searchKey, setSearchKey] = useState('')
    const [isSearchMenu, setIsSearchMenu] = useState(false)

    useEffect(() => {
        if (query.get('keyword')) {
            setSearchKey(query.get('keyword'))
        }
    }, [query])


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


    // ADDRESS
    const [isAddressChooser, setIsAddressChooser] = useState(false)


    return (
        <>
            {isHeader && <header>
                <div className="fixed top-0 z-[500] hidden sm:hidden md:block lg:block xl:block items-center w-full bg-white text-[#292929]">
                    <div className="flex justify-center items-center w-full h-16 px-6 py-3 space-x-2 select-none">
                        <div className="flex justify-start items-center w-[21%] h-full space-x-2 cursor-pointer">
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

                        <div className="flex justify-center items-center w-[50%] h-full space-x-2">
                            <li className="relative flex justify-center items-center w-[35%] h-full bg-[#e5e5e5] hover:bg-[#d6d6d6] rounded-full overflow-hidden">
                                <button className="relative flex justify-center items-center w-auto h-full cursor-pointer no-outline" onClick={() => setIsAddressChooser(!isAddressChooser)}>
                                    {(
                                        getCookie('user_address') === '' ||
                                        getCookie('user_address') === undefined ||
                                        getCookie('user_address') === null
                                    ) ? (
                                        <div className="flex justify-start items-center w-48 h-full px-2 space-x-1 font-semibold cursor-pointer">
                                            <svg className="flex justify-center items-center w-4 h-4" width={16} height={16}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd"
                                                ></use>
                                            </svg>

                                            <div> Select Address </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-start items-center w-48 h-full px-2 font-semibold cursor-pointer" title={getCookie('user_address')}>
                                            <svg className="flex justify-center items-center w-4 h-4" width={16} height={16}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd"
                                                ></use>
                                            </svg>

                                            <div className="flex justify-start items-center w-full text-left">
                                                <div className="flex justify-start items-center w-full font-bold text-sm !leading-none">
                                                    <p className="px-1 pr-3 line-clamp-1">
                                                        {getCookie('user_address')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute right-2 flex justify-center items-center w-5 h-5 pointer-events-none">
                                        <svg className="text-[#494949]" width={20} height={20}>
                                            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"></use>
                                        </svg>
                                    </div>
                                </button>
                            </li>

                            <div className="relative flex justify-center items-center w-[65%] h-full rounded-full overflow-hidden">
                                <button className="relative flex justify-center items-center w-full h-full rounded-full overflow-hidden cursor-pointer" onClick={() => setIsSearchMenu(true)}>
                                    <div className="absolute left-3 flex justify-center items-center w-auto h-full select-none pointer-events-none">
                                        <svg className="flex justify-center items-center size-[1.35rem] text-[#191919]"
                                            width={24} height={24}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-search_dd"
                                            ></use>
                                        </svg>
                                    </div>

                                    <input className="flex justify-center items-center w-full h-full pl-9 px-5 bg-[#eeeeee] placeholder:text-[#494949] text-[#191919] font-medium outline-none hover:bg-[#e5e5e5]"
                                        value={searchKey}
                                        placeholder={searchKey ? searchKey : "Search for flowers, gifts and more"}
                                        type="text"
                                        readOnly
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end items-center w-[29%] h-full">
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
                </div>


                <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
                <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />


                <SelectLocation isAddressChooser={isAddressChooser} setIsAddressChooser={setIsAddressChooser} />

                <Search isSearchMenu={isSearchMenu} setIsSearchMenu={setIsSearchMenu} />
            </header>}
        </>
    )
}

export default Header