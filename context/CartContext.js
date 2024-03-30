'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext } from 'react'

// NEXT JS
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getCookie, getCookies, hasCookie, setCookie, deleteCookie } from 'cookies-next'

// CRYPTO JS
import CryptoJS from 'crypto-js'

// CONTEXT
const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const router = useRouter();
    const query = useSearchParams()
    const pathname = usePathname()

    // State variables for cart, favorites, and recent views
    const [cart, setCart] = useState([]) // Object to store cart items
    const [subTotal, setSubTotal] = useState(0) // Total price of items in cart
    const [numTotal, setNumTotal] = useState(0) // Total quantity of items in cart
    const [mrpTotal, setMrpTotal] = useState(0) // Total MRP (Maximum Retail Price) of items in cart
    const [favList, setFavList] = useState({}) // Favorite items
    const [recentView, setRecentView] = useState({}) // Recently viewed items

    const [isCartOpenATC, setIsCartOpenATC] = useState(false)

    const [cartAdditions, setCartAdditions] = useState([])
    const [isCartAdditions, setIsCartAdditions] = useState(false)

    // COOKIE (COUPON)
    const [coupon, setCoupon] = useState([]);
    const [checkoutLoading, setCheckoutLoading] = useState(false)

    // Key used for re-renders
    const [key, setKey] = useState(Math.random())


    // Load data from local storage on component mount
    useEffect(() => {
        const loadCartData = () => {
            try {
                const cartData = localStorage.getItem('cart')
                if (cartData) {
                    const bytes = CryptoJS.AES.decrypt(cartData, 'cart')
                    const decCart = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
                    setCart(decCart)
                    calculateCartTotals(decCart)
                }

                const favListData = localStorage.getItem('favList')
                if (favListData) {
                    setFavList(JSON.parse(favListData))
                }

                const recentViewData = localStorage.getItem('recentView')
                if (recentViewData) {
                    setRecentView(JSON.parse(recentViewData))
                }

                const storedCoupon = getCookie('coupon')
                if (storedCoupon) {
                    const bytes = CryptoJS.AES.decrypt(storedCoupon, 'fvnmsdf')
                    const decCoupon = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
                    if (decCoupon && decCoupon[0] && decCoupon[0][0]) {
                        setCoupon(decCoupon[0][0])
                    } else {
                        setCoupon(null)
                    }
                } else {
                    setCoupon(null)
                }
            } catch (error) {
                console.error('Error loading cart data:', error)
            }

            setKey(Math.random())
        }

        loadCartData()
    }, [])


    // GET COUPON
    useEffect(() => {
        const storedCoupon = getCookie('coupon');
        if (storedCoupon) {
            try {
                const bytes = CryptoJS.AES.decrypt(storedCoupon, 'fvnmsdf');
                const decCoupon = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                if (decCoupon && decCoupon[0] && decCoupon[0][0]) {
                    setCoupon(decCoupon[0][0]);
                } else {
                    setCoupon(null);
                }
            } catch (error) {
                console.error('Error parsing coupon:', error);
                setCoupon(null);
            }
        } else {
            setCoupon(null);
        }
    }, [query]);

    useEffect(() => {
        calculateCartTotals(cart);

        if (coupon === null) {
            setCheckoutLoading(false);
        }
        else {
            setCheckoutLoading(true);

            setTimeout(() => {
                setCheckoutLoading(false);
            }, 1000);
        }
    }, [query, coupon]);

    // Function to calculate cart totals
    const calculateCartTotals = (cartData) => {
        let subTotal = 0
        let numTotal = 0
        let mrptTotal = 0

        const arrSum = arr => arr.reduce((a,b) => a + b, 0)

        const filteredCart = Object.keys(cartData).filter(k => !cartData[k]?.additionals).map(k => cartData[k])
        
        let additionalCart = Object.keys(cartData).filter(k => cartData[k]?.additionals).map(k => cartData[k])[0]?.additionals
        const additionalPrice = (additionalCart && additionalCart?.length > 0) ? (arrSum(additionalCart?.map((item) => item.price))) : 0

        for (const item of Object.values(filteredCart)) {
            subTotal += (item.price * item.qty) + additionalPrice
            numTotal += item.qty
            mrptTotal += (item.price * item.qty * 100) / 40
        }

        // COUPON
        let couponDiscount = 0
        let couponType = ''

        if (coupon && coupon.type) {
            if (coupon.type === 'fixed') {
                couponDiscount = parseInt(coupon.discount)
            }

            if (coupon.type === 'percent') {
                couponDiscount = parseInt(coupon.discount)
            }

            couponType = coupon.type

            if (couponDiscount !== 0) {
                if (couponType === 'fixed') {
                    setSubTotal(subTotal - couponDiscount)
                } else {
                    setSubTotal(subTotal - (subTotal * (couponDiscount / 100)))
                }
            } else {
                setSubTotal(subTotal)
            }
        } else {
            setSubTotal(subTotal)
        }

        setNumTotal(numTotal)
        setMrpTotal(mrptTotal)
    };

    // Function to add item to cart
    const addToCart = (itemCode, url, qty, availableQty, price, img, name, offer, deliveryOptions, additionals) => {
        let newCart = { ...cart }

        if (itemCode in cart) {
            if (newCart[itemCode]["qty"] <= 9) {
                newCart[itemCode]["qty"] = cart[itemCode]["qty"] + 1
            }
            else { newCart[itemCode]["qty"] = cart[itemCode]["qty"] }
        }
        else {
            newCart[itemCode] = { qty: qty, availableQty, url, price, img, name, offer, deliveryOptions }
        }


        let additionalsToAdd = additionals !== undefined ? (additionals[0].includes('&') ? additionals[0].split('&') : additionals) : []
        const additionalsArr = []

        if (additionalsToAdd.length > 0) {
            if (additionalsToAdd.length === 1) {
                let baseObj = {}

                if (additionals[0] === 'vase') {
                    baseObj = {
                        product: url,
                        addition: 'vase',
                        img: 'https://i.ibb.co/QjvwMwP/image.png',
                        price: 349
                    }
                }
                else if (additionals[0] === 'double') {
                    baseObj = {
                        product: url,
                        addition: 'double',
                        img: 'https://i.ibb.co/3RTxMGR/x2-flowers.png',
                        price: 199
                    }
                }

                additionalsArr.push(baseObj)
            }
            else {
                let baseArr = [
                    {
                        product: url,
                        addition: 'vase',
                        img: 'https://i.ibb.co/QjvwMwP/image.png',
                        price: 349
                    },
                    {
                        product: url,
                        addition: 'double',
                        img: 'https://i.ibb.co/3RTxMGR/x2-flowers.png',
                        price: 199
                    }
                ]
                let finalArr = additionalsArr.concat(baseArr)

                additionalsArr.push(...finalArr)
            }

            newCart['additionals'] = { additionals: additionalsArr }
        }


        if (isCartOpenATC === false) {
            setIsCartOpenATC(true)
        }

        setCart(newCart)
        saveCart(newCart)
    }

    // Function to save cart data to local storage
    const saveCart = (myCart) => {
        const encCart = CryptoJS.AES.encrypt(JSON.stringify(myCart), 'cart').toString()

        localStorage.setItem("cart", encCart)

        calculateCartTotals(myCart)
    }


    useEffect(() => {
        let filteredCart = Object.keys(cart).map((k) => cart[k].additionals)

        for (let i = 0; i < filteredCart.length; i++) {
            const item = filteredCart[i];

            if (item?.length > 0) {
                let productSlugs = Object.keys(cart).filter((k) => cart[k].url !== undefined).map((k) => cart[k].url)
                let additionalArr = cart['additionals']['additionals']

                if (productSlugs?.length > 0) {
                    for (let index = 0; index < productSlugs.length; index++) {
                        const slug = productSlugs[index];

                        const itemInCart = (item.map((k) => k.product))?.includes(slug)

                        if (!itemInCart) {
                            for (let i = additionalArr.length - 1; i >= 0; i--) {
                                if (additionalArr[i].product === slug) {
                                    additionalArr.splice(i, 1)
                                }
                            }
                        }
                    }
                } else {
                    additionalArr.splice(0, additionalArr.length)
                }


                setIsCartAdditions(true)
                setCartAdditions(filteredCart)
            } else {
                setIsCartAdditions(false)
                setCartAdditions([])
            }
        }
    }, [cart])


    // Function to clear cart
    const clearCart = () => {
        setCart({});
        saveCart({});
    };

    useEffect(() => {
        if (subTotal === 0 && cart.length > 0) {
            clearCart();
        }
    }, [subTotal])

    // Function to remove item from cart
    const removeFromCart = (itemCode, url, qty, availableQty, price, img, name, offer) => {
        let newCart = { ...cart };

        if (itemCode in cart) {
            newCart[itemCode]["qty"] = cart[itemCode]["qty"] - 1
        }
        if (newCart[itemCode]["qty"] <= 0) {
            delete newCart[itemCode]
        }

        setCart(newCart)
        saveCart(newCart)
    }

    // Function to remove item at once from cart
    const removeAtOnce = (itemCode) => {
        let newCart = { ...cart };
        delete newCart[itemCode];
        setCart(newCart);
        saveCart(newCart);
    };

    const removeAdditionalFromCart = (itemCode, addition) => {
        let newCart = { ...cart }
        let additionalCart = cart?.additionals?.additionals.find(k => k.product === itemCode)

        if (additionalCart) {
            if (addition === 'vase' || addition === 'double') {
                let prevAdditionals = [...cart?.additionals?.additionals]
                let prevAdditionalIndex = prevAdditionals.findIndex(k => k.addition === addition)

                if (prevAdditionalIndex !== -1) {
                    prevAdditionals.splice(prevAdditionalIndex, 1)
                    cart['additionals']['additionals'].splice(prevAdditionalIndex, 1)
                } else {
                    console.log('Item not found in cart:', addition, prevAdditionals)
                }
            }
        }
        else {
            console.log('not working...')
        }

        setCart(newCart)
        saveCart(newCart)
    }

    console.log(cart)

    useEffect(() => {
        if (cart) {
            if (cart?.additionals) {
                if (cart?.additionals?.additionals && cart?.additionals?.additionals.length === 0) {
                    delete cart.additionals

                    setIsCartAdditions(false)
                    setCartAdditions([])
                }
            }
        }
    }, [cart])


    // SHOW HEADER
    const [isHeader, setIsHeader] = useState(true);

    useEffect(() => {
        setIsHeader(!(pathname?.includes('checkout')));
    }, [pathname]);

    return (
        <CartContext.Provider
            value={{
                key,
                cart: !isCartAdditions ? cart : Object.keys(cart).filter(k => !cart[k]?.additionals).map(k => cart[k]),
                extraCart: cartAdditions,
                subTotal,
                numTotal,
                mrpTotal,
                favList,
                recentView,
                addToCart,
                clearCart,
                removeFromCart,
                removeAdditionalFromCart,
                removeAtOnce,
                isCartOpenATC,
                setIsCartOpenATC,

                isHeader,
                setIsHeader,

                checkoutLoading,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;