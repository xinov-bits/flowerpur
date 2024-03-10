'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext } from 'react'
import { usePathname, useRouter } from "next/navigation"

// CRYPTO JS
import CryptoJS from 'crypto-js'

// CONTEXT
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const router = useRouter();

    // State variables for cart, favorites, and recent views
    const [cart, setCart] = useState({}); // Object to store cart items
    const [subTotal, setSubTotal] = useState(0); // Total price of items in cart
    const [numTotal, setNumTotal] = useState(0); // Total quantity of items in cart
    const [mrpTotal, setMrpTotal] = useState(0); // Total MRP (Maximum Retail Price) of items in cart
    const [favList, setFavList] = useState({}); // Favorite items
    const [recentView, setRecentView] = useState({}); // Recently viewed items

    const [isCartOpenATC, setIsCartOpenATC] = useState(false);

    // Key used for re-renders
    const [key, setKey] = useState(Math.random());

    // Load data from local storage on component mount
    useEffect(() => {
        try {
            const cartData = localStorage.getItem("cart");
            if (cartData) {
                let bytes = CryptoJS.AES.decrypt(cartData, 'cart');
                let decCart = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                setCart(decCart);
                calculateCartTotals(decCart); // Update totals based on loaded cart data
            }

            const favListData = localStorage.getItem("favList");
            if (favListData) {
                setFavList(JSON.parse(favListData));
            }

            const recentViewData = localStorage.getItem("recentView");
            if (recentViewData) {
                setRecentView(JSON.parse(recentViewData));
            }
        } catch (error) {
            console.error(error);
        }

        setKey(Math.random()); // Generate new key for re-renders
    }, []);


    // Function to calculate cart totals
    const calculateCartTotals = (cartData) => {
        let subTotal = 0;
        let numTotal = 0;
        let mrptTotal = 0;

        const b2g1freeProducts = Object.keys(cartData).filter((k) => {
            if (cartData[k].offer === 'buy-2-get-1-free') {
                return cartData[k]
            }
        }).map((k) => cartData[k]);

        for (const item of Object.values(cartData)) {
            let b2g1freeDiscount = 0;

            for (let i = 0; i < b2g1freeProducts.length; i++) {
                const product = b2g1freeProducts[i];

                if (product.qty % 2 === 0) {
                    b2g1freeDiscount = (product.qty * product.price) / 2
                }
                else if ((product.qty % 2 - 1) === 0) {
                    b2g1freeDiscount = ((product.qty - 1) * product.price) / 2
                }
            }

            subTotal += (item.price * item.qty) - (b2g1freeDiscount);

            numTotal += item.qty;
            mrptTotal += ((item.price * item.qty) * 100) / 40; // Assuming MRP calculation logic
        }

        setSubTotal(subTotal);
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

        setIsCartOpenATC(true);

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
    const pathname = usePathname();

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
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;