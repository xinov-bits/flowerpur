'use client';

import React, { useState, useEffect, useContext, useRef } from 'react'

// NEXT JS
import Link from 'next/link'
import Image from 'next/image'

// CRYPTO JS
import CryptoJS from 'crypto-js'

// AXIOS
import axios from 'axios';

// FRAMER
import { motion, AnimatePresence } from "framer-motion";

// CONTEXT
import CartContext from '@/context/CartContext';

// SWIPER
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

export default function Page({ params }) {
    const slug = params.slug;


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


    // GET PRODUCTS
    const [product, setProduct] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getproduct?slug="${slug}"`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            let productData = response.data;

            if (productData?.length > 0) {
                setProduct(productData[0]);
            } else {
                setProduct(productData);
            }
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const splideRef = useRef(null);

    const handleRadioButtonClick = (slideIndex) => {
        splideRef.current.go(slideIndex);
    };

    useEffect(() => {
        if (splideRef.current) {
            splideRef.current.go(0);
        }
    }, [slug, product]);



    // STAR (REVIEW)
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const apiUrl = `${process.env.NEXT_PUBLIC_HOST}/api/getreviews?pn="${slug}"`;
                const response = await axios.get(apiUrl);

                if (response.status === 200) {
                    setReviews(response.data);
                }
            } catch (error) {
                console.log("Error: " + error.message);
            }
        };

        fetchReviews();
    }, [slug]);

    const [reviewMean, setReviewMean] = useState(5);

    const approvedReveiws = Object.keys(reviews).filter((k) => {
        if (reviews[k].approved === true) {
            return reviews[k]
        }
    }).map((k) => reviews[k])

    const reviewArr = Object.values(approvedReveiws).map((review) => review.stars);
    const sumOfReviews = reviewArr.reduce((a, b) => a + b, 0);

    const renderStarsCustom = (count, size) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<div key={i}>
                <svg className={`${size} text-[#ce8f14] fill-[#ffd700]`}>
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-star_slug"></use>
                </svg>
            </div>);
        }
        return stars;
    };

    const renderStarsCustomE = (count, size) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<div key={i}>
                <svg className={`${size} text-[#8c8c8c]`}>
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-e-star_slug"></use>
                </svg>
            </div>);
        }
        return stars;
    };

    useEffect(() => {
        if (sumOfReviews > 0) {
            setReviewMean(sumOfReviews / reviewArr.length);
        }
    }, [sumOfReviews]);


    // ADD TO CART
    const [cartLoading, setCartLoading] = useState(false);

    const [extrasToAdd, setExtrasToAdd] = useState(['', '']);
    const [extraLoading, setExtraLoading] = useState(false);

    const [addExtraToCart, setAddExtraToCart] = useState(false);

    const addProductToCart = (itemCode, url, qty, availableQty, price, img, name, offer) => {
        setCartLoading(true);

        setTimeout(() => {
            setCartLoading(false);

            addToCart(
                itemCode,
                url,
                qty,
                availableQty,
                price,
                img,
                name,
                offer,
            );

            setAddExtraToCart(true);
            // setExtrasToAdd(['', '']);
        }, 1000);
    }

    useEffect(() => {
        if (addExtraToCart === true && extrasToAdd[0] === 'vase' && !(JSON.stringify(cart)?.includes('special__vase'))) {
            addToCart(
                'special__vase',
                'special__vase',
                1,
                999,
                199,
                'https://i.ibb.co/QjvwMwP/image.png',
                'Minimal Flower Vase',
                '',
            );
        }

        setAddExtraToCart(false);
    }, [addExtraToCart])

    return (
        <>
            <div className="block justify-center items-center w-full h-full bg-white">
                {/* <div className="flex justify-start items-center w-full h-14 px-4 bg-white text-sm text-[#191919] space-x-2 capitalize select-none">
                    <div className="text-[#767676] underline hover:no-underline hover:text-[#191919]">
                        <Link href={`/`}>
                            Home
                        </Link>
                    </div>

                    <div> / </div>

                    <div className="text-[#767676] underline hover:no-underline hover:text-[#191919]">
                        <Link href={`/${product?.category}`}>
                            {product?.category}
                        </Link>
                    </div>

                    <div> / </div>

                    <div className="text-[#767676] underline hover:no-underline hover:text-[#191919]">
                        <Link href={`/${product?.category}/kinds/${product?.subCategory}`}>
                            {product?.subCategory}
                        </Link>
                    </div>

                    <div> / </div>

                    <div className="text-[#191919]">
                        {product?.title}
                    </div>
                </div> */}

                <div className="block sm:block md:flex lg:flex xl:flex justify-center sm:justify-center md:justify-between lg:justify-between xl:justify-between items-center w-full h-full px-2 bg-white space-x-0 sm:space-x-0 md:space-x-2 lg:space-x-2 xl:space-x-2">
                    <div className="relative hidden sm:hidden md:flex lg:flex xl:flex justify-start items-center w-1/2 h-[30rem] py-2">
                        <div className="relative flex justify-start items-center w-[30rem] h-full cursor-pointer rounded-md overflow-hidden select-none">
                            <Splide className="flex justify-center items-center w-full h-auto bg-[#f6f6f6] rounded-md overflow-hidden"
                                hasTrack={false}
                                options={{
                                    rewind: true,
                                    width: 550,
                                    height: 550,
                                    gap: '0rem',
                                    pagination: false,
                                    arrows: false,
                                    loop: true,
                                }}
                                ref={splideRef}
                            >
                                <SplideTrack className="rounded-md overflow-hidden">
                                    <SplideSlide className="flex justify-center items-center w-full h-full overflow-hidden">
                                        <Image className="flex justify-center items-center w-auto h-auto"
                                            src={product?.img1}
                                            width={1080}
                                            height={1080}
                                        />
                                    </SplideSlide>

                                    <SplideSlide className="flex justify-center items-center w-full h-full overflow-hidden">
                                        <Image className="flex justify-center items-center w-auto h-auto"
                                            src={product?.img2}
                                            width={1080}
                                            height={1080}
                                        />
                                    </SplideSlide>

                                    <SplideSlide className="flex justify-center items-center w-full h-full overflow-hidden">
                                        <Image className="flex justify-center items-center w-auto h-auto"
                                            src={product?.img3}
                                            width={1080}
                                            height={1080}
                                        />
                                    </SplideSlide>
                                </SplideTrack>
                            </Splide>

                            {/* Custom pagination */}
                            <div className="absolute z-[1] bottom-0 left-0 -m-0.5 flex justify-center items-center w-auto p-2 space-x-2 select-none bg-white rounded-tr-md">
                                {(product?.img1 != '' || product?.img1 != undefined) && <div className="flex justify-center items-center">
                                    <input
                                        className="absolute w-10 h-10 z-50 hidden cursor-pointer"
                                        type="radio"
                                        value="product_image_selector-img1"
                                        name="product_image_selector"
                                        id="product_image_selector-img1"
                                        onClick={() => handleRadioButtonClick(0)}
                                    />

                                    <label
                                        htmlFor="product_image_selector-img1"
                                        className="relative flex justify-center items-center border border-[#e5e5e5] rounded-md cursor-pointer duration-200 focus:!outline-[0px]  product_image_selector-img1"
                                    >
                                        {slug !== undefined && product?.img1 !== undefined ? (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                                                <Image
                                                    className="flex justify-start items-center rounded-md"
                                                    src={product?.img1}
                                                    width={60}
                                                    height={60}
                                                />
                                            </motion.div>
                                        ) : (
                                            <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-md" />
                                        )}
                                    </label>
                                </div>}

                                {(product?.img2 != '' || product?.img2 != undefined) && <div className="flex justify-center items-center">
                                    <input
                                        className="absolute w-10 h-10 z-50 hidden cursor-pointer"
                                        type="radio"
                                        value="product_image_selector-img2"
                                        name="product_image_selector"
                                        id="product_image_selector-img2"
                                        onClick={() => handleRadioButtonClick(1)}
                                    />

                                    <label
                                        htmlFor="product_image_selector-img2"
                                        className="relative flex justify-center items-center border border-[#e5e5e5] rounded-md cursor-pointer duration-200 focus:!outline-[0px]  product_image_selector-img2"
                                    >
                                        {slug !== undefined && product?.img2 !== undefined ? (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                                                <Image
                                                    className="flex justify-start items-center rounded-md"
                                                    src={product?.img2}
                                                    width={60}
                                                    height={60}
                                                />
                                            </motion.div>
                                        ) : (
                                            <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-md" />
                                        )}
                                    </label>
                                </div>}

                                {(product?.img3 != '' || product?.img3 != undefined) && <div className="flex justify-center items-center">
                                    <input
                                        className="absolute w-10 h-10 z-50 hidden cursor-pointer"
                                        type="radio"
                                        value="product_image_selector-img3"
                                        name="product_image_selector"
                                        id="product_image_selector-img3"
                                        onClick={() => handleRadioButtonClick(2)}
                                    />

                                    <label
                                        htmlFor="product_image_selector-img3"
                                        className="relative flex justify-center items-center border border-[#e5e5e5] rounded-md cursor-pointer duration-200 focus:!outline-[0px]  product_image_selector-img3"
                                    >
                                        {slug !== undefined && product?.img3 !== undefined ? (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                                                <Image
                                                    className="flex justify-start items-center rounded-md"
                                                    src={product?.img3}
                                                    width={60}
                                                    height={60}
                                                />
                                            </motion.div>
                                        ) : (
                                            <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-md" />
                                        )}
                                    </label>
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="relative flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-center w-full h-auto py-2">
                        <div className="relative flex justify-center items-center w-auto h-auto cursor-pointer rounded-md overflow-hidden select-none">
                            <Splide className="flex justify-center items-center w-auto h-auto bg-[#f6f6f6] rounded-md overflow-hidden"
                                hasTrack={false}
                                options={{
                                    rewind: true,
                                    width: 'auto',
                                    height: 'auto',
                                    gap: '0rem',
                                    pagination: false,
                                    arrows: false,
                                    loop: true,
                                }}
                                ref={splideRef}
                            >
                                <SplideTrack className="flex justify-center items-center w-full h-auto rounded-md overflow-hidden">
                                    <SplideSlide className="flex justify-center items-center w-auto h-auto overflow-hidden">
                                        <Image className="flex justify-center items-center w-auto h-auto"
                                            src={product?.img1}
                                            width={1080}
                                            height={1080}
                                        />
                                    </SplideSlide>

                                    <SplideSlide className="flex justify-center items-center w-auto h-auto overflow-hidden">
                                        <Image className="flex justify-center items-center w-auto h-auto"
                                            src={product?.img2}
                                            width={1080}
                                            height={1080}
                                        />
                                    </SplideSlide>

                                    <SplideSlide className="flex justify-center items-center w-auto h-auto overflow-hidden">
                                        <Image className="flex justify-center items-center w-auto h-auto"
                                            src={product?.img3}
                                            width={1080}
                                            height={1080}
                                        />
                                    </SplideSlide>
                                </SplideTrack>
                            </Splide>

                            {/* Custom pagination */}
                            <div className="absolute z-[1] bottom-0 left-0 -m-0.5 flex justify-center items-center w-auto p-2 space-x-2 select-none bg-white rounded-tr-md">
                                {(product?.img1 != '' || product?.img1 != undefined) && <div className="flex justify-center items-center">
                                    <input
                                        className="absolute w-10 h-10 z-50 hidden cursor-pointer"
                                        type="radio"
                                        value="product_image_selector-img1"
                                        name="product_image_selector"
                                        id="product_image_selector-img1"
                                        onClick={() => handleRadioButtonClick(0)}
                                    />

                                    <label
                                        htmlFor="product_image_selector-img1"
                                        className="relative flex justify-center items-center border border-[#e5e5e5] rounded-md cursor-pointer duration-200 focus:!outline-[0px]  product_image_selector-img1"
                                    >
                                        {slug !== undefined && product?.img1 !== undefined ? (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                                                <Image
                                                    className="flex justify-start items-center rounded-md"
                                                    src={product?.img1}
                                                    width={60}
                                                    height={60}
                                                />
                                            </motion.div>
                                        ) : (
                                            <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-md" />
                                        )}
                                    </label>
                                </div>}

                                {(product?.img2 != '' || product?.img2 != undefined) && <div className="flex justify-center items-center">
                                    <input
                                        className="absolute w-10 h-10 z-50 hidden cursor-pointer"
                                        type="radio"
                                        value="product_image_selector-img2"
                                        name="product_image_selector"
                                        id="product_image_selector-img2"
                                        onClick={() => handleRadioButtonClick(1)}
                                    />

                                    <label
                                        htmlFor="product_image_selector-img2"
                                        className="relative flex justify-center items-center border border-[#e5e5e5] rounded-md cursor-pointer duration-200 focus:!outline-[0px]  product_image_selector-img2"
                                    >
                                        {slug !== undefined && product?.img2 !== undefined ? (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                                                <Image
                                                    className="flex justify-start items-center rounded-md"
                                                    src={product?.img2}
                                                    width={60}
                                                    height={60}
                                                />
                                            </motion.div>
                                        ) : (
                                            <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-md" />
                                        )}
                                    </label>
                                </div>}

                                {(product?.img3 != '' || product?.img3 != undefined) && <div className="flex justify-center items-center">
                                    <input
                                        className="absolute w-10 h-10 z-50 hidden cursor-pointer"
                                        type="radio"
                                        value="product_image_selector-img3"
                                        name="product_image_selector"
                                        id="product_image_selector-img3"
                                        onClick={() => handleRadioButtonClick(2)}
                                    />

                                    <label
                                        htmlFor="product_image_selector-img3"
                                        className="relative flex justify-center items-center border border-[#e5e5e5] rounded-md cursor-pointer duration-200 focus:!outline-[0px]  product_image_selector-img3"
                                    >
                                        {slug !== undefined && product?.img3 !== undefined ? (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                                                <Image
                                                    className="flex justify-start items-center rounded-md"
                                                    src={product?.img3}
                                                    width={60}
                                                    height={60}
                                                />
                                            </motion.div>
                                        ) : (
                                            <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-md" />
                                        )}
                                    </label>
                                </div>}
                            </div>
                        </div>
                    </div>


                    <div className="relative flex justify-center items-start w-full h-full sm:h-full md:h-[30rem] lg:h-[30rem] xl:h-[30rem] text-[#191919]">
                        {!(product.title === undefined || product.title === '' || product.title === null || product.title == []) && (
                            <motion
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.4 }}
                                className="relative flex flex-col justify-start items-start w-full h-full border-0 sm:border-0 md:border-l lg:border-l xl:border-l border-[#e5e5e5]"
                            >
                                <div className="flex justify-start items-center w-full px-2 sm:px-2 md:px-6 lg:px-6 xl:px-6 mt-6 text-base font-medium underline text-[#767676] decoration-[#797979] hover:no-underline capitalize cursor-pointer leading-none">
                                    {product?.category}
                                </div>

                                <div className="flex justify-start items-center w-full px-2 sm:px-2 md:px-6 lg:px-6 xl:px-6 text-2xl font-bold capitalize">
                                    {product?.title}
                                </div>

                                <div className="flex justify-start items-center w-auto px-2 sm:px-2 md:px-6 lg:px-6 xl:px-6 capitalize space-x-1.5 cursor-pointer">
                                    <div className="flex justify-center items-center w-auto">
                                        {renderStarsCustom(Math.round(reviewMean), 'w-4 h-4')}
                                        {renderStarsCustomE((5 - Math.round(reviewMean)), 'w-4 h-4')}
                                    </div>

                                    <div className="flex justify-center items-center w-auto underline text-[#767676]">
                                        {reviewMean}
                                    </div>
                                </div>

                                <div className="flex justify-start items-center w-full px-2 sm:px-2 md:px-6 lg:px-6 xl:px-6 mt-2 text-2xl font-bold">
                                    ₹{product?.price}.00
                                </div>

                                <div className="flex flex-col justify-start items-center w-full px-2 sm:px-2 md:px-6 lg:px-6 xl:px-6 mt-2 py-4 text-lg border-t border-[#e5e5e5] text-[#191919]">
                                    <div className="flex justify-start items-center w-full font-semibold">
                                        Additions & Address
                                    </div>

                                    <div className="flex justify-start items-center w-full mt-2 space-x-4 select-none">
                                        <button className="flex justify-start items-center w-full h-full p-2 bg-white border border-[#e5e5e5] rounded-md cursor-pointer">
                                            <ul className="flex flex-col justify-start items-center w-full p-1 text-base font-semibold divide-y divide-[#e5e5e5]">
                                                <li className="flex justify-between items-center w-full pb-2 leading-none">
                                                    <div className="flex justify-start items-center w-full">
                                                        Vase
                                                    </div>

                                                    <div className="flex justify-end items-center w-auto space-x-1.5">
                                                        <div className="flex justify-end items-center w-auto font-medium">
                                                            ₹199
                                                        </div>

                                                        {extrasToAdd[0] === '' ? <div className="flex justify-end items-center w-[4.25rem] h-7">
                                                            {!extraLoading ? <button className="flex justify-center items-center w-full h-full border-[1.5px] border-[#e5e5e5] rounded-full text-sm hover:bg-[#f7f7f7] hover:border-[#c0c0c0] active:border-[#767676]" onClick={() => {
                                                                setExtrasToAdd(['vase', '']);
                                                                setExtraLoading(true);

                                                                setTimeout(() => {
                                                                    setExtraLoading(false);
                                                                }, 1000);
                                                            }}>
                                                                <svg className="" width={16} height={16}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-plus_dd"
                                                                    ></use>
                                                                </svg>

                                                                Add
                                                            </button> : <button className="flex justify-center items-center w-7 h-full border-[1.5px] border-[#e5e5e5] rounded-full text-sm">
                                                                <svg className="animate-[spin_600ms_linear_infinite]" width={12} height={12}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                                    ></use>
                                                                </svg>
                                                            </button>}
                                                        </div> : <div className="flex justify-end items-center w-[4.25rem] h-7">
                                                            <button className="flex justify-center items-center w-full h-full text-sm bg-[#e0f2f7] rounded-full border-[1.5px] border-[#528c8e] text-[#528c8e]">
                                                                <svg className="" width={12} height={12}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-check_dd"
                                                                    ></use>
                                                                </svg>

                                                                Added
                                                            </button>
                                                        </div>}
                                                    </div>
                                                </li>

                                                <li className="flex justify-between items-center w-full pt-2 leading-none">
                                                    <div className="flex justify-start items-center w-full">
                                                        Double flower quantity
                                                    </div>

                                                    <div className="flex justify-end items-center w-auto space-x-1.5">
                                                        <div className="flex justify-end items-center w-auto font-medium">
                                                            ₹349
                                                        </div>

                                                        {extrasToAdd[1] === '' ? <div className="flex justify-end items-center w-[4.25rem] h-7">
                                                            <button className="flex justify-center items-center w-full h-full border-[1.5px] border-[#e5e5e5] rounded-full text-sm hover:bg-[#f7f7f7] hover:border-[#c0c0c0] active:border-[#767676]">
                                                                <svg className="" width={16} height={16}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-plus_dd"
                                                                    ></use>
                                                                </svg>

                                                                Add
                                                            </button>
                                                        </div> : <div className="flex justify-end items-center w-16 h-7">
                                                            <button className="flex justify-center items-center w-full h-full border-[1.5px] border-[#e5e5e5] rounded-full text-sm">
                                                                <svg className="" width={12} height={12}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-check_dd"
                                                                    ></use>
                                                                </svg>

                                                                Added
                                                            </button>
                                                        </div>}
                                                    </div>
                                                </li>
                                            </ul>
                                        </button>

                                        <button className="hidden sm:hidden md:flex lg:flex xl:flex justify-start items-center w-full h-full p-2 bg-white border border-[#e5e5e5] rounded-md leading-none cursor-pointer">
                                            <div className="flex justify-start items-center w-full">

                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-start items-center w-full h-2 sm:h-2 md:h-4 lg:h-4 xl:h-4 border-y border-[#e5e5e5] bg-[#f7f7f7]" />

                                <div className="flex flex-col justify-start items-center w-full sm:w-full md:w-[80%] lg:w-[80%] xl:w-[80%] h-full px-2 sm:px-2 md:px-6 lg:px-6 xl:px-6 mt-2 py-4 text-lg text-[#191919]">
                                    <div className="flex justify-start items-center w-full h-12 space-x-2 select-none">
                                        <div className="relative flex justify-start items-center w-[28%] sm:w-[28%] md:w-[20%] lg:w-[20%] xl:w-[20%] h-full cursor-pointer">
                                            <button className="flex justify-between items-center w-full h-full px-2.5 space-x-1.5 bg-white hover:bg-[#f7f7f7] active:bg-[#f0f0f0] border border-[#767676] rounded-md  cursor-pointer">
                                                <div className="flex justify-start items-center w-full font-normal"> Qty </div>

                                                <div className="flex justify-center items-center w-full font-bold"> 1 </div>

                                                <div className="flex justify-end items-center w-full pointer-events-none">
                                                    <svg className="" width={24} height={24}>
                                                        <use
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"
                                                        ></use>
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>

                                        <div className="flex justify-start items-center w-[72%] sm:w-[72%] md:w-[80%] lg:w-[80%] xl:w-[80%] h-full">
                                            {!cartLoading ? <button className="flex justify-center items-center w-full h-full bg-[#24543e] hover:bg-[#1C4632] active:bg-[#163C2B] text-white font-semibold rounded-md duration-200"
                                                onClick={() => addProductToCart(
                                                    product.slug,
                                                    product.slug,
                                                    1,
                                                    product.availableQty,
                                                    product.price,
                                                    product.dimg,
                                                    product.title,
                                                    product.offer,
                                                )}>
                                                <div>
                                                    Add to cart
                                                </div>
                                            </button> : <button className="flex justify-center items-center w-full h-full bg-[#24543e] text-white font-semibold rounded-md duration-200">
                                                <svg className="animate-[spin_600ms_linear_infinite]" width={16} height={16}>
                                                    <use
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                    ></use>
                                                </svg>
                                            </button>}
                                        </div>
                                    </div>
                                </div>
                            </motion>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}