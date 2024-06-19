"use client";

// REACT JS
import React, { useState, useContext } from 'react';

// NEXT JS
import Link from 'next/link';
import Image from 'next/image';

// CONTEXT
import CartContext from '@/context/CartContext';

const Cart = () => {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);
    const [cartLoading, setCartLoading] = useState([false, '', '']);

    const handleCartAction = (action, item) => {
        const { url, qty, availableQty, price, img, name } = item;
        setCartLoading([true, url, action]);

        setTimeout(() => {
            setCartLoading([false, '', '']);
            action === 'add' 
                ? addToCart(url, url, 1, availableQty, price, img, name) 
                : removeFromCart(url, url, qty, availableQty, price, img, name);
        }, 800);
    };

    return (
        <>
            {Object.values(cart).map((item, index) => (
                <li key={index} className="flex justify-between items-center w-full h-20 px-4 bg-white hover:bg-[#f7f7f7] cursor-pointer">
                    <Link href={`/${item.url}`} className="flex justify-center items-center w-[20%] h-full">
                        <Image src={item.img} width={800} height={800} alt={item.slug} className="size-16 rounded-md" />
                    </Link>
                    <div className="flex justify-start items-center w-[80%] h-[85%] text-base text-[#191919]">
                        <div className="flex flex-col justify-start items-center w-[68%] h-full text-start font-medium">
                            <Link href={`/product/${item.url}`} className="flex justify-center items-start w-full h-full">
                                <p className="line-clamp-2 text-ellipsis overflow-y-hidden">{item.name}</p>
                            </Link>
                            <div className="flex justify-start items-end w-full h-auto mt-1">
                                ₹{item.price * item.qty}.00
                            </div>
                        </div>
                        <div className="flex justify-end items-center w-[32%] h-full">
                            <div className="flex justify-between items-center w-full h-8 bg-[#f7f7f7] rounded-[--global-radius-md] border border-[#e5e5e5]">
                                <button 
                                    className="flex justify-center items-center size-8 bg-white rounded-[--global-radius-md] border" 
                                    onClick={() => handleCartAction('delete', item)}
                                    disabled={cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'delete'}
                                >
                                    {cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'delete' ? 
                                        <svg className="size-4 animate-spin" width={12} height={12}>
                                            <use xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"></use>
                                        </svg>
                                    : 
                                        <svg className="size-4" width={14} height={14}>
                                            <use xlinkHref="/on/demandware/svg/non-critical.svg#icon-bin_dd"></use>
                                        </svg>
                                    }
                                </button>

                                <div className="font-medium text-sm">{item.qty}×</div>

                                <button 
                                    className="flex justify-center items-center size-8 bg-white rounded-[--global-radius-md] border" 
                                    onClick={() => handleCartAction('add', item)}
                                    disabled={cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'add'}
                                >
                                    {cartLoading[0] && cartLoading[1] === item.url && cartLoading[2] === 'add' ? 
                                        <svg className="size-4 animate-spin" width={12} height={12}>
                                            <use xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"></use>
                                        </svg>
                                    : 
                                        <svg className="size-4" width={14} height={14}>
                                            <use xlinkHref="/on/demandware/svg/non-critical.svg#icon-plus_dd"></use>
                                        </svg>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </>
    );
};

export default Cart;