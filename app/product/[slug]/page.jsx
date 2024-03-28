'use client';

import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'
import { getCookie, getCookies, hasCookie, setCookie, deleteCookie } from 'cookies-next'

// NEXT JS
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

// CRYPTO JS
import CryptoJS from 'crypto-js'

// AXIOS
import axios from 'axios';

// FRAMER
import { motion, AnimatePresence } from "framer-motion";

// CONTEXT
import CartContext from '@/context/CartContext';

// SWIPER & SPLIDE
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

// MOMENT JS
import moment from 'moment';

// DROPZONE
import { useDropzone } from 'react-dropzone'

// COMPONENTS
import { InputField } from '@/components/core/InputField';
import SelectLocation from '@/components/models/SelectLocation';
import ZoomImage from '@/components/function/ZoomImage';

// REACT CALENDAR
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function Page({ params }) {
    const {
        cart,
        subTotal,
        numTotal,
        mrpTotal,
        favList,
        recentView,
        addToCart,
        addMultipleToCart,
        clearCart,
        removeFromCart,
        removeAtOnce,
        isCartOpenATC,
        setIsCartOpenATC,
    } = useContext(CartContext);

    const slug = params.slug;
    const router = useRouter();


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

    const [swiper, setSwiper] = useState(null);

    const handleRadioButtonClickSWIPER = (slideIndex) => {
        if (swiper) {
            swiper.slideTo(slideIndex);
        }
    };

    useEffect(() => {
        if (splideRef.current) {
            splideRef.current.go(0);
        }
    }, [slug, product]);



    // STAR (REVIEW)
    const [rStars, setRStars] = useState(0);
    const [rEmail, setREmail] = useState('');
    const [rName, setRName] = useState('');
    const [rTitle, setRTitle] = useState('');
    const [rDesc, setRDesc] = useState('');
    const [rPopup, setRPopup] = useState(false);

    const [selectedImage, setSelectedImage] = useState('');
    const [rImg, setRImg] = useState('');

    const [loading, setLoading] = useState(false);
    const [imgSuccess, setImgSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const handleImageUpload = useCallback(async () => {
        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            setLoading(true);
            setImgSuccess(false);
            setUploadError(null);

            const response = await axios.post('https://api.imgbb.com/1/upload?key=031494b4ce79047904f947c745421438', formData);

            if (response.status === 200) {
                const data = response.data;
                setRImg(data.data.url);
                setImgSuccess(true);
            } else {
                setUploadError('Failed to upload image. Please try again.');
                setImgSuccess(false);
            }
        } catch (error) {
            setImgSuccess(false);
            setUploadError('Error uploading image. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [selectedImage]);

    const onFileChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    useEffect(() => {
        if (selectedImage !== '') {
            handleImageUpload();
        }
    }, [selectedImage, handleImageUpload]);

    const addReview = async (e) => {
        e.preventDefault();

        const reviewData = [{
            stars: rStars,
            email: rEmail,
            name: rName,
            title: rTitle,
            desc: rDesc,
            pname: slug,
            img: rImg,

            approved: false,
        }];

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/addreview`, reviewData);

            console.log('Review Added Successfully!');
            setRPopup(false);
        } catch (error) {
            console.log(error);
        }
    }

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const getReviewData = [
                    {
                        pn: slug
                    }
                ]

                const apiUrl = `${process.env.NEXT_PUBLIC_HOST}/api/getreviews?pn="${slug}"`;
                // const response = await axios.get(apiUrl, getReviewData);
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

    const approvedReviews = Object.keys(reviews).filter((k) => {
        if (reviews[k].approved === true) {
            return reviews[k]
        }
    }).map((k) => reviews[k])

    const reviewArr = Object.values(approvedReviews).map((review) => review.stars);
    const sumOfReviews = reviewArr.reduce((a, b) => a + b, 0);

    useEffect(() => {
        if (sumOfReviews > 0) {
            setReviewMean(sumOfReviews / reviewArr.length);
        }
    }, [sumOfReviews]);

    const calculateReviewCount = (rating) => reviewArr.filter((stars) => stars === rating).length;

    const percentageOfReviews = (rating) => {
        const reviewCount = calculateReviewCount(rating);
        return Math.round((reviewCount / reviewArr.length) * 100);
    };

    const ratingLabels = ['5', '4', '3', '2', '1'];

    const reviewImgArray = Object.keys(reviews).filter((k) => {
        if (reviews[k].approved === true) {
            return reviews[k]
        }
    }).map((k) => reviews[k].img);
    const reviewImgs = reviewImgArray.filter((img) => img !== ''); // Filter out empty strings

    const reviewImgArr = [];

    // Calculate the number of items to push based on every 3 images
    const itemsToPush = Math.ceil(reviewImgs.length / 3);

    for (let i = 0; i < itemsToPush; i++) {
        reviewImgArr.push(3 * reviewImgArr.length);
    }

    const renderStarsCustom = (count, size, color) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<div key={i}>
                <svg className={`${size} ${color}`}>  {/* text-[#E8C500] fill-[#ffd700] */}
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-star_dd"></use>
                </svg>
            </div>);
        }
        return stars;
    };

    const renderStarsCustomE = (count, size, color) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<div key={i}>
                <svg className={`${size} ${color}`}> {/* text-[#8c8c8c] */}
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-e-star_dd"></use>
                </svg>
            </div>);
        }
        return stars;
    };

    const renderReviewBar = (count, size) => {
        // count -> review number (5, 4, 3, 2, 1)
        // size -> size of yellow bar (w-1/3 or w-[33.33%]...)

        return (
            <div className="flex justify-center items-center w-full h-2.5 space-x-2">
                <div className="flex justify-start items-center w-auto h-full leading-none text-xs font-semibold">
                    {count}
                </div>

                <div className="relative flex justify-center items-center w-full h-full bg-[#e7e7e7] rounded-full overflow-hidden">
                    <div className={`absolute left-0 flex justify-start items-center h-full bg-[#e8c500] rounded-full`} style={{
                        width: size ? size : 0
                    }} />
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (sumOfReviews > 0) {
            setReviewMean(sumOfReviews / reviewArr.length);
        }
    }, [sumOfReviews]);


    // QTY SELECT POPUP
    const [qtySelectPop, setQtySelectPop] = useState(false);

    const [qtyValArr, setQtyValArr] = useState([]);

    if (qtyValArr.length < product?.availableQty) {
        let qty = 1;

        while (qty <= product?.availableQty) {
            qtyValArr.push(qty);

            qty++;
        }
    }

    const [productQty, setProductQty] = useState(1);


    // ADD TO CART
    const [cartLoading, setCartLoading] = useState(false);

    const [extrasToAdd, setExtrasToAdd] = useState(['', '']);

    const [addExtraToCart, setAddExtraToCart] = useState(false);
    const [addExtrasToCart, setAddExtrasToCart] = useState(false);

    const [buzzDateInput, setBuzzDateInput] = useState(false);

    const addProductToCart = (itemCode, url, qty, availableQty, price, img, name, offer, deliveryOptions) => {
        if ((
            finalDate === ''
            || finalDeliveryType == []
            || finalDeliveryTime === ''
            || finalDeliveryPrice === ''
        )) {
            setBuzzDateInput(true);
        }
        else {
            setCartLoading(true);

            setTimeout(() => {
                setCartLoading(false);

                addToCart(
                    itemCode,
                    url,
                    productQty,
                    availableQty,
                    price,
                    img,
                    name,
                    offer,
                    deliveryOptions
                );

                if (extrasToAdd != ['', ''] && (extrasToAdd[0] !== '' || extrasToAdd[1] !== '') && (extrasToAdd[0] === '' || extrasToAdd[1] === '')) {
                    setAddExtraToCart(true);
                } else if (extrasToAdd != ['', ''] && extrasToAdd[0] !== '' && extrasToAdd[1] !== '') {
                    setAddExtrasToCart(true);
                }
            }, 1000);
        }
    }

    useEffect(() => {
        if (addExtraToCart && extrasToAdd != ['', '']) {
            if (extrasToAdd.includes('vase') && !(JSON.stringify(cart)?.includes('special__vase'))) {
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
            else if (extrasToAdd.includes('double') && !(JSON.stringify(cart)?.includes('special__double'))) {
                addToCart(
                    'special__double',
                    'special__double',
                    1,
                    999,
                    349,
                    'https://i.ibb.co/3RTxMGR/x2-flowers.png',
                    'Double Flower Quantity',
                    '',
                );
            }
        }

        setAddExtraToCart(false);
    }, [addExtraToCart])

    useEffect(() => {
        if (addExtrasToCart && extrasToAdd.length > 0) {
            if (
                extrasToAdd.includes('vase') &&
                !(JSON.stringify(cart)?.includes('special__vase')) &&
                extrasToAdd.includes('double') &&
                !(JSON.stringify(cart)?.includes('special__double'))
            ) {
                addMultipleToCart(
                    [
                        'special__vase',
                        'special__vase',
                        1,
                        999,
                        199,
                        'https://i.ibb.co/QjvwMwP/image.png',
                        'Minimal Flower Vase',
                        ''
                    ],
                    [
                        'special__double',
                        'special__double',
                        1,
                        999,
                        349,
                        'https://i.ibb.co/3RTxMGR/x2-flowers.png',
                        'Double Flower Quantity',
                        ''
                    ],
                )
            }
        }

        setAddExtrasToCart(false);
    }, [addExtrasToCart])


    // SCROLL VALUE
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


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


    // DATE & TIME
    const [dateStepsDone, setDateStepsDone] = useState([false, false])
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState('');

    const [selectedDeliveryType, setSelectedDeliveryType] = useState([]);
    const [finalDeliveryType, setFinalDeliveryType] = useState([]);

    const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('');
    const [finalDeliveryTime, setFinalDeliveryTime] = useState('');

    const [finalDeliveryPrice, setFinalDeliveryPrice] = useState('');

    const onChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const currentDate = new Date();

    const tomorrow = new Date(currentDate)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const nextSixMonths = new Date();
    nextSixMonths.setMonth(nextSixMonths.getMonth() + 6);

    const timeOfDelivery = [
        {
            name: 'Express Delivery',
            id: 'express_delivery_1',
            type: [
                '09:00 - 12:00 hrs',
                '12:00 - 17:00 hrs',
                '16:00 - 21:00 hrs',
                '17:00 - 23:00 hrs',
            ],
            price: 19
        },
        {
            name: 'Morning Delivery',
            id: 'morning_delivery',
            type: [
                '08:00 - 10:00 hrs',
            ],
            price: 200
        },
        {
            name: 'Express Delivery',
            id: 'express_delivery_2',
            type: [
                '08:00 - 13:00 hrs',
                '12:00 - 15:00 hrs',
                '15:00 - 18:00 hrs',
                '18:00 - 21:00 hrs',
                '19:00 - 23:00 hrs',
            ],
            price: 49
        },
        {
            name: 'Fixed Time Delivery',
            id: 'fixed_time_delivery',
            type: [
                '10:00 - 11:00 hrs',
                '11:00 - 12:00 hrs',
                '12:00 - 13:00 hrs',
                '13:00 - 14:00 hrs',
                '14:00 - 15:00 hrs',
                '15:00 - 16:00 hrs',
                '16:00 - 17:00 hrs',
                '17:00 - 18:00 hrs',
                '18:00 - 19:00 hrs',
                '19:00 - 20:00 hrs',
                '20:00 - 21:00 hrs',
                '21:00 - 22:00 hrs',
            ],
            price: 200
        },
        {
            name: 'Pre-Midnight Delivery',
            id: 'pre_midnight_delivery',
            type: [
                '23:00 - 23:59 hrs',
            ],
            price: 249
        }
    ]

    const [showDeliveryType1, setShowDeliveryType1] = useState(false);
    const [showDeliveryType2, setShowDeliveryType2] = useState(false);
    const [showDeliveryType3, setShowDeliveryType3] = useState(false);
    const [showDeliveryType4, setShowDeliveryType4] = useState(false);
    const [showDeliveryType5, setShowDeliveryType5] = useState(false);

    const [selectedTomorrow, setSelectedTomorrow] = useState(currentDate);

    // UNCOMMENT LATER
    // useEffect(() => {
    //     const parsedDate = moment(currentDate);
    //     const hourOfDay = parsedDate.hour();

    //     if (hourOfDay >= 22) {
    //         setSelectedTomorrow(tomorrow);
    //     }
    // }, [])

    const currentHour = moment(currentDate).hour();

    useEffect(() => {
        const parsedDate = moment(finalDate);
        const hourOfDay = parsedDate.hour();
        const minutesOfDay = parsedDate.minutes();

        let roundedTime = parsedDate.format('hh:mm');

        console.log(roundedTime);

        if (hourOfDay <= 19) {
            setShowDeliveryType1(true);
        }
        if (hourOfDay <= 10) {
            setShowDeliveryType2(true);
        }
        if (hourOfDay <= 23) {
            setShowDeliveryType3(true);
        }
        if (hourOfDay <= 22) {
            setShowDeliveryType4(true);
        }
        if (hourOfDay < 24) {
            setShowDeliveryType5(true);
        }
        if (hourOfDay >= 20) {
            setSelectedTomorrow(tomorrow);
        }
    }, [finalDate, currentHour])

    useEffect(() => {
        if (
            finalDate === ''
            || finalDeliveryType == []
            || finalDeliveryTime === ''
            || finalDeliveryPrice === ''
        ) {
            setDateStepsDone([false, false]);
            setFinalDate('');
            setFinalDeliveryType([]);
            setFinalDeliveryTime('');
            setFinalDeliveryPrice('');
        }
    }, [isSelectDateOpen])


    // ADDRESS
    const [isAddressChooser, setIsAddressChooser] = useState(false)


    return (
        <>
            <div className="block justify-center items-center w-full h-full bg-white">
                <div className="block sm:block md:flex lg:flex xl:flex justify-center sm:justify-center md:justify-between lg:justify-between xl:justify-between items-start w-full h-full p-0 sm:p-0 md:px-16 lg:px-16 xl:px-16 py-6 pt-1 sm:pt-1 md:pt-6 lg:pt-6 xl:pt-6 bg-white overflow-hidden">
                    <div className="relative hidden sm:hidden md:flex lg:flex xl:flex justify-start items-center w-full h-full mb-6">
                        {!(product.title === undefined || product.title === '' || product.title === null || product.title == []) && <motion.div className="relative flex flex-col justify-center items-center size-[34rem] cursor-pointer rounded-lg overflow-hidden select-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Swiper
                                className="flex justify-center items-center w-[30rem] h-full bg-[#fafafa] rounded-lg overflow-hidden"
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                onSwiper={setSwiper}
                            >
                                {product.img1 && (
                                    <SwiperSlide className="flex justify-center items-center w-full h-full overflow-hidden">
                                        <ZoomImage
                                            className="flex justify-center items-center w-auto h-auto"
                                            src={product.img1}
                                            width={800}
                                            height={800}
                                            alt={product.title}
                                        />
                                    </SwiperSlide>
                                )}

                                {product.img2 && (
                                    <SwiperSlide className="flex justify-center items-center w-full h-full overflow-hidden">
                                        <ZoomImage
                                            className="flex justify-center items-center w-auto h-auto"
                                            src={product.img2}
                                            width={800}
                                            height={800}
                                            alt={product.title}
                                        />
                                    </SwiperSlide>
                                )}

                                {product.img3 && (
                                    <SwiperSlide className="flex justify-center items-center w-full h-full overflow-hidden">
                                        <ZoomImage
                                            className="flex justify-center items-center w-auto h-auto"
                                            src={product.img3}
                                            width={800}
                                            height={800}
                                            alt={product.title}
                                        />
                                    </SwiperSlide>
                                )}
                            </Swiper>

                            {/* Custom pagination */}
                            <div className="flex justify-center items-center w-auto pt-2 space-x-2 select-none bg-white">
                                {product.img1 && (
                                    <div className="flex justify-center items-center">
                                        <input
                                            className="absolute w-10 h-10 z-50 hidden cursor-pointer"
                                            type="radio"
                                            value="product_image_selector-img1"
                                            name="product_image_selector"
                                            id="product_image_selector-img1"
                                            onClick={() => handleRadioButtonClickSWIPER(0)}
                                        />

                                        <label
                                            htmlFor="product_image_selector-img1"
                                            className="relative flex justify-center items-center rounded-md cursor-pointer duration-75 focus:!outline-[0px]  product_image_selector-img1"
                                        >
                                            <Image
                                                className="flex justify-start items-center rounded-md"
                                                src={product.img1}
                                                width={60}
                                                height={60}
                                                alt={product.title}
                                            />
                                        </label>
                                    </div>
                                )}

                                {product.img2 && (
                                    <div className="flex justify-center items-center">
                                        <input
                                            className="absolute w-10 h-10 z-50 hidden cursor-pointer"
                                            type="radio"
                                            value="product_image_selector-img2"
                                            name="product_image_selector"
                                            id="product_image_selector-img2"
                                            onClick={() => handleRadioButtonClickSWIPER(1)}
                                        />

                                        <label
                                            htmlFor="product_image_selector-img2"
                                            className="relative flex justify-center items-center rounded-md cursor-pointer duration-75 focus:!outline-[0px]  product_image_selector-img2"
                                        >
                                            <Image
                                                className="flex justify-start items-center rounded-md"
                                                src={product.img2}
                                                width={60}
                                                height={60}
                                                alt={product.title}
                                            />
                                        </label>
                                    </div>
                                )}

                                {product.img3 && (
                                    <div className="flex justify-center items-center">
                                        <input
                                            className="absolute w-10 h-10 z-50 hidden cursor-pointer"
                                            type="radio"
                                            value="product_image_selector-img3"
                                            name="product_image_selector"
                                            id="product_image_selector-img3"
                                            onClick={() => handleRadioButtonClickSWIPER(2)}
                                        />

                                        <label
                                            htmlFor="product_image_selector-img3"
                                            className="relative flex justify-center items-center rounded-md cursor-pointer duration-75 focus:!outline-[0px]  product_image_selector-img3"
                                        >
                                            <Image
                                                className="flex justify-start items-center rounded-md"
                                                src={product.img3}
                                                width={60}
                                                height={60}
                                                alt={product.title}
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                        </motion.div>}

                        {(product.title === undefined || product.title === '' || product.title === null || product.title == []) && <div className="relative hidden sm:hidden md:flex lg:flex xl:flex justify-start items-center size-[32rem] cursor-pointer rounded-lg overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full rounded-lg overflow-hidden select-none">
                                <div className="relative flex justify-start items-center w-full h-full bg-[#f7f7f7] rounded-lg overflow-hidden">
                                    <div className="absolute flex justify-start items-center w-full h-full  c-skeleton" />
                                </div>
                            </div>
                        </div>}
                    </div>

                    {!(product.title === undefined || product.title === '' || product.title === null || product.title == []) && <div className="relative flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-center w-full h-auto">
                        <motion.div className="relative flex justify-center items-center w-auto h-auto cursor-pointer overflow-hidden select-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Splide className="flex justify-center items-center w-auto h-auto bg-[#f7f7f7] overflow-hidden"
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
                                <SplideTrack className="flex justify-center items-center w-full h-auto overflow-hidden">
                                    <SplideSlide className="flex justify-center items-center w-auto h-auto overflow-hidden">
                                        <Image className="flex justify-center items-center w-auto h-auto"
                                            src={product?.img1}
                                            width={1080}
                                            height={1080}
                                            alt={product?.title}
                                        />
                                    </SplideSlide>

                                    <SplideSlide className="flex justify-center items-center w-auto h-auto overflow-hidden">
                                        <Image className="flex justify-center items-center w-auto h-auto"
                                            src={product?.img2}
                                            width={1080}
                                            height={1080}
                                            alt={product?.title}
                                        />
                                    </SplideSlide>

                                    <SplideSlide className="flex justify-center items-center w-auto h-auto overflow-hidden">
                                        <Image className="flex justify-center items-center w-auto h-auto"
                                            src={product?.img3}
                                            width={1080}
                                            height={1080}
                                            alt={product?.title}
                                        />
                                    </SplideSlide>
                                </SplideTrack>
                            </Splide>

                            {/* Custom pagination */}
                            <div className="absolute bottom-0 left-0 flex justify-center items-center w-auto p-2 space-x-2 select-none bg-white rounded-tr-md">
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
                                        className="relative flex justify-center items-center rounded-md cursor-pointer duration-75 focus:!outline-[0px]  product_image_selector-img1"
                                    >
                                        {slug !== undefined && product?.img1 !== undefined ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ delay: 0.8 }}
                                            >
                                                <Image
                                                    className="flex justify-start items-center rounded-md"
                                                    src={product?.img1}
                                                    width={60}
                                                    height={60}
                                                    alt={product?.title}
                                                />
                                            </motion.div>
                                        ) : (
                                            <div className="w-[60px] h-[60px] bg-[#f7f7f7] rounded-md" />
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
                                        className="relative flex justify-center items-center rounded-md cursor-pointer duration-75 focus:!outline-[0px]  product_image_selector-img2"
                                    >
                                        {slug !== undefined && product?.img2 !== undefined ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ delay: 0.8 }}
                                            >
                                                <Image
                                                    className="flex justify-start items-center rounded-md"
                                                    src={product?.img2}
                                                    width={60}
                                                    height={60}
                                                    alt={product?.title}
                                                />
                                            </motion.div>
                                        ) : (
                                            <div className="w-[60px] h-[60px] bg-[#f7f7f7] rounded-md" />
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
                                        className="relative flex justify-center items-center rounded-md cursor-pointer duration-75 focus:!outline-[0px]  product_image_selector-img3"
                                    >
                                        {slug !== undefined && product?.img3 !== undefined ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ delay: 0.8 }}
                                            >
                                                <Image
                                                    className="flex justify-start items-center rounded-md"
                                                    src={product?.img3}
                                                    width={60}
                                                    height={60}
                                                    alt={product?.title}
                                                />
                                            </motion.div>
                                        ) : (
                                            <div className="w-[60px] h-[60px] bg-[#f7f7f7] rounded-md" />
                                        )}
                                    </label>
                                </div>}
                            </div>
                        </motion.div>
                    </div>}


                    {(product.title === undefined || product.title === '' || product.title === null || product.title == []) && <div className="relative block justify-start items-center w-full h-auto p-0 sm:p-0 md:p-4 lg:p-4 xl:p-4">
                        <div className="relative flex sm:flex md:hidden lg:hidden xl:hidden justify-start items-center w-full h-[360px] rounded-none sm:rounded-none md:rounded-md lg:rounded-md xl:rounded-md overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full bg-[#f7f7f7] rounded-none sm:rounded-none md:rounded-md lg:rounded-md xl:rounded-md overflow-hidden">
                                <div className="absolute flex justify-start items-center w-full h-full  c-skeleton" />
                            </div>
                        </div>

                        <div className="relative flex justify-start items-center w-1/4 h-8 sm:h-8 md:h-8 lg:h-8 xl:h-8 mt-4 sm:mt-4 md:mt-2 lg:mt-2 xl:mt-2 rounded-md overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full bg-[#f7f7f7] rounded-md overflow-hidden">
                                <div className="absolute flex justify-start items-center w-full h-full  c-skeleton" />
                            </div>
                        </div>

                        <div className="relative flex justify-start items-center w-full h-24 sm:h-24 md:h-20 lg:h-20 xl:h-20 mt-2 rounded-md overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full bg-[#f7f7f7] rounded-md overflow-hidden">
                                <div className="absolute flex justify-start items-center w-full h-full  c-skeleton" />
                            </div>
                        </div>

                        <div className="relative flex justify-start items-center w-1/2 h-14 mt-2 rounded-md overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full bg-[#f7f7f7] rounded-md overflow-hidden">
                                <div className="absolute flex justify-start items-center w-full h-full  c-skeleton" />
                            </div>
                        </div>

                        <div className="relative flex justify-start items-center w-full h-12 mt-4 rounded-md overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full bg-[#f7f7f7] rounded-md overflow-hidden">
                                <div className="absolute flex justify-start items-center w-full h-full  c-skeleton" />
                            </div>
                        </div>

                        <div className="relative flex justify-start items-center w-full h-24 mt-4 rounded-md overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full bg-[#f7f7f7] rounded-md overflow-hidden">
                                <div className="absolute flex justify-start items-center w-full h-full  c-skeleton" />
                            </div>
                        </div>

                        <div className="flex justify-start items-center w-full h-14 mt-2 rounded-md overflow-hidden space-x-2 sm:space-x-2 md:space-x-3 lg:space-x-3 xl:space-x-3">
                            <div className="relative flex justify-center items-center w-1/3 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 h-full rounded-md overflow-hidden select-none">
                                <div className="relative flex justify-center items-center w-full h-full bg-[#f7f7f7] rounded-md overflow-hidden">
                                    <div className="absolute flex justify-center items-center w-full h-full  c-skeleton" />
                                </div>
                            </div>

                            <div className="relative flex justify-center items-center w-2/3 sm:w-2/3 md:w-3/4 lg:w-3/4 xl:w-3/4 h-full rounded-md overflow-hidden select-none">
                                <div className="relative flex justify-center items-center w-full h-full bg-[#f7f7f7] rounded-md overflow-hidden">
                                    <div className="absolute flex justify-center items-center w-full h-full  c-skeleton" />
                                </div>
                            </div>
                        </div>
                    </div>}

                    {!(product.title === undefined || product.title === '' || product.title === null || product.title == []) && (
                        <motion.div className="relative flex justify-center items-start w-full h-full p-4 sm:p-4 md:p-0 lg:p-0 xl:p-0 text-[#191919]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="relative flex flex-col justify-start items-start w-full h-full">
                                <div className="flex justify-start items-center w-auto text-base font-medium text-[#494949] capitalize cursor-pointer leading-none">
                                    {product?.category}
                                </div>

                                <div className="flex justify-start items-center w-full mt-1 text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold capitalize">
                                    {product?.title}
                                </div>

                                <div className="flex justify-start items-center w-auto capitalize space-x-1.5 cursor-pointer">
                                    <div className="flex justify-center items-center w-auto">
                                        {renderStarsCustom(Math.round(reviewMean), 'w-[1.175rem] h-[1.175rem]', 'text-[#E8C500]')}
                                        {renderStarsCustomE((5 - Math.round(reviewMean)), 'w-[1.175rem] h-[1.175rem]', 'text-[#E8C500]')}
                                    </div>

                                    <div className="flex justify-center items-center w-auto text-[#494949] font-medium">
                                        {reviewMean.toFixed(1)} &#40;{approvedReviews.length}&#41;
                                    </div>
                                </div>

                                <div className="flex justify-start items-center w-full mt-2 text-[1.3rem] font-bold !leading-none">
                                    ₹{(product?.price)?.toFixed(2)}
                                </div>

                                <div className="flex flex-col justify-start items-center w-full mt-2 text-lg text-[#191919]">
                                    <div className="block justify-start items-start w-full space-y-3 select-none">
                                        {/* ADDITIONS */}
                                        <div className="flex justify-center items-center w-full h-auto pb-3 mb-3 border-b border-[#e5e5e5]">
                                            <div className="flex justify-between items-center w-full h-10 px-2 bg-[#eeeeee] hover:bg-[#e5e5e5] rounded-lg font-semibold text-base cursor-pointer">
                                                <div className="flex justify-start items-center w-auto">
                                                    Additions to this product
                                                </div>

                                                <div className="flex justify-end items-center w-auto">
                                                    <svg className="flex justify-center items-center size-5 -rotate-90" width={24} height={24}>
                                                        <use
                                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"
                                                        ></use>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* PINCODE & DATE TIME */}
                                        <div className="flex justify-center items-center w-full h-auto p-2 border border-[#e5e5e5] rounded-lg leading-none">
                                            <ul className="flex flex-col justify-start items-center w-full h-full space-y-2 text-base font-semibold">
                                                <li className="relative flex justify-center items-center w-full h-auto p-2 bg-[#eeeeee] hover:bg-[#e5e5e5] rounded-full overflow-hidden">
                                                    <button className="relative flex justify-center items-center w-full h-full cursor-pointer no-outline" onClick={() => setIsAddressChooser(!isAddressChooser)}>
                                                        {(
                                                            getCookie('user_address') === '' ||
                                                            getCookie('user_address') === undefined ||
                                                            getCookie('user_address') === null
                                                        ) ? (
                                                            <div className="flex justify-between items-center w-full h-full px-1 space-x-1 font-semibold cursor-pointer">
                                                                <div className="flex justify-start items-center size-4">
                                                                    <svg className="flex justify-center items-center size-4" width={16} height={16}>
                                                                        <use
                                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd"
                                                                        ></use>
                                                                    </svg>
                                                                </div>

                                                                <div className="flex justify-start items-center w-full">
                                                                    Enter delivery address
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex justify-start items-center w-full h-full px-2 font-semibold space-x-1 cursor-pointer" title={getCookie('user_address')}>
                                                                <svg className="flex justify-center items-center size-4" width={16} height={16}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd"
                                                                    ></use>
                                                                </svg>

                                                                <div className="flex flex-col justify-start items-center w-full text-left">
                                                                    <div className="flex justify-start items-center w-full font-bold text-sm !leading-none">
                                                                        <p className="pr-3 line-clamp-1">
                                                                            {getCookie('user_address')}
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex justify-start items-center w-full mt-1 text-xs font-medium underline text-[#494949] !leading-none cursor-pointer">
                                                                        Change your delivery address
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </button>
                                                </li>

                                                <li className="relative block items-center w-full h-auto p-2 bg-[#eeeeee] hover:bg-[#e5e5e5] rounded-full overflow-hidden">
                                                    {buzzDateInput && <div className="flex justify-start items-center w-full mb-1 text-xs leading-none text-[#ad2314]">
                                                        required *
                                                    </div>}

                                                    <div className="flex justify-between items-center w-full h-full leading-none">
                                                        <div className={`
                                                            flex justify-between items-center w-full h-full px-1 space-x-1 font-semibold cursor-pointer
                                                            ${buzzDateInput && 'border-[#ad2314]'}
                                                            `}>
                                                            <div className="flex justify-start items-center size-5">
                                                                <svg className="flex justify-center items-center size-5" width={16} height={16}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-clock_dd"
                                                                    ></use>
                                                                </svg>
                                                            </div>

                                                            {(
                                                                finalDate === ''
                                                                || finalDeliveryType == []
                                                                || finalDeliveryTime === ''
                                                                || finalDeliveryPrice === ''
                                                            ) ? (
                                                                <div className="flex justify-start items-center w-full h-auto pl-1 font-medium appearance-none no-outline cursor-pointer" onClick={() => setIsSelectDateOpen(true)}>
                                                                    Date & Time
                                                                </div>
                                                            ) : (
                                                                <div className="flex justify-between items-center w-full h-full pl-1 font-medium appearance-none no-outline cursor-pointer" onClick={() => setIsSelectDateOpen(true)}>
                                                                    <div className="block items-center space-y-1">
                                                                        <p className="text-sm text-[#494949] !leading-none">
                                                                            {moment(finalDate).format('DD')} {moment(finalDate).format('MMM')} {JSON.stringify(finalDeliveryType)?.replaceAll('"', '')?.split(',')[1]}: <span className="font-semibold">₹{finalDeliveryPrice}</span>
                                                                        </p>
                                                                        <p className="text-[#191919] !leading-none">
                                                                            {moment(finalDate).format('ddd')} {finalDeliveryTime}
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex justify-center items-center size-5" onClick={() => {
                                                                        setDateStepsDone([false, false]);
                                                                        setFinalDate('');
                                                                        setFinalDeliveryType([]);
                                                                        setFinalDeliveryTime('');
                                                                        setFinalDeliveryPrice('');
                                                                    }}>
                                                                        <svg className="flex justify-center items-center size-5 text-[#191919]" width={20} height={20}>
                                                                            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"></use>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>


                                {/* ADD TO CART */}
                                <motion.div className="flex flex-col justify-start items-center w-full h-auto mt-2 text-lg text-[#191919]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <div className="flex justify-start items-center w-full h-12 space-x-2 select-none">
                                        <div className="relative flex justify-start items-center w-[28%] sm:w-[28%] md:w-[20%] lg:w-[20%] xl:w-[20%] h-full cursor-pointer">
                                            <button className="flex justify-between items-center w-full h-full px-2.5 space-x-1.5 bg-white hover:bg-[#f7f7f7] active:bg-[#f0f0f0] border border-[#767676] rounded-md  cursor-pointer"
                                                onClick={() => setQtySelectPop(!qtySelectPop)}
                                            >
                                                <div className="flex justify-start items-center w-full font-normal"> Qty </div>

                                                <div className="flex justify-center items-center w-full font-bold"> {productQty} </div>

                                                <div className="flex justify-end items-center w-full pointer-events-none">
                                                    <svg className="" width={24} height={24}>
                                                        <use
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"
                                                        ></use>
                                                    </svg>
                                                </div>
                                            </button>

                                            {qtySelectPop && <div className="absolute z-[800] bottom-0 flex flex-col justify-start items-center w-auto h-auto space-y-1 mb-14 bg-white rounded border border-[#767676] overflow-hidden">
                                                {qtyValArr.map((qty, index) => <button key={index} className="flex justify-center items-center w-full h-auto px-6 py-2 leading-none bg-white hover:bg-[#f7f7f7] active:bg-[#f0f0f0] no-outline duration-75" onClick={() => {
                                                    setProductQty(qty);
                                                    setQtySelectPop(false);
                                                }}>
                                                    {qty}
                                                </button>)}
                                            </div>}
                                        </div>

                                        <div className="flex justify-start items-center w-[72%] sm:w-[72%] md:w-[80%] lg:w-[80%] xl:w-[80%] h-full">
                                            {!cartLoading ? <button className="flex justify-center items-center w-full h-full bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] text-white font-semibold rounded-md duration-75"
                                                onClick={() => addProductToCart(
                                                    product.slug,
                                                    product.slug,
                                                    1,
                                                    product.availableQty,
                                                    product.price,
                                                    product.dimg,
                                                    product.title,
                                                    product.offer,
                                                    {
                                                        date: finalDate,
                                                        type: finalDeliveryType,
                                                        time: finalDeliveryTime,
                                                        price: finalDeliveryPrice,
                                                    }
                                                )}>
                                                <div>
                                                    Add {productQty} to cart • ₹{product.price * productQty}
                                                </div>
                                            </button> : <button className="flex justify-center items-center w-full h-full bg-[#085b45] text-white font-semibold rounded-md duration-75">
                                                <svg className="animate-[spin_600ms_linear_infinite]" width={16} height={16}>
                                                    <use
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                    ></use>
                                                </svg>
                                            </button>}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* ADD TO CART - MOBILE */}
                                {/* <AnimatePresence>
                                    {(scrollY >= 200) && <motion.div className="fixed z-[100] left-0 bottom-0 flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-center w-full h-16 px-2 bg-white border-t border-[#e5e5e5]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: 0.8 }}
                                            className="flex justify-center items-center w-full h-full text-lg text-[#191919]"
                                        >
                                            <div className="flex justify-center items-center w-full h-12 space-x-2 select-none">
                                                <div className="relative flex justify-center items-center w-[28%] h-full cursor-pointer">
                                                    <button className="flex justify-between items-center w-full h-full px-2 space-x-1 bg-white hover:bg-[#f7f7f7] active:bg-[#f0f0f0] border border-[#767676] rounded-md  cursor-pointer"
                                                        onClick={() => setQtySelectPop(!qtySelectPop)}
                                                    >
                                                        <div className="flex justify-start items-center w-full font-normal"> Qty </div>

                                                        <div className="flex justify-center items-center w-full font-bold"> {productQty} </div>

                                                        <div className="flex justify-end items-center w-full pointer-events-none">
                                                            <svg className="" width={24} height={24}>
                                                                <use
                                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-chevron_dd"
                                                                ></use>
                                                            </svg>
                                                        </div>
                                                    </button>

                                                    {qtySelectPop && <div className="absolute z-[800] bottom-0 flex flex-col justify-start items-center w-full h-auto p-1 space-y-1 mb-14 bg-white rounded border border-[#767676] overflow-hidden">
                                                        {qtyValArr.map((qty, index) => <button key={index} className="flex justify-center items-center w-full h-auto py-2 leading-none bg-white hover:bg-[#f7f7f7] active:bg-[#f0f0f0] rounded border border-white active:border-[#c0c0c0] no-outline duration-75 transition-[border]" onClick={() => {
                                                            setProductQty(qty);
                                                            setQtySelectPop(false);
                                                        }}>
                                                            {qty}
                                                        </button>)}
                                                    </div>}
                                                </div>

                                                <div className="flex justify-center items-center w-[72%] h-full">
                                                    {!cartLoading ? <button className="flex justify-center items-center w-full h-full bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] text-white font-semibold rounded-md duration-75"
                                                        onClick={() => addProductToCart(
                                                            product.slug,
                                                            product.slug,
                                                            1,
                                                            product.availableQty,
                                                            product.price,
                                                            product.dimg,
                                                            product.title,
                                                            product.offer,
                                                            {
                                                                date: finalDate,
                                                                type: finalDeliveryType,
                                                                time: finalDeliveryTime,
                                                                price: finalDeliveryPrice,
                                                            }
                                                        )}>
                                                        <div>
                                                            Add {productQty} to cart • ₹{product.price * productQty}
                                                        </div>
                                                    </button> : <button className="flex justify-center items-center w-full h-full bg-[#085b45] text-white font-semibold rounded-md duration-75">
                                                        <svg className="animate-[spin_600ms_linear_infinite]" width={16} height={16}>
                                                            <use
                                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                            ></use>
                                                        </svg>
                                                    </button>}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>}
                                </AnimatePresence> */}
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="flex justify-start items-center w-full h-2 sm:h-2 md:h-1 lg:h-1 xl:h-1 border-y border-[#e5e5e5] bg-[#f7f7f7]" />

                <div className="block w-full h-auto p-4 sm:p-4 md:p-8 lg:p-8 xl:p-8 pb-20">
                    <div className="flex flex-col justify-start items-center w-full">
                        <div className="flex justify-start items-center w-full text-xl font-bold text-[#191919] select-none">
                            Reviews & Ratings
                        </div>

                        <div className="block sm:block md:flex lg:flex xl:flex justify-center items-start w-full h-full mt-2 space-x-0 sm:space-x-0 md:space-x-4 lg:space-x-4 xl:space-x-4 space-y-4 sm:space-y-4 md:space-y-0 lg:space-y-0 xl:space-y-0">
                            <div className="flex flex-col justify-start items-start w-full sm:w-full md:w-3/5 lg:w-3/5 xl:w-3/5 h-full bg-white border border-[#e5e5e5] rounded-lg text-[#191919] overflow-hidden">
                                <div className={`
                                    flex justify-center items-center w-full h-auto ${approvedReviews.length > 0 ? 'border-b' : 'border-b-0'} border-[#e5e5e5]
                                `}>
                                    <div className="flex flex-col justify-center items-center w-[38%] sm:w-[38%] md:w-[32%] lg:w-[32%] xl:w-[32%] h-full p-2 py-4 space-y-2">
                                        <div className="flex justify-center items-center w-full h-full text-4xl font-bold leading-none">
                                            {reviewMean.toFixed(1)}
                                        </div>

                                        <div className="flex justify-center items-center w-full h-full">
                                            <div className="flex justify-center items-center w-auto">
                                                {renderStarsCustom(Math.round(reviewMean), 'w-[1.175rem] h-[1.175rem]', 'text-[#E8C500]')}
                                                {renderStarsCustomE((5 - Math.round(reviewMean)), 'w-[1.175rem] h-[1.175rem]', 'text-[#E8C500]')}
                                            </div>
                                        </div>

                                        <div className="flex justify-center items-center w-full h-full text-sm font-normal leading-none text-[#292929]">
                                            {approvedReviews.length}+ reviews
                                        </div>
                                    </div>

                                    <div className="flex justify-start items-center w-[62%] sm:w-[62%] md:w-[68%] lg:w-[68%] xl:w-[68%] h-full py-2 pl-0 pr-3 select-none">
                                        <div className="flex flex-col justify-start items-center w-full h-full space-y-2.5">
                                            {renderReviewBar(5, percentageOfReviews(5))}
                                            {renderReviewBar(4, percentageOfReviews(4))}
                                            {renderReviewBar(3, percentageOfReviews(3))}
                                            {renderReviewBar(2, percentageOfReviews(2))}
                                            {renderReviewBar(1, percentageOfReviews(1))}
                                        </div>
                                    </div>
                                </div>

                                <div className={`
                                    flex flex-col justify-start items-start w-full ${approvedReviews.length > 0 ? 'h-full max-h-[24.7rem]' : 'h-auto'} overflow-y-auto select-none space-y-2 sm:space-y-2 md:space-y-0 lg:space-y-0 xl:space-y-2
                                `}>
                                    {approvedReviews.map((review) => {
                                        return <div key={review._id} className="flex justify-start items-start w-full h-auto p-2 bg-white hover:bg-[#f7f7f7] no-outline space-x-2">
                                            <div className="flex justify-start items-start w-20 h-full rounded-md overflow-hidden">
                                                <Image className="flex justify-center items-start w-16 h-16 rounded-md overflow-hidden"
                                                    src={review.img}
                                                    width={100}
                                                    height={100}
                                                    alt={review.title}
                                                />
                                            </div>

                                            <div className="flex flex-col justify-start items-start w-full h-auto no-outline space-y-2">
                                                <div className="flex flex-col justify-start items-center w-full h-auto text-left leading-snug">
                                                    <div className="flex justify-start items-center w-full">
                                                        <p className="pb-1 text-[#191919] font-medium sm:font-medium md:font-semibold lg:font-semibold xl:font-semibold leading-none">
                                                            {review.title}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-start items-center w-full">
                                                        <p className="line-clamp-2 text-ellipsis text-[#767676] font-normal sm:font-normal md:font-medium lg:font-medium xl:font-medium">
                                                            &#34;{review.desc}&#34;
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex justify-start items-center w-full h-auto">
                                                    <div className="flex justify-start items-center w-auto space-x-1">
                                                        <div className="flex justify-center items-center w-auto">
                                                            {renderStarsCustom(Math.round(review.stars), 'w-3.5 h-3.5', 'text-[#494949]')}
                                                            {renderStarsCustomE((5 - Math.round(review.stars)), 'w-3.5 h-3.5', 'text-[#494949]')}
                                                        </div>

                                                        <div className="flex justify-start items-center w-auto text-[#767676]">
                                                            <div className="flex justify-start items-center w-auto font-medium text-sm">
                                                                {review.name} • {moment(review.createdAt).format('DD, MMM YYYY')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>

                            {/* POST REVIEW */}
                            {false && <div className="flex flex-col justify-start items-start w-full sm:w-full md:w-2/5 lg:w-2/5 xl:w-2/5 h-full bg-white border border-[#e5e5e5] rounded-lg text-[#191919] overflow-hidden">
                                <div className="flex justify-start items-center w-full p-2 border-b border-[#e5e5e5] text-base font-semibold text-[#191919] select-none">
                                    Post Review
                                </div>

                                <form className="block justify-start items-center w-full h-full space-y-5 p-2" onSubmit={addReview}>
                                    <div className="flex justify-between items-center w-full h-auto leading-none text-base font-medium text-[#191919]">
                                        {/* IMAGE UPLOAD */}
                                        <div className="flex justify-start items-center w-full h-auto">
                                            <div className="flex justify-start items-center w-auto h-full no-outline">
                                                {loading && <div>Loading...</div>}

                                                {selectedImage === '' && (
                                                    <>
                                                        <label htmlFor="r_image" className="flex justify-center items-center w-auto h-full px-3 py-2 text-sm border border-[#e5e5e5] bg-white hover:bg-[#f7f7f7] rounded-full space-x-1 cursor-pointer select-none no-outline">
                                                            <svg className="flex justify-center items-center w-4 h-4" strokeWidth={1.5} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                            </svg>
                                                            <div> Upload Image </div>
                                                        </label>
                                                        <input id="r_image" type="file" accept="image/*" onChange={onFileChange} className="absolute opacity-0 pointer-events-none outline-none" />
                                                    </>
                                                )}

                                                {imgSuccess && selectedImage !== '' && (
                                                    <div className="flex justify-center items-center w-auto h-full p-1 pr-2 text-sm border border-[#e5e5e5] bg-white hover:bg-[#f7f7f7] rounded-full space-x-1 cursor-pointer select-none overflow-hidden">
                                                        <div className="flex justify-center items-center w-8 h-8 rounded-l-full rounded-lg overflow-hidden">
                                                            <Image className="flex justify-center items-center w-full h-full rounded-l-full rounded-lg overflow-hidden"
                                                                src={rImg}
                                                                width={100}
                                                                height={100}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="flex justify-center items-center w-auto h-full">
                                                            Image uploaded.
                                                        </div>
                                                        <div className="flex justify-center items-center w-6 h-6" onClick={() => { setRImg(''); setSelectedImage(''); }}>
                                                            <svg className="flex justify-center items-center w-4 h-4 fill-none">
                                                                <use xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"></use>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}

                                                {uploadError && <div>{uploadError}</div>}
                                            </div>
                                        </div>

                                        {/* STARTS */}
                                        <div className="flex justify-end items-center w-full h-auto">
                                            <div className="flex justify-end items-center w-full">
                                                <div className="flex justify-center items-center w-auto no-outline" onClick={() => setRStars(1)}>
                                                    {rStars >= 1 ?
                                                        renderStarsCustom(1, 'w-6 h-6', 'text-[#E8C500]')
                                                        :
                                                        renderStarsCustomE(1, 'w-6 h-6', 'text-[#767676]')
                                                    }
                                                </div>
                                                <div className="flex justify-center items-center w-auto no-outline" onClick={() => setRStars(2)}>
                                                    {rStars >= 2 ?
                                                        renderStarsCustom(1, 'w-6 h-6', 'text-[#E8C500]')
                                                        :
                                                        renderStarsCustomE(1, 'w-6 h-6', 'text-[#767676]')
                                                    }
                                                </div>
                                                <div className="flex justify-center items-center w-auto no-outline" onClick={() => setRStars(3)}>
                                                    {rStars >= 3 ?
                                                        renderStarsCustom(1, 'w-6 h-6', 'text-[#E8C500]')
                                                        :
                                                        renderStarsCustomE(1, 'w-6 h-6', 'text-[#767676]')
                                                    }
                                                </div>
                                                <div className="flex justify-center items-center w-auto no-outline" onClick={() => setRStars(4)}>
                                                    {rStars >= 4 ?
                                                        renderStarsCustom(1, 'w-6 h-6', 'text-[#E8C500]')
                                                        :
                                                        renderStarsCustomE(1, 'w-6 h-6', 'text-[#767676]')
                                                    }
                                                </div>
                                                <div className="flex justify-center items-center w-auto no-outline" onClick={() => setRStars(5)}>
                                                    {rStars >= 5 ?
                                                        renderStarsCustom(1, 'w-6 h-6', 'text-[#E8C500]')
                                                        :
                                                        renderStarsCustomE(1, 'w-6 h-6', 'text-[#767676]')
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex justify-start items-center w-full h-auto leading-none text-base font-medium">
                                        <InputField
                                            name={'add_review-name'}
                                            type={'text'}
                                            placeholder={'Full Name'}
                                            change={[rName, setRName]}
                                        />
                                    </div>

                                    <div className="flex justify-start items-center w-full h-auto leading-none text-base font-medium">
                                        <InputField
                                            name={'add_review-email'}
                                            type={'email'}
                                            placeholder={'Email Address'}
                                            change={[rEmail, setREmail]}
                                        />
                                    </div>

                                    <div className="flex justify-start items-center w-full h-auto leading-none text-base font-medium">
                                        <InputField
                                            name={'add_review-title'}
                                            type={'text'}
                                            placeholder={'Title'}
                                            change={[rTitle, setRTitle]}
                                        />
                                    </div>

                                    <div className="flex justify-start items-center w-full h-auto leading-none text-base font-medium">
                                        <InputField
                                            name={'add_review-desc'}
                                            type={'text'}
                                            placeholder={'Description'}
                                            change={[rDesc, setRDesc]}
                                        />
                                    </div>


                                    <div className="flex flex-col justify-start items-end w-full h-12 select-none">
                                        {(!(
                                            rEmail === '' &&
                                            rEmail.length === 0 &&
                                            rTitle === '' &&
                                            rTitle.length === 0 &&
                                            rDesc === '' &&
                                            rDesc.length === 0 &&
                                            rName === '' &&
                                            rName.length === 0 &&
                                            rStars <= 0 &&
                                            !rEmail.includes('@')
                                        )
                                        ) ? <div className="flex justify-start items-center w-full h-full leading-none text-xl sm:text-xl md:text-base lg:text-base xl:text-base font-semibold">
                                            <button className="flex justify-center items-center w-full h-full px-4 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] rounded-full text-white font-bold duration-75" type="submit">
                                                Post your review
                                            </button>
                                        </div>
                                            :
                                            <div className="flex justify-start items-center w-full h-full leading-none text-xl sm:text-xl md:text-base lg:text-base xl:text-base font-semibold">
                                                <button className="flex justify-center items-center w-full h-full px-4 bg-[#085b45] rounded-full text-white font-bold saturate-0 opacity-40" type="button">
                                                    Post your review
                                                </button>
                                            </div>}
                                    </div>
                                </form>
                            </div>}

                            {/* DESCRIPTION */}
                            <div className="flex flex-col justify-start items-start w-full sm:w-full md:w-2/5 lg:w-2/5 xl:w-2/5 h-full bg-white border border-[#e5e5e5] rounded-lg text-[#191919] overflow-hidden">
                                <div className="flex justify-start items-center w-full p-2.5 text-xl font-bold text-[#191919] select-none leading-none border-b border-[#e5e5e5]">
                                    Description
                                </div>

                                <div className="block justify-center items-start w-full h-[16rem] px-2.5 py-2 overflow-y-auto">
                                    <div className="flex flex-col justify-start items-start w-full h-full text-[#292929]">
                                        <p className="text-justify">
                                            {product.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <SelectLocation isAddressChooser={isAddressChooser} setIsAddressChooser={setIsAddressChooser} />


            {/* SELECT DATE */}
            <AnimatePresence>
                {isSelectDateOpen && (
                    <motion.div className="fixed top-0 left-0 flex justify-center items-center w-full h-full px-4 sm:px-4 md:px-0 lg:px-0 xl:px-0 z-[600] text-[#292929] select-none"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                    >
                        <div className="absolute z-[100] flex justify-center items-center w-full h-full bg-black/20" onClick={() => setIsSelectDateOpen(false)} />

                        <div className="relative z-[200] flex justify-center items-center w-full h-auto max-w-md p-4 bg-white rounded-lg border-[1.5px] border-[#e5e5e5]">
                            {dateStepsDone[0] === false && <div className="flex flex-col justify-center items-center w-full h-full">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex justify-start items-center w-auto leading-none text-lg font-semibold">
                                        Choose delivery date
                                    </div>

                                    <button className="flex justify-end items-center w-5 h-5 cursor-pointer no-outline" onClick={() => setIsSelectDateOpen(false)}>
                                        <svg className="text-[#191919]" width={20} height={20}>
                                            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"></use>
                                        </svg>
                                    </button>
                                </div>


                                <div className="flex justify-center items-center w-full h-full mt-4 border border-[#e5e5e5] rounded-lg overflow-hidden">
                                    <Calendar
                                        onChange={onChange}
                                        value={selectedDate}
                                        minDate={selectedTomorrow}
                                        maxDate={nextSixMonths}
                                    />
                                </div>

                                <div className="flex justify-center items-center w-full h-14 mt-3 pt-3 border-t border-[#e5e5e5]">
                                    <button className="flex justify-center items-center w-full h-full px-4 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] rounded-full text-white font-bold duration-75" onClick={() => {
                                        setDateStepsDone([true, false]);
                                        setFinalDate(selectedDate)
                                    }}>
                                        Continue to delivery time
                                    </button>
                                </div>
                            </div>}

                            {(dateStepsDone[0] === true && dateStepsDone[1] !== true) && <div className="flex flex-col justify-center items-center w-full h-full">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex justify-start items-center w-auto">
                                        <div className="flex justify-center items-center w-auto h-full">
                                            <button className="flex justify-start items-center w-8 h-8 text-[#494949] bg-white no-outline" onClick={() => {
                                                setDateStepsDone([false, false]);
                                                setSelectedDeliveryType([]);
                                            }}>
                                                <svg className="flex justify-start items-center w-5 h-8" width={24} height={24} strokeWidth={2}
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex justify-start items-center w-full leading-none text-lg font-semibold">
                                            Choose delivery type
                                        </div>
                                    </div>

                                    <button className="flex justify-end items-center w-5 h-5 cursor-pointer no-outline" onClick={() => setIsSelectDateOpen(false)}>
                                        <svg className="text-[#191919]" width={20} height={20}>
                                            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"></use>
                                        </svg>
                                    </button>
                                </div>


                                <div className="flex justify-center items-center w-full h-full mt-4">
                                    <ul className="flex flex-col justify-center items-start w-full h-auto space-y-4">
                                        {showDeliveryType1 && <li className="flex justify-between items-center w-full">
                                            <label className="relative flex justify-start items-center w-full p-2 px-2.5 bg-white hover:bg-[#f7f7f7] rounded-md border border-[#e5e5e5] cursor-pointer" htmlFor={'express_delivery_1'}>
                                                <div className="flex justify-start items-center w-[80%] h-full">
                                                    <input className="flex justify-start items-center w-4 h-4 no-outline"
                                                        type="radio"
                                                        name="type_option"
                                                        id={'express_delivery_1'}
                                                        value={['express_delivery_1', 'Express Delivery']}
                                                        checked={selectedDeliveryType == ['express_delivery_1', 'Express Delivery']}
                                                        onChange={(e) => {
                                                            setSelectedDeliveryType(e.target.value)
                                                        }}
                                                    />

                                                    <div className="flex flex-col justify-start items-center w-full h-full ml-2">
                                                        <div className="flex justify-start items-center w-full h-full font-semibold">
                                                            Express Delivery
                                                        </div>
                                                        <div className="flex justify-start items-center w-full h-full text-[#767676] font-medium text-sm">
                                                            Choose from any 5-hour slot during the day
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end items-center w-[20%] px-2 text-base font-semibold leading-none text-[#767676]">
                                                    ₹19
                                                </div>
                                            </label>
                                        </li>}

                                        {showDeliveryType2 && <li className="flex justify-between items-center w-full">
                                            <label className="relative flex justify-start items-center w-full p-2 px-2.5 bg-white hover:bg-[#f7f7f7] rounded-md border border-[#e5e5e5] cursor-pointer" htmlFor={'morning_delivery'}>
                                                <div className="flex justify-start items-center w-[80%] h-full">
                                                    <input className="flex justify-start items-center w-4 h-4 no-outline"
                                                        type="radio"
                                                        name="type_option"
                                                        id={'morning_delivery'}
                                                        value={['morning_delivery', 'Morning Delivery']}
                                                        checked={selectedDeliveryType == ['morning_delivery', 'Morning Delivery']}
                                                        onChange={(e) => {
                                                            setSelectedDeliveryType(e.target.value)
                                                        }}
                                                    />

                                                    <div className="flex flex-col justify-start items-center w-full h-full ml-2">
                                                        <div className="flex justify-start items-center w-full h-full font-semibold">
                                                            Morning Delivery
                                                        </div>
                                                        <div className="flex justify-start items-center w-full h-full text-[#767676] font-medium text-sm">
                                                            Your gift is delivered between 08:00 - 10:00 AM
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end items-center w-[20%] px-2 text-base font-semibold leading-none text-[#767676]">
                                                    ₹200
                                                </div>
                                            </label>
                                        </li>}

                                        {showDeliveryType3 && <li className="flex justify-between items-center w-full">
                                            <label className="relative flex justify-start items-center w-full p-2 px-2.5 bg-white hover:bg-[#f7f7f7] rounded-md border border-[#e5e5e5] cursor-pointer" htmlFor={'express_delivery_2'}>
                                                <div className="flex justify-start items-center w-[80%] h-full">
                                                    <input className="flex justify-start items-center w-4 h-4 no-outline"
                                                        type="radio"
                                                        name="type_option"
                                                        id={'express_delivery_2'}
                                                        value={['express_delivery_2', 'Express Delivery']}
                                                        checked={selectedDeliveryType == ['express_delivery_2', 'Express Delivery']}
                                                        onChange={(e) => {
                                                            setSelectedDeliveryType(e.target.value)
                                                        }}
                                                    />

                                                    <div className="flex flex-col justify-start items-center w-full h-full ml-2">
                                                        <div className="flex justify-start items-center w-full h-full font-semibold">
                                                            Express Delivery
                                                        </div>
                                                        <div className="flex justify-start items-center w-full h-full text-[#767676] font-medium text-sm">
                                                            Choose from any 3-hour slot during the day
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end items-center w-[20%] px-2 text-base font-semibold leading-none text-[#767676]">
                                                    ₹49
                                                </div>
                                            </label>
                                        </li>}

                                        {showDeliveryType4 && <li className="flex justify-between items-center w-full">
                                            <label className="relative flex justify-start items-center w-full p-2 px-2.5 bg-white hover:bg-[#f7f7f7] rounded-md border border-[#e5e5e5] cursor-pointer" htmlFor={'fixed_time_delivery'}>
                                                <div className="flex justify-start items-center w-[80%] h-full">
                                                    <input className="flex justify-start items-center w-4 h-4 no-outline"
                                                        type="radio"
                                                        name="type_option"
                                                        id={'fixed_time_delivery'}
                                                        value={['fixed_time_delivery', 'Fixed Time Delivery']}
                                                        checked={selectedDeliveryType == ['fixed_time_delivery', 'Fixed Time Delivery']}
                                                        onChange={(e) => {
                                                            setSelectedDeliveryType(e.target.value)
                                                        }}
                                                    />

                                                    <div className="flex flex-col justify-start items-center w-full h-full ml-2">
                                                        <div className="flex justify-start items-center w-full h-full font-semibold">
                                                            Fixed Time Delivery
                                                        </div>
                                                        <div className="flex justify-start items-center w-full h-full text-[#767676] font-medium text-sm">
                                                            Choose from any 1-hour slot
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end items-center w-[20%] px-2 text-base font-semibold leading-none text-[#767676]">
                                                    ₹200
                                                </div>
                                            </label>
                                        </li>}

                                        {showDeliveryType5 && <li className="flex justify-between items-center w-full">
                                            <label className="relative flex justify-start items-center w-full p-2 px-2.5 bg-white hover:bg-[#f7f7f7] rounded-md border border-[#e5e5e5] cursor-pointer" htmlFor={'pre_midnight_delivery'}>
                                                <div className="flex justify-start items-center w-[80%] h-full">
                                                    <input className="flex justify-start items-center w-4 h-4 no-outline"
                                                        type="radio"
                                                        name="type_option"
                                                        id={'pre_midnight_delivery'}
                                                        value={['pre_midnight_delivery', 'Pre-Midnight Delivery']}
                                                        checked={selectedDeliveryType == ['pre_midnight_delivery', 'Pre-Midnight Delivery']}
                                                        onChange={(e) => {
                                                            setSelectedDeliveryType(e.target.value)
                                                        }}
                                                    />

                                                    <div className="flex flex-col justify-start items-center w-full h-full ml-2">
                                                        <div className="flex justify-start items-center w-full h-full font-semibold">
                                                            Pre-Midnight Delivery
                                                        </div>
                                                        <div className="flex justify-start items-center w-full h-full text-[#767676] font-medium text-sm">
                                                            Gift will be delivered any time between 10:00 PM-11:59 PM
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end items-center w-[20%] px-2 text-base font-semibold leading-none text-[#767676]">
                                                    ₹249
                                                </div>
                                            </label>
                                        </li>}
                                    </ul>
                                </div>

                                <div className="flex justify-center items-center w-full h-14 mt-3 pt-3 border-t border-[#e5e5e5]">
                                    {(selectedDeliveryType.length !== 0) ? <button className="flex justify-center items-center w-full h-full px-4 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] rounded-full text-white font-bold duration-75" onClick={() => {
                                        setDateStepsDone([true, true]);
                                        setFinalDeliveryType(selectedDeliveryType);
                                    }}>
                                        Continue to delivery time
                                    </button>
                                        :
                                        <div className="flex justify-center items-center w-full h-full px-4 bg-[#085b45] saturate-0 opacity-40 rounded-full text-white font-bold">
                                            Continue to delivery time
                                        </div>
                                    }
                                </div>
                            </div>}

                            {dateStepsDone[1] === true && <div className="flex flex-col justify-center w-full h-full">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex justify-start items-center w-auto">
                                        <div className="flex justify-start items-center w-auto h-full">
                                            <button className="flex justify-start items-center w-8 h-8 text-[#494949] bg-white no-outline" onClick={() => {
                                                setDateStepsDone([true, false]);
                                                setSelectedDeliveryTime('');
                                            }}>
                                                <svg className="flex justify-start items-center w-5 h-8" width={24} height={24} strokeWidth={2}
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex flex-col justify-start items-center w-full leading-none text-lg font-semibold">
                                            <div className="flex justify-start items-center w-full leading-none"> Choose delivery time </div>

                                            <div className="flex justify-start items-center w-full text-sm text-[#767676] leading-none">
                                                {
                                                    timeOfDelivery.filter((k) => {
                                                        if (k.id === JSON.stringify(finalDeliveryType)?.replaceAll('"', '')?.split(',')[0]) {
                                                            return k
                                                        }
                                                    }).map((k) => k)[0]['name']} — ₹{
                                                    timeOfDelivery.filter((k) => {
                                                        if (k.id === JSON.stringify(finalDeliveryType)?.replaceAll('"', '')?.split(',')[0]) {
                                                            return k
                                                        }
                                                    }).map((k) => k)[0]['price']
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <button className="flex justify-end items-center w-5 h-5 cursor-pointer no-outline" onClick={() => setIsSelectDateOpen(false)}>
                                        <svg className="text-[#191919]" width={20} height={20}>
                                            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"></use>
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex justify-center items-start w-full h-auto mt-4">
                                    <ul className="block justify-center items-start w-full h-auto max-h-[25rem] space-y-4 overflow-y-auto">
                                        {timeOfDelivery.filter((k) => {
                                            if (k.id === JSON.stringify(finalDeliveryType)?.replaceAll('"', '')?.split(',')[0]) {
                                                return k;
                                            }
                                        }).map((k) => k)[0]['type'].filter((u) => {
                                            if (moment(selectedTomorrow).format('DD MM YYYY hh A') === moment(currentDate).format('DD MM YYYY hh A')) {
                                                let parsedDate = moment(currentDate);
                                                let hourOfDay = parsedDate.hour();
                                                let minOfDay = parsedDate.minutes();

                                                let id = timeOfDelivery.filter((k) => {
                                                    if (k.id === JSON.stringify(finalDeliveryType)?.replaceAll('"', '')?.split(',')[0]) {
                                                        return k;
                                                    }
                                                }).map((k) => k)[0].id;


                                                if (moment(finalDate).format('DD MM YYYY') === moment(currentDate).format('DD MM YYYY')) {
                                                    if (id === 'fixed_time_delivery') {
                                                        if (minOfDay < 30) {
                                                            if (parseInt(u.slice(0, 2)) >= hourOfDay + 2) {
                                                                return u
                                                            }
                                                        } else {
                                                            if (parseInt(u.slice(0, 2)) >= hourOfDay + 3) {
                                                                return u
                                                            }
                                                        }
                                                    } else {
                                                        if (parseInt(u.slice(0, 2)) >= hourOfDay) {
                                                            return u
                                                        }
                                                    }
                                                } else {
                                                    return u
                                                }
                                            }
                                            else {
                                                return u
                                            }
                                        }).map((item, index) => <li key={index} className="flex justify-between items-start w-full h-auto">
                                            <label className="relative flex justify-start items-start w-full p-2 px-2.5 bg-white hover:bg-[#f7f7f7] rounded-md border border-[#e5e5e5] cursor-pointer" htmlFor={item}>
                                                <div className="flex justify-start items-center w-[80%] h-full">
                                                    <input className="flex justify-start items-center w-4 h-4 no-outline"
                                                        type="radio"
                                                        name="time_option"
                                                        id={item}
                                                        value={item}
                                                        checked={selectedDeliveryTime === item}
                                                        onChange={(e) => setSelectedDeliveryTime(e.target.value)}
                                                    />

                                                    <div className="flex justify-start items-center w-full h-full ml-2 font-semibold">
                                                        {item}
                                                    </div>
                                                </div>
                                            </label>
                                        </li>)}
                                    </ul>
                                </div>

                                <div className="flex justify-center items-center w-full h-14 mt-3 pt-3 border-t border-[#e5e5e5]">
                                    {selectedDeliveryTime !== '' ? <button className="flex justify-center items-center w-full h-full px-4 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] rounded-full text-white font-bold duration-75" onClick={() => {
                                        setFinalDeliveryTime(selectedDeliveryTime);
                                        setFinalDeliveryPrice(
                                            timeOfDelivery.filter((k) => {
                                                if (k.id === JSON.stringify(finalDeliveryType)?.replaceAll('"', '')?.split(',')[0]) {
                                                    return k
                                                }
                                            }).map((k) => k)[0]['price']
                                        );

                                        setIsSelectDateOpen(false);
                                    }}>
                                        Continue
                                    </button>
                                        :
                                        <div className="flex justify-center items-center w-full h-full px-4 bg-[#085b45] saturate-0 opacity-40 rounded-full text-white font-bold">
                                            Continue to delivery time
                                        </div>
                                    }
                                </div>
                            </div>}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}