'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext } from 'react'
import { useRouter, useSearchParams } from "next/navigation"

// CRYPTO JS
import CryptoJS from 'crypto-js'

// CONTEXT
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const router = useRouter();
    const query = useSearchParams();

    // State variables for cart, favorites, and recent views
    const [cart, setCart] = useState({}); // Object to store cart items
    const [subTotal, setSubTotal] = useState(0); // Total price of items in cart
    const [numTotal, setNumTotal] = useState(0); // Total quantity of items in cart
    const [mrpTotal, setMrpTotal] = useState(0); // Total MRP (Maximum Retail Price) of items in cart
    const [favList, setFavList] = useState({}); // Favorite items
    const [recentView, setRecentView] = useState({}); // Recently viewed items

    // Key used for re-renders
    const [key, setKey] = useState(Math.random());

    // Load data from local storage on component mount
    useEffect(() => {
        try {
            const cartData = localStorage.getItem("cart");
            if (cartData) {
                setCart(JSON.parse(cartData));
                calculateCartTotals(JSON.parse(cartData)); // Update totals based on loaded cart data
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
    }, [localStorage]);


    // Function to calculate cart totals
    const calculateCartTotals = (cartData) => {
        let subTotal = 0;
        let numTotal = 0;
        let mrptTotal = 0;

        for (const item of Object.values(cartData)) {
            subTotal += item.price * item.qty;
            numTotal += item.qty;
            mrptTotal += ((item.price * item.qty) * 100) / 40; // Assuming MRP calculation logic
        }

        setSubTotal(subTotal);
        setNumTotal(numTotal);
        setMrpTotal(mrptTotal);
    };

    // Function to add item to cart
    const addToCart = (itemCode, url, qty, availableQty, price, img, name) => {
        let newCart = { ...cart }; // Create a copy of the cart state using spread syntax

        if (itemCode in cart) {
            newCart[itemCode].qty = Math.min(newCart[itemCode].qty + qty, 10); // Limit quantity to 9
        } else {
            newCart[itemCode] = { qty: qty, availableQty, url, price, img, name };
        }

        setCart(newCart);
        saveCart(newCart);
    };

    // Function to save cart data to local storage
    const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart));
        calculateCartTotals(myCart); // Recalculate totals after saving
    };

    // Function to clear cart
    const clearCart = () => {
        setCart({});
        saveCart({});
    };

    // Function to remove item from cart
    const removeFromCart = (itemCode, url, qty, availableQty, price, img, name, offer, size, variant) => {
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
                clearCart,
                removeFromCart,
                removeAtOnce,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;