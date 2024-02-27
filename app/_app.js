// React JS
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import App from 'next/app'

// Components
import Header from '../components/layout/Header';

// CSS
import '../styles/globals.css';

// Vercel
import { Analytics } from '@vercel/analytics/react';

// Crypto JS
import CryptoJS from 'crypto-js';


export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [numTotal, setNumTotal] = useState(0)
  const [mrpTotal, setMrpTotal] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)

  const [favList, setFavList] = useState({})

  const [recentView, setRecentView] = useState({})

  const [isMember, setIsMember] = useState(false)

  // ---- Cart Sidebar -----------------------------------------------
  const [freeWallet, setFreeWallet] = useState(false)
  // ---- Cart Sidebar -----------------------------------------------

  // ---- Buy 2 Get 1 Free -------------------------------------------
  const [buy2Get1Free, setBuy2Get1Free] = useState(false)
  const [qtyOfBuy2Get1, setQtyOfBuy2Get1] = useState(0)
  const [discountOfB2G1Free, setDiscountOfB2G1Free] = useState(0)
  const [dB1G1F2, setDB1G1F2] = useState(0)

  useEffect(() => {
    try {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        const parsedCart = JSON.parse(cartData);
        setCart(parsedCart);
        saveCart(parsedCart);
      }

      const favListData = localStorage.getItem("favList");
      if (favListData) {
        const parsedFavList = JSON.parse(favListData);
        setFavList(parsedFavList);
        saveFavList(parsedFavList);
      }

      const recentViewData = localStorage.getItem("recentView");
      if (recentViewData) {
        const parsedRecentView = JSON.parse(recentViewData);
        setRecentView(parsedRecentView);
        saveRecentView(parsedRecentView);
      }
    } catch (error) {
      console.error(error);
    }

    const myuserData = localStorage.getItem('myuser');
    if (myuserData !== null && myuserData !== undefined) {
      try {
        const bytes = CryptoJS.AES.decrypt(myuserData, '091185');
        const myuser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        if (myuser) {
          setUser({ value: myuser.token, email: myuser.email, name: myuser.name, phone: myuser.phone });
        }
      } catch (error) {
        console.error('An error occurred while decrypting user data', error);
      }
    }

    setKey(Math.random());
  }, [router.query]);

  const saveCart = (myCart, itemCode, qty, availableQty) => {
    localStorage.setItem("cart", JSON.stringify(myCart))

    let num = 0;
    let subt = 0;
    let mrpt = 0;
    let indt = 0;
    let qtyOfB2G1Free = 0;
    let b2G1FinCartItems = Object.keys(myCart).filter((k) => myCart[k].offer == 'buy-1-get-1-free').map((k) => (myCart[k].qty))
    let keys = Object.keys(myCart)

    const newCart = Object.keys(myCart).filter((k) => {
      if (!myCart[k].name.includes('imember')) {
        return myCart[k]
      }
    }).map((k) => myCart[k])
    let newKeys = Object.keys(newCart)


    for (let i = 0; i < newKeys.length; i++) {
      subt += newCart[newKeys[i]]["price"] * newCart[newKeys[i]].qty;
    }

    for (let i = 0; i < newKeys.length; i++) {
      num += newCart[newKeys[i]].qty;
    }

    if (subt === 0) {
      num = 0;
    }

    for (let i = 0; i < newKeys.length; i++) {
      if (JSON.stringify(localStorage.getItem("cart")).includes('osjd')) {
        mrpt += ((((newCart[newKeys[i]]["price"] * newCart[newKeys[i]].qty) * 100) / 40));
      }
      else {
        mrpt += ((((newCart[newKeys[i]]["price"] * newCart[newKeys[i]].qty) * 100) / 40));
      }
    }

    for (let i = 0; i < newKeys.length; i++) {
      indt += (((newCart[newKeys[i]]["price"] * newCart[newKeys[i]].qty) * 0.1));
    }

    for (let i = 0; i < b2G1FinCartItems.length; i++) {
      qtyOfB2G1Free += b2G1FinCartItems[i];
    }

    if (subt !== 0) {
      setNumTotal(num)
    }
    setSubTotal(subt)
    setMrpTotal(mrpt)
    setInsiderTotal(indt)
    setQtyOfBuy2Get1(qtyOfB2G1Free)

    if (qtyOfB2G1Free >= 2) {
      setBuy2Get1Free(true)
    }
    else {
      setBuy2Get1Free(false)
    }

    let b2G1FinCart = Object.keys(myCart).filter((k) => myCart[k].offer == 'buy-1-get-1-free').map((k) => (myCart[k].price))
    let minB2G1FinCart = Math.min(...b2G1FinCart);

    if (JSON.stringify(Object.keys(myCart)).includes('free_wallet')) {
      setSubTotal(subt - 899)
      setMrpTotal(mrpt - 2498)
    }

    if (JSON.stringify(Object.keys(myCart)).includes('osjd')) {
      setSubTotal(Math.round(subt - (subt * 0.1)))
    }

    if (subt >= 1499) {
      setFreeWallet(true)
    } else {
      setFreeWallet(false)
    }

    if (subt <= 1498) {
      setFreeWallet(false)
    }

    let DB1G1F2 = minB2G1FinCart;

    if (qtyOfB2G1Free % 2 == 0) {
      setDiscountOfB2G1Free((minB2G1FinCart * (qtyOfB2G1Free / 2)))
      setDB1G1F2((minB2G1FinCart * (qtyOfB2G1Free / 2)))
      DB1G1F2 = ((minB2G1FinCart * (qtyOfB2G1Free / 2)))
    } else {
      setDiscountOfB2G1Free((minB2G1FinCart * (qtyOfB2G1Free - 1)) / 2)
      setDB1G1F2((minB2G1FinCart * (qtyOfB2G1Free - 1)) / 2)
      DB1G1F2 = ((minB2G1FinCart * (qtyOfB2G1Free - 1)) / 2)
    }

    if (qtyOfB2G1Free >= 2) {
      if (JSON.stringify(Object.keys(myCart)).includes('free_wallet')) {
        if (JSON.stringify(Object.keys(myCart)).includes('osjd')) {
          setSubTotal(Math.round(((subt - (subt * 0.1)) - (DB1G1F2)) - 899))
        }
        else {
          setSubTotal((subt - DB1G1F2) - 999)
        }
      }
      else if (JSON.stringify(Object.keys(myCart)).includes('osjd')) {
        setSubTotal(Math.round(((subt - (subt * 0.1)) - (DB1G1F2))))
      }
      else {
        setSubTotal((subt - DB1G1F2))
      }
    }
  }

  useEffect(() => {
    if (subTotal === 0 && numTotal > 0) {
      setNumTotal(0)
    }
  }, [subTotal, numTotal])

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  useEffect(() => {
    if (snackbarState.open === true) {
      setTimeout(() => {
        handleClose();
      }, 2500);
    }
  }, [snackbarState])

  const addToCart = (itemCode, url, qty, availableQty, price, img, name, offer, size, variant) => {
    let newCart = cart;

    if (itemCode in cart) {
      if (newCart[itemCode]["qty"] <= 9) {
        newCart[itemCode]["qty"] = cart[itemCode]["qty"] + 1
      }
      else { newCart[itemCode]["qty"] = cart[itemCode]["qty"] }
    }
    else {
      newCart[itemCode] = { qty: 1, availableQty, url, price, img, name, offer, size, variant }
    }

    setSnackbarState({ vertical: 'top', horizontal: 'center', text: 'Added product to bag.', open: true });

    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = () => {
    handleClose();

    setCart({})
    saveCart({})
  }

  const removeFromCart = (itemCode, url, qty, availableQty, price, img, name, offer, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode]["qty"] = cart[itemCode]["qty"] - 1
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }

    if (open === true) {
      handleClose();

      setSnackbarState({ vertical: 'top', horizontal: 'center', text: 'Removed product from bag.', open: true });
    } else {
      setSnackbarState({ vertical: 'top', horizontal: 'center', text: 'Removed product from bag.', open: true });
    }

    setCart(newCart)
    saveCart(newCart)
  }

  const removeAtOnce = (itemCode, url, qty, availableQty, price, img, name, offer, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode]["qty"] = cart[itemCode]["qty"] - qty
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }

    setCart(newCart)
    saveCart(newCart)
  }

  return <>

    <Analytics />

    <Header key={key} user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} removeAtOnce={removeAtOnce} subTotal={subTotal} mrpTotal={mrpTotal} numTotal={numTotal} />

    <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} removeAtOnce={removeAtOnce} clearCart={clearCart} subTotal={subTotal} numTotal={numTotal} {...pageProps} />

  </>
}