'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext } from 'react'

// NEXT JS
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getCookie, getCookies, hasCookie, setCookie, deleteCookie } from 'cookies-next'

// CRYPTO JS
import CryptoJS from 'crypto-js'

// CONTEXT
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const router = useRouter();
    const query = useSearchParams();
    const pathname = usePathname();

    // State variables for cart, favorites, and recent views
    const [cart, setCart] = useState({}); // Object to store cart items
    const [subTotal, setSubTotal] = useState(0); // Total price of items in cart
    const [numTotal, setNumTotal] = useState(0); // Total quantity of items in cart
    const [mrpTotal, setMrpTotal] = useState(0); // Total MRP (Maximum Retail Price) of items in cart
    const [favList, setFavList] = useState({}); // Favorite items
    const [recentView, setRecentView] = useState({}); // Recently viewed items

    const [isCartOpenATC, setIsCartOpenATC] = useState(false);

    // COOKIE (COUPON)
    const [coupon, setCoupon] = useState([]);
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    // Key used for re-renders
    const [key, setKey] = useState(Math.random());

    // Load data from local storage on component mount
    useEffect(() => {
        const loadCartData = () => {
            try {
                const cartData = localStorage.getItem('cart');
                if (cartData) {
                    const bytes = CryptoJS.AES.decrypt(cartData, 'cart');
                    const decCart = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                    setCart(decCart);
                    calculateCartTotals(decCart);
                }

                const favListData = localStorage.getItem('favList');
                if (favListData) {
                    setFavList(JSON.parse(favListData));
                }

                const recentViewData = localStorage.getItem('recentView');
                if (recentViewData) {
                    setRecentView(JSON.parse(recentViewData));
                }

                const storedCoupon = getCookie('coupon');
                if (storedCoupon) {
                    const bytes = CryptoJS.AES.decrypt(storedCoupon, 'fvnmsdf');
                    const decCoupon = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                    if (decCoupon && decCoupon[0] && decCoupon[0][0]) {
                        setCoupon(decCoupon[0][0]);
                    } else {
                        setCoupon(null);
                    }
                } else {
                    setCoupon(null);
                }
            } catch (error) {
                console.error('Error loading cart data:', error);
            }

            setKey(Math.random());
        };

        loadCartData();
    }, []);


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
        let subTotal = 0;
        let numTotal = 0;
        let mrptTotal = 0;

        const b2g1freeProducts = Object.values(cartData).filter(item => item.offer === 'buy-2-get-1-free');

        for (const product of b2g1freeProducts) {
            let b2g1freeDiscount = 0;

            if (product.qty % 2 === 0) {
                b2g1freeDiscount = (product.qty * product.price) / 2;
            } else {
                b2g1freeDiscount = ((product.qty - 1) * product.price) / 2;
            }

            product.discount = b2g1freeDiscount;
        }

        for (const item of Object.values(cartData)) {
            const b2g1PriceSum = b2g1freeProducts.reduce((acc, product) => acc + product.price * product.qty, 0);

            subTotal += (item.price * item.qty) - (item.discount || 0);
            numTotal += item.qty;
            mrptTotal += (item.price * item.qty * 100) / 40;
        }

        // COUPON
        let couponDiscount = 0;
        let couponType = '';

        if (coupon && coupon.type) {
            if (coupon.type === 'fixed') {
                couponDiscount = parseInt(coupon.discount);
            }

            if (coupon.type === 'percent') {
                couponDiscount = parseInt(coupon.discount);
            }

            couponType = coupon.type;

            if (couponDiscount !== 0) {
                if (couponType === 'fixed') {
                    setSubTotal(subTotal - couponDiscount);
                } else {
                    setSubTotal(subTotal - (subTotal * (couponDiscount / 100)));
                }
            } else {
                setSubTotal(subTotal);
            }
        } else {
            setSubTotal(subTotal);
        }

        setNumTotal(numTotal);
        setMrpTotal(mrptTotal);
    };

    // Function to add item to cart
    const addToCart = (itemCode, url, qty, availableQty, price, img, name, offer, deliveryOptions) => {
        let newCart = { ...cart }; // Create a copy of the cart state using spread syntax

        if (itemCode in cart) {
            if (newCart[itemCode]["qty"] <= 9) {
                newCart[itemCode]["qty"] = cart[itemCode]["qty"] + 1
            }
            else { newCart[itemCode]["qty"] = cart[itemCode]["qty"] }
        }
        else {
            newCart[itemCode] = { qty: qty, availableQty, url, price, img, name, offer, deliveryOptions }
        }

        if (isCartOpenATC === false) {
            setIsCartOpenATC(true);
        }

        setCart(newCart);
        saveCart(newCart);
    };

    // Function to add item to cart
    const addMultipleToCart = (product1, product2) => {
        let newCart = { ...cart }; // Create a copy of the cart state using spread syntax

        if (product1[0] in cart) {
            if (newCart[product1[0]]["qty"] <= 9) {
                newCart[product1[0]]["qty"] = cart[product1[0]]["qty"] + 1
            }
            else { newCart[product1[0]]["qty"] = cart[product1[0]]["qty"] }
        }
        else {
            newCart[product1[0]] = {
                qty: product1[2],
                availableQty: product1[3],
                url: product1[1],
                price: product1[4],
                img: product1[5],
                name: product1[6],
                offer: product1[7],
            }
        }

        if (product2[0] in cart) {
            if (newCart[product2[0]]["qty"] <= 9) {
                newCart[product2[0]]["qty"] = cart[product2[0]]["qty"] + 1
            }
            else { newCart[product2[0]]["qty"] = cart[product2[0]]["qty"] }
        }
        else {
            newCart[product2[0]] = {
                qty: product2[2],
                availableQty: product2[3],
                url: product2[1],
                price: product2[4],
                img: product2[5],
                name: product2[6],
                offer: product2[7]
            }
        }

        setIsCartOpenATC(true);

        setCart(newCart);
        saveCart(newCart);
    };

    // Function to save cart data to local storage
    const saveCart = (myCart) => {
        const encCart = CryptoJS.AES.encrypt(JSON.stringify(myCart), 'cart').toString();

        localStorage.setItem("cart", encCart);

        calculateCartTotals(myCart); // Recalculate totals after saving
    };


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


    // SHOW HEADER
    const [isHeader, setIsHeader] = useState(true);

    useEffect(() => {
        setIsHeader(!(pathname?.includes('checkout')));
    }, [pathname]);

    return (
        <CartContext.Provider
            value={{
                key,
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