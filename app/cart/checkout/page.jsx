"use client";

// REACT JS
import React, { useState, useEffect, useContext, Suspense } from 'react';

// NEXT JS
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCookie, getCookies, hasCookie, setCookie, deleteCookie } from 'cookies-next';

// CRYPTO JS
import CryptoJS from 'crypto-js';

// AXIOS
import axios from 'axios';

// FRAMER
import { motion, AnimatePresence } from "framer-motion";

// CONTEXT
import CartContext from '@/context/CartContext';
import UserContext from '@/context/UserContext';

// COMPONENTS
import CheckoutButton from '@/components/function/CheckoutButton';

// TOAST
import toast, { Toaster } from 'react-hot-toast';
import Cart from '@/components/layout/Checkout/Cart';

const Page = () => {
    const {
        cart,
        subTotal,
        numTotal,
        mrpTotal,
        addToCart,
        clearCart,
        removeFromCart,
        removeAtOnce,
    } = useContext(CartContext);
    const {
        user,
        isUserSignedIn,
    } = useContext(UserContext);


    const router = useRouter();
    
    const mappedCart = Object.keys(cart).map((k) => cart[k]);

<<<<<<< HEAD
=======
    // ADD TO CART
    const [cartLoading, setCartLoading] = useState([false, '', ''])

    const addProductToCart = (itemCode, url, qty, availableQty, price, img, name, offer) => {
        setCartLoading([true, url, 'add'])

        setTimeout(() => {
            setCartLoading([false, '', ''])

            addToCart(
                itemCode,
                url,
                qty,
                availableQty,
                price,
                img,
                name,
                offer,
            )
        }, 800)
    }
    const removeProductToCart = (itemCode, url, qty, availableQty, price, img, name, offer) => {
        setCartLoading([true, url, 'delete']);

        setTimeout(() => {
            setCartLoading([false, '', '']);

            removeFromCart(
                itemCode,
                url,
                qty,
                availableQty,
                price,
                img,
                name,
                offer,
            );
        }, 800);
    }


    // SIGN UP

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState(0);

    const [signupLoading, setSignupLoading] = useState(false);
    const [signinLoading, setSigninLoading] = useState(false);

    const AES_SECRET = '09182__signin__65701';

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name: userName,
            email: userEmail,
            phone: parseInt(userPhone)
        }


        setSignupLoading(true);

        setTimeout(async () => {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, [
                    userData
                ]);

                if (res.status === 200) {
                    notify('success', 'Account successfully created.');
                }
            } catch (error) {
                if (error.response.data?.details.includes('E11000 duplicate key error')) {
                    notify('error', 'Account already exists.');
                } else {
                    console.log('An error occurred while signing up:', error);
                }
            }

            setSignupLoading(false);
        }, 1500);
    }

    const handleSigninSubmit = async (event) => {
        event.preventDefault();

        const userData = [{
            email: userEmail,
            phone: parseInt(userPhone),
        }]

        setSigninLoading(true);

        setTimeout(async () => {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/signin`, userData);

                if (res.status === 200) {
                    notify('success', 'Signed in successfully.');

                    let strUserData = [res.data.name, res.data.email, res.data.phone, res.data.token]
                    const encUserData = CryptoJS.AES.encrypt(JSON.stringify(strUserData), AES_SECRET).toString();

                    localStorage.setItem('user', encUserData);

                    router.push(`/cart/checkout?rmd=${(Math.random() * 1000).toFixed(0)}`);
                }
            } catch (error) {
                if (error.response?.data?.details?.includes('Invalid Credentials.')) {
                    notify('error', 'Invalid Credentials.');
                } else if (error.response?.data?.error?.includes('No Such User Found')) {
                    notify('error', 'User not found.');
                } else {
                    notify('error', JSON.stringify(error.response?.data?.details));

                    console.log(error);
                }
            }

            setSigninLoading(false);
        }, 1500);
    }

    // CHECK AUTHORIZATION
    const [authStep, setAuthStep] = useState('signin');


    // STEPS
    const [steps, setSteps] = useState([0, 0, 0]);

    useEffect(() => {
        if (isUserSignedIn) {
            setSteps([1, 0, 0]);
        }
    }, [user, isUserSignedIn]);


    // ADDRESS
    const [address, setAddress] = useState('');
    const [pincodes, setPincodes] = useState([]);
    const [userAddressState, setUserAddressState] = useState('');
    const [isSelectLocationMenuOpen, setIsSelectLocationMenuOpen] = useState(false);
    const [isSelectDateOpen, setIsSelectDateOpen] = useState(false);

    const addAddressToCookie = () => {
        setCookie('user_pincode', address)
    };

    const addStateToCookie = (data) => {
        setCookie('user_state', data)

        setUserAddressState(data);
    };

    const fetchPincodeData = async () => {
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
        fetchPincodeData();
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

>>>>>>> ec272fc8b6da1d8dc92df3fafdbd3b735faff397

    // COUPON
    const [isCouponOpen, setIsCouponOpen] = useState(false);
    const [isCouponApplied, setIsCouponApplied] = useState([false, {}]);
    const [isCouponLoading, setIsCouponLoading] = useState(false);

    useEffect(() => {
        if (getCookie('coupon') !== undefined && getCookie('coupon') !== null && getCookie('coupon') !== '') {
            let bytes = CryptoJS.AES.decrypt(getCookie('coupon'), 'fvnmsdf');
            const decCoupon = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            if (decCoupon !== undefined && decCoupon !== null && decCoupon !== '') {
                setIsCouponApplied([true, decCoupon[0]])
            }
        }
    }, [getCookie('coupon')])

    const clearCoupon = () => {
        setIsCouponLoading(true)

        setTimeout(() => {
            setIsCouponLoading(false)

            deleteCookie('coupon')
            setIsCouponApplied([false, {}])

            router.push(`?rmd=${(Math.random() * 1000).toFixed(0)}`)
        }, 1000);
    }



    return (
        <>
            <Suspense>
                <div className="block justify-center items-start w-full h-screen bg-white text-[#494949]">
                    <div className="relative flex justify-center items-center w-full h-14 px-4 sm:px-4 md:px-6 lg:px-6 xl:px-6 bg-white border-b border-[#e5e5e5] select-none">
                        <div className="flex justify-start items-center w-full h-full">
                            <Link href="/">
                                <button className="flex justify-center items-center w-auto h-full no-outline">
                                    <div className="group flex justify-between items-center w-full h-full font-medium text-[#767676]">
                                        <svg className="group-hover:mr-1 flex justify-start items-center size-5 duration-200" width={24} height={24}>
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron-left"
                                            ></use>
                                        </svg>

                                        <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-end items-center w-auto"> Back to Store </div>
                                    </div>
                                </button>
                            </Link>
                        </div>

                        <Link className="absolute flex justify-center items-center w-full h-full no-outline" href={'/'}>
                            <div className="flex justify-center items-center w-auto">
                                <Image className="flex justify-center items-center w-auto h-6"
                                    src="/assets/Logo/logo.svg"
                                    width={489}
                                    height={78}
                                    alt="flowerpur logo"
                                />
                            </div>
                        </Link>
                    </div>


                    <div className="block sm:block md:flex lg:flex xl:flex justify-between items-start w-full h-full">
                        <div className="flex flex-col justify-center items-start w-full sm:w-full md:w-2/3 lg:w-2/3 xl:w-2/3 h-auto p-4 sm:p-4 md:p-10 lg:p-10 xl:p-10 space-y-4 select-none overflow-hidden">
                            
                        </div>

                        <div className="flex justify-end items-start w-full sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 h-full py-2 sm:py-2 md:py-4 lg:py-4 xl:py-4 bg-white border-t sm:border-t md:border-l lg:border-l xl:border-l border-[#e5e5e5] text-[#191919]">
                            <div className="block justify-start items-start w-full h-auto select-none">
                                <div className="flex justify-between items-center sm:items-center md:items-start lg:items-start xl:items-start w-full h-auto px-4 pb-2 sm:pb-2 md:pb-4 lg:pb-4 xl:pb-4 select-none">
                                    <div className="flex justify-start items-center w-full !leading-none text-lg sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl font-bold">
                                        Items
                                    </div>

                                    <div className="flex justify-end items-center w-full">
                                        <button className="flex justify-center items-center leading-none p-2 space-x-1 rounded-[--global-radius-md] font-medium bg-[#e7e7e7] hover:bg-[#c4c4c4] duration-150">
                                            <svg className="flex justify-center items-center w-4 h-4" width={24} height={24}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-plus_dd"
                                                ></use>
                                            </svg>

                                            <div> Add more items </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-start items-start w-full h-[14rem] border-y border-[#e5e5e5] overflow-y-auto">
                                    <ul className="flex flex-col justify-start items-start w-full h-auto text-[#191919]">
                                        <Cart />
                                    </ul>
                                </div>

                                <div className="flex justify-start items-start w-full h-auto p-4 overflow-y-auto">
                                    {isCouponApplied[0] === false && <button className="flex justify-between items-center w-full h-auto p-2.5 font-medium leading-none bg-[#f7f7f7] rounded-md text-[#191919] hover:bg-[#eeeeee] active:bg-[#e8e8e8] no-outline" onClick={() => setIsCouponOpen(!isCouponOpen)}>
                                        <div className="flex justify-start items-center w-auto space-x-1.5">
                                            <svg className="flex justify-center items-center w-5 h-5" width={24} height={24}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-offers_dd2"
                                                ></use>
                                            </svg>

                                            <div> Promo codes, rewards & gift cards </div>
                                        </div>

                                        <div className="flex justify-end items-center w-auto">
                                            <svg className="flex justify-center items-center w-5 h-5 -rotate-90" width={24} height={24}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"
                                                ></use>
                                            </svg>
                                        </div>
                                    </button>}

                                    {isCouponApplied[0] === true && <div className="relative flex justify-between items-center w-full h-14 px-4 font-bold bg-[#e7e7e7] text-[#292929] rounded select-auto
                                    after:absolute after:-ml-[1px] after:left-0 after:w-3 after:h-5 after:bg-white after:rounded-r-full after:pointer-events-none
                                    before:absolute before:-mr-[1px] before:right-0 before:w-3 before:h-5 before:bg-white before:rounded-l-full before:pointer-events-none overflow-hidden"
                                    >
                                        <div className="flex justify-start items-center w-auto space-x-1.5">
                                            <div className="flex justify-start items-center w-5 h-5">
                                                <svg className="flex justify-center items-center w-5 h-5" width={24} height={24}>
                                                    <use
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-offers_dd2"
                                                    ></use>
                                                </svg>
                                            </div>

                                            {isCouponApplied[1].map((c, index) => {
                                                return <div key={index} className="flex justify-start items-center w-full">
                                                    <div className="flex justify-center items-center w-full h-full anim__pulse-wave2">
                                                        <div className="block justify-center items-center w-full h-auto space-y-0.5">
                                                            <div className="flex justify-start items-center w-auto leading-none text-base">
                                                                {c.code}
                                                            </div>

                                                            <div className="flex justify-start items-center w-auto leading-none text-sm font-medium">
                                                                {c.type === 'fixed' && `Get a discount of ₹${c.discount} on your purchase`}
                                                                {c.type === 'percent' && `${c.discount}% OFF on your purchase`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>

                                        {!isCouponLoading ? <div className="flex justify-end items-center w-5 h-5 cursor-pointer" onClick={clearCoupon}>
                                            <svg className="flex justify-center items-center w-5 h-5" width={24} height={24}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"
                                                ></use>
                                            </svg>
                                        </div> : <div className="flex justify-end items-center w-5 h-5 cursor-default" onClick={clearCoupon}>
                                            <svg className="animate-[spin_600ms_linear_infinite]" width={16} height={16}>
                                                <use
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                ></use>
                                            </svg>
                                        </div>}
                                    </div>}
                                </div>

                                <div className="flex justify-start items-start w-full h-[4.75rem] p-4 border-y border-[#e5e5e5]">
                                    <CheckoutButton
                                        products={mappedCart}
                                        subTotal={subTotal}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* COUPON */}
                {/* <Coupon isCouponOpen={isCouponOpen} setIsCouponOpen={setIsCouponOpen} /> */}


                {/* TOAST */}
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </Suspense>
        </>
    )
}

export default Page