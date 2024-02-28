'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext } from 'react'
import { useCookies } from 'react-cookie'; // Import useCookies hook

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

// COMPONENTS
import Cart from './Cart';

const Header = () => {
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

    // const [address, setAddress] = useState('');
    // const [pincodes, setPincodes] = useState([]);
    // const [userAddressState, setUserAddressState] = useState('');
    // const [cookies, setCookie] = useCookies();
    // const [isSelectLocationMenuOpen, setIsSelectLocationMenuOpen] = useState(false);

    // const addAddressToCookie = (data) => {
    //     setCookie('user_pincode', data, { secure: true });
    //     setAddress(data);
    // };

    // const addStateToCookie = (data) => {
    //     setCookie('user_state', data, { secure: true });
    //     setUserAddressState(data);
    // };

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/pincodes`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         setPincodes(response.data);
    //     } catch (error) {
    //         console.error('There was a problem with your fetch operation:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     if (cookies.user_pincode && pincodes.length > 0) {
    //         const pinArr = pincodes[0];
    //         const filteredPins = pinArr?.filter((k) => k[0] === JSON.stringify(cookies.user_pincode));
    //         if (filteredPins && filteredPins.length > 0) {
    //             let uState = filteredPins[0][1];
    //             addStateToCookie(uState);
    //         } else {
    //             console.log('No matching pins found.');
    //         }
    //     }
    // }, [cookies, pincodes]);

    // const handleAddressChange = (e) => {
    //     setAddress(e.target.value);
    // };

    // const handleAddressSubmit = (e) => {
    //     e.preventDefault();

    //     const pinArr = pincodes[0];

    //     if (JSON.stringify(pinArr).includes(address)) {
    //         addAddressToCookie(address);
    //     }
    // };


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

    return (
        <>
            <div className="fixed top-0 z-[500] hidden sm:hidden md:block lg:block xl:block items-center w-full bg-white text-[#292929]">
                <div className="flex justify-center items-center w-full h-16 py-2 px-8 space-x-2 border-b border-[#e5e5e5] select-none">
                    <div className="flex justify-start items-center w-[16%] h-full cursor-pointer space-x-2">
                        <div className="flex justify-center items-center w-auto h-full cursor-pointer rounded-md overflow-hidden">
                            <Link className="no-outline" href={'/'}>
                                <div className="flex justify-center items-center w-full h-full">
                                    <svg className="" width={180} height={180}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/critical.svg#flowerpur"
                                        ></use>
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center items-center w-[47%] h-10 space-x-2">
                        <div className="relative flex justify-center items-center w-[40%] h-full rounded-full overflow-hidden">
                            <button className="relative flex justify-center items-center w-full h-full cursor-pointer" htmlFor="s_location">
                                {/* {cookies.user_pincode ? (
                                    <div className="flex justify-start items-center w-full h-full pl-9 px-2 bg-white border border-[#e5e5e5] rounded-full font-medium appearance-none cursor-pointer hover:bg-[#f7f7f7]" name="s_location" id="selector_location">
                                        {`${cookies.user_pincode}, ${cookies.user_state}`}
                                    </div>
                                ) : ( */}
                                <div className="flex justify-start items-center w-full h-full pl-9 px-2 bg-white border border-[#e5e5e5] rounded-full font-medium appearance-none cursor-pointer hover:bg-[#f7f7f7]" name="s_location" id="selector_location">
                                    Select Address
                                </div>
                                {/* )} */}
                                <div className="absolute left-2 flex justify-center items-center w-6 h-6 pointer-events-none">
                                    <svg className="text-[#494949]" width={20} height={20}>
                                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-world-map"></use>
                                    </svg>
                                </div>
                                <div className="absolute right-2 flex justify-center items-center w-6 h-6 pointer-events-none">
                                    <svg className="text-[#494949]" width={20} height={20}>
                                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"></use>
                                    </svg>
                                </div>
                            </button>
                        </div>

                        <div className="relative flex justify-center items-center w-[60%] h-full rounded-full overflow-hidden">
                            <label className="relative flex justify-center items-center w-full h-full rounded-full overflow-hidden" htmlFor="search">
                                <div className="absolute left-2 flex justify-center items-center w-auto h-full select-none pointer-events-none">
                                    <svg className="text-[#494949]" width={24} height={24}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-search_dd"
                                        ></use>
                                    </svg>
                                </div>

                                <input className="flex justify-center items-center w-full h-full pl-9 px-4 bg-[#f7f7f7] placeholder:text-[#494949] text-[#494949] font-medium outline-none hover:bg-[#eeeeee] hover:cursor-pointer" type="text" placeholder="Search for flowers, cakes, gifts, etc." name="search" />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end items-center w-[37%] h-full">
                        <ul className="flex justify-center items-center w-full h-full space-x-2 text-base font-semibold">
                            <li className="relative flex flex-col justify-center items-center w-auto h-12 px-3 bg-white hover:bg-[#f7f7f7] border-[1.5px] border-[#e5e5e5] rounded-full cursor-pointer">
                                <svg className="w-5 h-5 text-[#797979]" width={20} height={20}>
                                    <use
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd3"
                                    ></use>
                                </svg>

                                <div className="flex justify-center items-center w-full text-sm">
                                    Track order
                                </div>
                            </li>

                            <li className="relative flex justify-center items-center w-auto h-12 px-2 bg-white border-[1.5px] border-[#e5e5e5] rounded-full duration-100 space-x-2">
                                <svg className="text-[#797979]" width={26} height={26}>
                                    <use
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-user_dd"
                                    ></use>
                                </svg>

                                <div className="flex justify-center items-center w-full space-x-2">
                                    <Link href="/" className="flex justify-center items-center w-auto no-outline">
                                        <div className="flex justify-center items-center w-full px-3 py-1 bg-white hover:bg-[#f7f7f7] border border-[#d6d6d6] rounded-full cursor-pointer">
                                            Sign In
                                        </div>
                                    </Link>

                                    <Link href="/" className="flex justify-center items-center w-auto no-outline">
                                        <div className="flex justify-center items-center w-full px-3 py-1 bg-[#d6d6d6] rounded-full cursor-pointer">
                                            Sign Up
                                        </div>
                                    </Link>
                                </div>
                            </li>

                            <li className="flex justify-center items-center w-[4.5rem] h-10 cursor-pointer">
                                <button className="relative flex justify-center items-center w-full h-full bg-[#24543e] rounded-full cursor-pointer space-x-2 hover:bg-[#1C4632] overflow-hidden duration-200" onClick={() => setIsCartOpen(true)}>
                                    <svg className="text-white" width={22} height={22}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-cart_dd"
                                        ></use>
                                    </svg>

                                    <div className="flex justify-center items-center text-white">
                                        {numTotal}
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* MENU */}
                <div className="flex justify-center items-center w-full h-18 py-2 px-6 bg-[#f7f7f7] border-b-[1.5px] border-[#e5e5e5]">
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


            <div className="fixed top-0 z-[500] block sm:block md:hidden lg:hidden xl:hidden items-center w-full select-none bg-white text-[#292929]">
                <div className="flex justify-start items-center w-full h-14 py-1 px-3.5 space-x-2">
                    <div className="flex justify-between items-center w-full h-full cursor-pointer space-x-2 text-[#191919]">
                        <div className="flex justify-start items-center w-auto h-full cursor-pointer rounded-md space-x-4">
                            <div className="flex justify-center items-center w-8 h-8">
                                <IconButton className="z-[1] flex justify-center items-center">
                                    <svg className="flex justify-center items-center" width={28} height={28}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-menu_dd"
                                        ></use>
                                    </svg>
                                </IconButton>
                            </div>

                            <div className="flex justify-center items-center w-8 h-8 text-[#24543e]">
                                <Link href={"/"}>
                                    <svg className="flex justify-center items-center" width={28} height={28}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-icon_dd"
                                        ></use>
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        <div className="flex justify-end items-center w-auto h-full cursor-pointer rounded-md space-x-4">
                            <div className="flex justify-center items-center w-8 h-8">
                                <IconButton className="z-[1] flex justify-center items-center">
                                    <svg className="flex justify-center items-center" width={28} height={28}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd3"
                                        ></use>
                                    </svg>
                                </IconButton>
                            </div>

                            <div className="relative flex justify-center items-center w-8 h-8">
                                <div className="absolute z-[2] top-0 right-0 flex justify-center items-center w-3.5 h-3.5 leading-none text-[10px] bg-[#24543e] rounded-full font-bold text-white text-ellipsis overflow-hidden">
                                    {numTotal}
                                </div>

                                <IconButton className="z-[1] flex justify-center items-center" onClick={() => setIsCartOpen(true)}>
                                    <svg className="flex justify-center items-center" width={28} height={28}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-cart2_dd"
                                        ></use>
                                    </svg>
                                </IconButton>
                            </div>

                            <div className="flex justify-center items-center w-8 h-8">
                                <IconButton className="z-[1] flex justify-center items-center">
                                    <svg className="flex justify-center items-center" width={28} height={28}>
                                        <use
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-user_dd"
                                        ></use>
                                    </svg>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start items-center w-full h-12 py-1.5 px-3.5 space-x-2 border-y border-[#e5e5e5]">
                    <label className="relative flex justify-center items-center w-full h-full rounded-full overflow-hidden" htmlFor="search">
                        <div className="absolute left-2 flex justify-center items-center w-auto h-full select-none pointer-events-none">
                            <svg className="text-[#494949]" width={24} height={24}>
                                <use
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-search_dd"
                                ></use>
                            </svg>
                        </div>

                        <input className="flex justify-center items-center w-full h-full pl-9 px-4 bg-[#f7f7f7] placeholder:text-[#494949] text-[#494949] font-medium outline-none hover:bg-[#eeeeee] hover:cursor-pointer" type="text" placeholder="Search for flowers, cakes, gifts, etc." name="search" />
                    </label>
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


            {/* SELECT LOCATION */}
            {/* <AnimatePresence>
                {isSelectLocationMenuOpen && (
                    <motion.div className="fixed top-14 left-14 sm:left-14 md:left-56 lg:left-56 xl:left-56 flex justify-start items-start w-[60%] sm:w-[60%] md:w-[25%] lg:w-[25%] xl:w-[25%] h-auto z-[600] text-[#292929]"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        onBlur={() => setIsSelectLocationMenuOpen(false)}
                        onClick={() => setIsSelectLocationMenuOpen(true)}
                        onFocus={() => setIsSelectLocationMenuOpen(true)}
                    >
                        <div className="relative z-[200] flex flex-col justify-start items-center w-full h-auto bg-white rounded-md
                        after:hidden sm:after:hidden md:after:block lg:after:block xl:after:block after:absolute after:-top-2 after:right-7 after:left-8 after:z-10 after:w-4 after:h-4 after:bg-white after:rotate-45 after:rounded-tl after:border-l-[1.5px] after:border-t-[1.5px] after:border-[#e5e5e5] border-[1.5px] border-[#e5e5e5]"
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
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd3"
                                                ></use>
                                            </svg>
                                        </div>

                                        <input className="flex justify-center items-center w-full h-full pl-8 p-2 rounded-md bg-[#f7f7f7] placeholder:text-[#797979] placeholder:font-medium font-semibold appearance-none"
                                            type="number"
                                            placeholder="Address"
                                            name="address_input"
                                            id="address_input"
                                            onChange={handleAddressChange}
                                            value={address}
                                        />
                                    </label>

                                    <button className="flex justify-center items-center w-full h-9 rounded-md bg-[#eb1700] text-white font-semibold" onClick={handleAddressSubmit}>
                                        Confirm Address
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence> */}
        </>
    )
}

export default Header