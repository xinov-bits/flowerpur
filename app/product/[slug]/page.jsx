'use client';

import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'

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

// MOMENT JS
import moment from 'moment';

// DROPZONE
import { useDropzone } from 'react-dropzone'

// COMPONENTS
import { InputField } from '@/components/core/InputField';

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
    const [rStars, setRStars] = useState(1);
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

    // --> REVIEW IMAGE
    const API_KEY = '031494b4ce79047904f947c745421438';
    const API_URL = 'https://api.imgbb.com/1/upload';

    // const handleImageUpload = useCallback(async () => {
    //     try {
    //         if (!selectedImage) {
    //             console.warn('Please select an image before uploading.');
    //             return;
    //         }

    //         setLoading(true);
    //         setImgSuccess(false);
    //         setUploadError(null);

    //         const formData = new FormData();
    //         formData.append('image', selectedImage);

    //         const response = await axios.post(API_URL, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //             params: {
    //                 key: API_KEY,
    //             },
    //         });

    //         if (response.data.data) {
    //             setRImg(response.data.data.url);
    //         } else {
    //             setUploadError('Failed to upload image. Please try again.');
    //         }
    //     } catch (error) {
    //         setImgSuccess(false);
    //         setUploadError('Error uploading image. Please try again.');
    //     } finally {
    //         setLoading(false);
    //         setImgSuccess(true);
    //     }
    // }, [selectedImage]);

    const handleImageUpload = useCallback(async () => {
        if (!selectedImage) {
            console.log("Please select an image.");
            return;
        }
    
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
                // console.log('Image uploaded successfully:', data);
            } else {
                setUploadError('Failed to upload image. Please try again.');
                setImgSuccess(false);
                // console.error('Failed to upload image:', response.statusText);
            }
        } catch (error) {
            setImgSuccess(false);
            // console.error('Error occurred while uploading image:', error);
        } finally {
            setLoading(false);
            setImgSuccess(true);
        }
    }, [selectedImage, setLoading, setImgSuccess, setUploadError, setRImg]);

    const onDrop = (acceptedFiles) => {
        setSelectedImage(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    useEffect(() => {
        handleImageUpload();
    }, [handleImageUpload]);


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

    const addProductToCart = (itemCode, url, qty, availableQty, price, img, name, offer) => {
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
            );

            if (extrasToAdd != ['', ''] && (extrasToAdd[0] !== '' || extrasToAdd[1] !== '') && (extrasToAdd[0] === '' || extrasToAdd[1] === '')) {
                setAddExtraToCart(true);
            } else if (extrasToAdd != ['', ''] && extrasToAdd[0] !== '' && extrasToAdd[1] !== '') {
                setAddExtrasToCart(true);
            }
        }, 1000);
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
                while (!(JSON.stringify(cart).includes('special__vase') && JSON.stringify(cart).includes('special__double'))) {
                    if (!JSON.stringify(cart).includes('special__vase')) {
                        addToCart(
                            'special__vase',
                            'special__vase',
                            1,
                            999,
                            349,
                            'https://i.ibb.co/3RTxMGR/x2-flowers.png',
                            'Vase',
                            '',
                        );
                    }
                    if (!JSON.stringify(cart).includes('special__double')) {
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


    console.log(reviews);

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
                        {!(product.title === undefined || product.title === '' || product.title === null || product.title == []) && <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative flex justify-start items-center w-[30rem] h-full cursor-pointer rounded-md overflow-hidden select-none"
                        >
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
                                            alt={product?.title}
                                        />
                                    </SplideSlide>

                                    <SplideSlide className="flex justify-center items-center w-full h-full overflow-hidden">
                                        <Image className="flex justify-center items-center w-auto h-auto"
                                            src={product?.img2}
                                            width={1080}
                                            height={1080}
                                            alt={product?.title}
                                        />
                                    </SplideSlide>

                                    <SplideSlide className="flex justify-center items-center w-full h-full overflow-hidden">
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
                                            <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-md" />
                                        )}
                                    </label>
                                </div>}
                            </div>
                        </motion.div>}

                        {(product.title === undefined || product.title === '' || product.title === null || product.title == []) && <div className="relative hidden sm:hidden md:flex lg:flex xl:flex justify-start items-center w-[30rem] h-[30rem] py-2 cursor-pointer rounded-md overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full rounded-md overflow-hidden select-none">
                                <div className="relative flex justify-start items-center w-full h-full bg-[#f6f6f6] rounded-md overflow-hidden">
                                    <div className="absolute flex justify-start items-center w-full h-full" id="skeleton_gradient" />
                                </div>
                            </div>
                        </div>}
                    </div>

                    {(product.title === undefined || product.title === '' || product.title === null || product.title == []) && <div className="relative block justify-start items-center w-full h-full sm:h-full md:h-[30rem] lg:h-[30rem] xl:h-[30rem] py-2 sm:py-2 md:py-0 lg:py-0 xl:py-0 pr-0 sm:pr-0 md:pr-32 lg:pr-32 xl:pr-32">
                        <div className="relative flex sm:flex md:hidden lg:hidden xl:hidden justify-start items-center w-full h-[360px] rounded-md overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full bg-[#f6f6f6] rounded-md overflow-hidden">
                                <div className="absolute flex justify-start items-center w-full h-full" id="skeleton_gradient" />
                            </div>
                        </div>

                        <div className="relative flex justify-start items-center w-1/4 h-8 sm:h-8 md:h-8 lg:h-8 xl:h-8 mt-4 sm:mt-4 md:mt-2 lg:mt-2 xl:mt-2 rounded-md overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full bg-[#f6f6f6] rounded-md overflow-hidden">
                                <div className="absolute flex justify-start items-center w-full h-full" id="skeleton_gradient" />
                            </div>
                        </div>

                        <div className="relative flex justify-start items-center w-full h-24 sm:h-24 md:h-20 lg:h-20 xl:h-20 mt-2 rounded-md overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full bg-[#f6f6f6] rounded-md overflow-hidden">
                                <div className="absolute flex justify-start items-center w-full h-full" id="skeleton_gradient" />
                            </div>
                        </div>

                        <div className="relative flex justify-start items-center w-1/2 h-14 mt-2 rounded-md overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full bg-[#f6f6f6] rounded-md overflow-hidden">
                                <div className="absolute flex justify-start items-center w-full h-full" id="skeleton_gradient" />
                            </div>
                        </div>

                        <div className="relative flex justify-start items-center w-full h-12 mt-4 rounded-md overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full bg-[#f6f6f6] rounded-md overflow-hidden">
                                <div className="absolute flex justify-start items-center w-full h-full" id="skeleton_gradient" />
                            </div>
                        </div>

                        <div className="relative flex justify-start items-center w-full h-24 mt-4 rounded-md overflow-hidden select-none">
                            <div className="relative flex justify-start items-center w-full h-full bg-[#f6f6f6] rounded-md overflow-hidden">
                                <div className="absolute flex justify-start items-center w-full h-full" id="skeleton_gradient" />
                            </div>
                        </div>

                        <div className="flex justify-start items-center w-full h-14 mt-2 rounded-md overflow-hidden space-x-2 sm:space-x-2 md:space-x-3 lg:space-x-3 xl:space-x-3">
                            <div className="relative flex justify-center items-center w-1/3 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 h-full rounded-md overflow-hidden select-none">
                                <div className="relative flex justify-center items-center w-full h-full bg-[#f6f6f6] rounded-md overflow-hidden">
                                    <div className="absolute flex justify-center items-center w-full h-full" id="skeleton_gradient" />
                                </div>
                            </div>

                            <div className="relative flex justify-center items-center w-2/3 sm:w-2/3 md:w-3/4 lg:w-3/4 xl:w-3/4 h-full rounded-md overflow-hidden select-none">
                                <div className="relative flex justify-center items-center w-full h-full bg-[#f6f6f6] rounded-md overflow-hidden">
                                    <div className="absolute flex justify-center items-center w-full h-full" id="skeleton_gradient" />
                                </div>
                            </div>
                        </div>
                    </div>}

                    {!(product.title === undefined || product.title === '' || product.title === null || product.title == []) && <div className="relative flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-center w-full h-auto py-2">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative flex justify-center items-center w-auto h-auto cursor-pointer rounded-md overflow-hidden select-none"
                        >
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
                            <div className="absolute bottom-0 left-0 -m-0.5 flex justify-center items-center w-auto p-2 space-x-2 select-none bg-white rounded-tr-md">
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
                                            <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-md" />
                                        )}
                                    </label>
                                </div>}
                            </div>
                        </motion.div>
                    </div>}


                    {!(product.title === undefined || product.title === '' || product.title === null || product.title == []) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative flex justify-center items-start w-full h-full sm:h-full md:h-[30rem] lg:h-[30rem] xl:h-[30rem] text-[#191919]"
                        >
                            <div className="relative flex flex-col justify-start items-start w-full h-full border-0 sm:border-0 md:border-l lg:border-l xl:border-l border-[#e5e5e5]">
                                <div className="flex justify-start items-center w-full px-2 sm:px-2 md:px-6 lg:px-6 xl:px-6 mt-6 text-base font-medium underline text-[#767676] decoration-[#797979] hover:no-underline capitalize cursor-pointer leading-none">
                                    {product?.category}
                                </div>

                                <div className="flex justify-start items-center w-full px-2 sm:px-2 md:px-6 lg:px-6 xl:px-6 mt-1 text-2xl font-bold capitalize">
                                    {product?.title}
                                </div>

                                <div className="flex justify-start items-center w-auto px-2 sm:px-2 md:px-6 lg:px-6 xl:px-6 capitalize space-x-1.5 cursor-pointer">
                                    <div className="flex justify-center items-center w-auto">
                                        {renderStarsCustom(Math.round(reviewMean), 'w-[1.175rem] h-[1.175rem]', 'text-[#E8C500]')}
                                        {renderStarsCustomE((5 - Math.round(reviewMean)), 'w-[1.175rem] h-[1.175rem]', 'text-[#E8C500]')}
                                    </div>

                                    <div className="flex justify-center items-center w-auto text-[#767676] font-medium">
                                        {reviewMean.toFixed(1)} &#40;{approvedReviews.length}&#41;
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

                                                        {!extrasToAdd.includes('vase') ? <div className="flex justify-end items-center w-[4.25rem] h-8 sm:h-8 md:h-7 lg:h-7 xl:h-7">
                                                            <button className="flex justify-center items-center w-full h-full border-[1.5px] border-[#e5e5e5] rounded-full text-sm hover:bg-[#f7f7f7] hover:border-[#c0c0c0] active:border-[#767676]" onClick={() => {
                                                                setExtrasToAdd(prevArr => ['vase', prevArr[1]])
                                                            }}>
                                                                <svg className="" width={16} height={16}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-plus_dd"
                                                                    ></use>
                                                                </svg>

                                                                Add
                                                            </button>
                                                        </div> : <div className="flex justify-end items-center w-[4.25rem] h-8 sm:h-8 md:h-7 lg:h-7 xl:h-7">
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

                                                        {!extrasToAdd.includes('double') ? <div className="flex justify-end items-center w-[4.25rem] h-8 sm:h-8 md:h-7 lg:h-7 xl:h-7">
                                                            <button className="flex justify-center items-center w-full h-full border-[1.5px] border-[#e5e5e5] rounded-full text-sm hover:bg-[#f7f7f7] hover:border-[#c0c0c0] active:border-[#767676]" onClick={() => {
                                                                setExtrasToAdd(prevArr => [prevArr[0], 'double'])
                                                            }}>
                                                                <svg className="" width={16} height={16}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-plus_dd"
                                                                    ></use>
                                                                </svg>

                                                                Add
                                                            </button>
                                                        </div> : <div className="flex justify-end items-center w-[4.25rem] h-8 sm:h-8 md:h-7 lg:h-7 xl:h-7">
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
                                            </ul>
                                        </button>

                                        <button className="hidden sm:hidden md:flex lg:flex xl:flex justify-start items-center w-full h-full p-2 bg-white border border-[#e5e5e5] rounded-md leading-none cursor-pointer">
                                            <div className="flex justify-start items-center w-full">

                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-start items-center w-full h-2 sm:h-2 md:h-4 lg:h-4 xl:h-4 border-y border-[#e5e5e5] bg-[#f7f7f7]" />

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="hidden sm:hidden md:flex lg:flex xl:flex flex-col justify-start items-center w-full sm:w-full md:w-[80%] lg:w-[80%] xl:w-[80%] h-full px-2 sm:px-2 md:px-6 lg:px-6 xl:px-6 mt-2 py-4 text-lg text-[#191919]">
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

                                            {qtySelectPop && <div className="absolute z-[600] bottom-0 flex flex-col justify-start items-center w-auto h-auto p-1 space-y-1 mb-14 bg-white rounded border border-[#767676] overflow-hidden">
                                                {qtyValArr.map((qty, index) => <button key={index} className="flex justify-center items-center w-full h-auto px-6 py-2 leading-none bg-white hover:bg-[#f7f7f7] active:bg-[#f0f0f0] rounded border border-white active:border-[#c0c0c0] no-outline duration-75 transition-[border]" onClick={() => {
                                                    setProductQty(qty);
                                                    setQtySelectPop(false);
                                                }}>
                                                    {qty}
                                                </button>)}
                                            </div>}
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
                                </motion.div>
                                <AnimatePresence>
                                    {(scrollY >= 200) && <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="fixed z-[100] left-0 bottom-0 flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-center w-full h-16 px-2 bg-white border-t border-[#e5e5e5]"
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

                                                    {qtySelectPop && <div className="absolute z-[600] bottom-0 flex flex-col justify-start items-center w-full h-auto p-1 space-y-1 mb-14 bg-white rounded border border-[#767676] overflow-hidden">
                                                        {qtyValArr.map((qty, index) => <button key={index} className="flex justify-center items-center w-full h-auto py-2 leading-none bg-white hover:bg-[#f7f7f7] active:bg-[#f0f0f0] rounded border border-white active:border-[#c0c0c0] no-outline duration-75 transition-[border]" onClick={() => {
                                                            setProductQty(qty);
                                                            setQtySelectPop(false);
                                                        }}>
                                                            {qty}
                                                        </button>)}
                                                    </div>}
                                                </div>

                                                <div className="flex justify-center items-center w-[72%] h-full">
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
                                        </motion.div>
                                    </motion.div>}
                                </AnimatePresence>
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
                                <div className="flex justify-center items-center w-full h-auto border-b border-[#e5e5e5]">
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

                                <div className="flex flex-col justify-start items-start w-full h-[24.7rem] overflow-y-scroll select-none">
                                    {approvedReviews.map((review) => {
                                        return <div key={review._id} className="flex justify-start items-start w-full h-full p-2 bg-white hover:bg-[#f7f7f7] no-outline space-x-2">
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
                                                        <p className="line-clamp-2 text-ellipsis text-[#191919] font-semibold leading-none">
                                                            {review.title}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-start items-center w-full">
                                                        <p className="line-clamp-2 text-ellipsis text-[#767676] font-medium">
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

                            <div className="flex flex-col justify-start items-start w-full sm:w-full md:w-2/5 lg:w-2/5 xl:w-2/5 h-full bg-white border border-[#e5e5e5] rounded-lg text-[#191919] overflow-hidden">
                                <div className="flex justify-start items-center w-full p-2 border-b border-[#e5e5e5] text-base font-semibold text-[#191919] select-none">
                                    Post Review
                                </div>

                                <form className="block justify-start items-center w-full h-full space-y-5 p-2" onSubmit={addReview}>
                                    <div className="flex justify-between items-center w-full h-auto leading-none text-base font-medium text-[#191919]">
                                        <div className="flex justify-start items-center w-full h-auto">
                                            <div {...getRootProps({ className: 'flex justify-start items-center w-auto h-full no-outline' })}>
                                                {loading && (
                                                    <div>Loading...</div>
                                                )}

                                                {selectedImage === '' && <>
                                                    <label htmlFor="r_image" className="flex justify-center items-center w-auto h-full px-3 py-2 text-sm border border-[#e5e5e5] bg-white hover:bg-[#f7f7f7] rounded-full space-x-1 cursor-pointer select-none no-outline">
                                                        <svg className="flex justify-center items-center w-4 h-4" strokeWidth={1.5}
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                        </svg>

                                                        <div> Upload Image </div>
                                                    </label>
                                                    <input {...getInputProps({ className: 'absolute opacity-0 pointer-events-none outline-none' })} />
                                                </>}

                                                {(imgSuccess && selectedImage !== '') && <>
                                                    <div className="flex justify-center items-center w-auto h-full p-1 pr-2 text-sm border border-[#e5e5e5] bg-white hover:bg-[#f7f7f7] rounded-full space-x-1 cursor-pointer select-none overflow-hidden">
                                                        <div className="flex justify-center items-center w-8 h-8 rounded-l-full rounded-lg overflow-hidden">
                                                            <Image className="flex justify-center items-center w-full h-full rounded-l-full rounded-lg overflow-hidden"
                                                                src={rImg}
                                                                width={20}
                                                                height={20}
                                                                alt={product.title}
                                                            />
                                                        </div>

                                                        <div className="flex justify-center items-center w-auto h-full">
                                                            Image uploaded.
                                                        </div>


                                                        <div className="flex justify-center items-center w-6 h-6" onClick={() => {
                                                            setRImg('')
                                                            setSelectedImage('')
                                                        }}>
                                                            <svg className="flex justify-center items-center w-4 h-4 fill-none">
                                                                <use xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"></use>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </>}

                                                {uploadError && (
                                                    <div>
                                                        {uploadError}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

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
                                            <button className="flex justify-center items-center w-full h-full px-4 bg-[#24543e] hover:bg-[#1C4632] active:bg-[#163C2B] rounded-full text-white font-bold duration-200" type="submit">
                                                Post your review
                                            </button>
                                        </div>
                                            :
                                            <div className="flex justify-start items-center w-full h-full leading-none text-xl sm:text-xl md:text-base lg:text-base xl:text-base font-semibold">
                                                <button className="flex justify-center items-center w-full h-full px-4 bg-[#24543e] rounded-full text-white font-bold saturate-0 opacity-40" type="button">
                                                    Post your review
                                                </button>
                                            </div>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}