'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext } from 'react'
import { getCookie, getCookies, hasCookie, setCookie } from 'cookies-next'

// NEXT JS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

// FRAMER
import { motion, AnimatePresence } from "framer-motion";

// AXIOS
import axios from 'axios';

// MOMENT JS
import moment from 'moment';

// CONTEXT
import CartContext from '@/context/CartContext';
import UserContext from '@/context/UserContext';
import Product from '@/models/Product';

export const Orders = () => {
    // USE CONTEXT
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

        isHeader,
        setIsHeader,
    } = useContext(CartContext);
    const {
        user,
        isUserSignedIn,
    } = useContext(UserContext);

    const query = useSearchParams();


    // ORDERS
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (isUserSignedIn) {
            if (!(user === undefined || user === null || user === '')) {
                const fetchOrders = async () => {
                    try {
                        const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getorders?tkn="${JSON.parse(user)[3]}"`);

                        const fetchedOrders = response.data.orders;

                        setOrders(fetchedOrders);
                    } catch (error) {
                        console.error('Error fetching orders:', error);
                    }
                }

                const userToken = JSON.parse(user)[3];

                if (userToken) {
                    fetchOrders();
                }
            }
        }
    }, [query, isUserSignedIn, user]);


    // PRODUCTS
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (!(orders === undefined || orders === null || orders == [] || orders.length <= 0)) {
            setProducts(Object.keys(orders).filter((k) => {
                if (orders[k].orderId === query.get('orderId')) {
                    return orders[k]
                }
            }).map((k) => orders[k].products)[0])
        }
    }, [orders])


    return (
        <>
            <div className="flex justify-start items-center w-full sm:w-full md:w-[80%] lg:w-[80%] xl:w-[80%] bg-white text-[#191919] select-none">
                {query.get('ref') === 'order_history' && (
                    <div className="block justify-start items-start w-full h-full">
                        <div className="block justify-start items-center w-full p-4 sm:p-4 md:p-6 lg:p-6 xl:p-6 border-b border-[#e5e5e5]">
                            <div className="flex justify-start items-center w-full !leading-none text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold">
                                Order History
                            </div>

                            <div className="flex justify-start items-center w-full text-base font-normal text-[#494949]">
                                View your order history including your past orders.
                            </div>
                        </div>

                        <div className="block justify-start items-center w-full p-4 sm:p-4 md:p-6 lg:p-6 xl:p-6 border-t border-[#e5e5e5] overflow-hidden">
                            {!(orders === undefined || orders === null || orders == [] || orders.length <= 0) && <div className="flex justify-center items-center w-full border border-[#e5e5e5] rounded-md shadow-[0px_0px_12px_6px] shadow-black/[0.025] overflow-hidden">
                                <table className="block justify-center items-center w-full bg-white rounded-md overflow-x-scroll">
                                    <thead className="flex justify-start items-center w-[72rem] text-sm font-medium">
                                        <td className="flex justify-start items-center w-[12%] !leading-none">
                                            <span className="pl-3 py-3">
                                                Order ID
                                            </span>
                                        </td>

                                        <td className="flex justify-start items-center w-[12%] !leading-none">
                                            <span className="pl-3 py-3">
                                                Name
                                            </span>
                                        </td>

                                        <td className="flex justify-start items-center w-[8%] !leading-none">
                                            <span className="pl-3 py-3">
                                                Amount
                                            </span>
                                        </td>

                                        <td className="flex justify-start items-center w-[30%] !leading-none">
                                            <span className="pl-3 py-3">
                                                Address
                                            </span>
                                        </td>

                                        <td className="flex justify-start items-center w-[11%] !leading-none">
                                            <span className="pl-3 py-3">
                                                Status
                                            </span>
                                        </td>

                                        <td className="flex justify-start items-center w-[15%] !leading-none">
                                            <span className="pl-3 py-3">
                                                Ordered On
                                            </span>
                                        </td>

                                        <td className="flex justify-start items-center w-[12%] !leading-none">
                                            <span className="pr-3 py-3">
                                                Options
                                            </span>
                                        </td>
                                    </thead>

                                    <tbody className="block justify-start items-center w-[72rem] text-base font-medium">
                                        {Object.keys(orders).map((order, index) => <tr key={orders[order]._id} className="flex justify-start items-center w-full h-16 first:border-t-[1.5px] border-t border-[#e5e5e5] last:border-b-2 bg-white hover:bg-[#f7f7f7] cursor-pointer">
                                            <td className="flex justify-start items-center w-[12%] h-full">
                                                <span className="pl-3 text-ellipsis underline overflow-hidden">
                                                    {orders[order].orderId}
                                                </span>
                                            </td>

                                            <td className="flex justify-start items-center w-[12%] h-full">
                                                <span className="pl-3 text-ellipsis overflow-hidden">
                                                    {orders[order].name}
                                                </span>
                                            </td>

                                            <td className="flex justify-start items-center w-[8%] h-full">
                                                <span className="pl-3">
                                                    ₹{(orders[order].amount).toFixed(2)}
                                                </span>
                                            </td>

                                            <td className="flex justify-start items-center w-[30%] h-full">
                                                <span className="pl-3 text-ellipsis overflow-hidden">
                                                    {orders[order].pincode}, {orders[order].city}, {orders[order].state}, {orders[order].address}
                                                </span>
                                            </td>

                                            <td className="flex justify-start items-center w-[11%] h-full capitalize">
                                                {orders[order].status === 'delivered' && (
                                                    <span className="flex justify-center items-center pl-3 space-x-1 font-medium text-[#00ab42]">
                                                        <svg className="w-5 h-5" strokeWidth={2.5}
                                                            fill="none" viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                        </svg>

                                                        <div> {orders[order].status} </div>
                                                    </span>
                                                )}

                                                {orders[order].status === 'dispatched' && (
                                                    <span className="flex justify-center items-center pl-3 space-x-1 font-medium text-[#00838a]">
                                                        <svg className="w-5 h-5" strokeWidth={2}
                                                            fill="none" viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                                        </svg>

                                                        <div> {orders[order].status} </div>
                                                    </span>
                                                )}

                                                {orders[order].status === 'cancelled' && (
                                                    <span className="flex justify-center items-center pl-3 space-x-1 font-medium text-[#d91400]">
                                                        <svg className="w-5 h-5" strokeWidth={2.5}
                                                            fill="none" viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                        </svg>

                                                        <div> {orders[order].status} </div>
                                                    </span>
                                                )}
                                            </td>

                                            <td className="flex justify-start items-center w-[15%] h-full">
                                                <span className="pl-3">
                                                    {moment(orders[order].createdAt).format('DD/MM/YY hh:mm A')}
                                                </span>
                                            </td>


                                            <td className="flex justify-end items-center w-[12%] h-full">
                                                <span className="pr-3">
                                                    <Link href={`/user/orders?orderId=${orders[order].orderId}`}>
                                                        <button className="flex justify-center items-center w-full h-full p-3 leading-none rounded-md bg-[#eeeeee] hover:bg-[#e5e5e5] text-sm font-medium no-outline">
                                                            View Products
                                                        </button>
                                                    </Link>
                                                </span>
                                            </td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>}
                        </div>
                    </div>
                )}

                {!(query.get('orderId') === '' || query.get('orderId') === undefined || query.get('orderId') === null) && (
                    <div className="block justify-start items-start w-full h-full">
                        <div className="block justify-start items-center w-full p-4 sm:p-4 md:p-6 lg:p-6 xl:p-6 border-b border-[#e5e5e5]">
                            <div className="flex justify-start items-center w-full !leading-none text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold">
                                Order #{query.get('orderId')}
                            </div>

                            <div className="flex justify-start items-center w-full text-base font-normal text-[#494949]">
                                View products included in your order.
                            </div>
                        </div>

                        <div className="hidden sm:hidden md:block lg:block xl:block justify-start items-center w-full p-4 sm:p-4 md:p-6 lg:p-6 xl:p-6 border-t border-[#e5e5e5] overflow-hidden">
                            {!(products === undefined || products === null || products == [] || products.length <= 0) && <div className="flex justify-center items-center w-full border border-[#e5e5e5] rounded-md shadow-[0px_0px_12px_6px] shadow-black/[0.025] overflow-hidden">
                                <table className="block justify-center items-center w-full bg-white rounded-md">
                                    <thead className="flex justify-start items-center w-full text-sm font-medium">
                                        <td className="flex justify-start items-center w-[6%] !leading-none">
                                            <span className="pl-3 py-3">
                                                S No.
                                            </span>
                                        </td>

                                        <td className="flex justify-start items-center w-[26%] !leading-none">
                                            <span className="pl-3 py-3">
                                                Product Name
                                            </span>
                                        </td>

                                        <td className="flex justify-start items-center w-[15%] !leading-none">
                                            <span className="py-3">
                                                Description
                                            </span>
                                        </td>

                                        <td className="flex justify-center items-center w-[7%] !leading-none">
                                            <span className="py-3">
                                                Image
                                            </span>
                                        </td>

                                        <td className="flex justify-start items-center w-[10%] !leading-none">
                                            <span className="pl-3 py-3">
                                                Price
                                            </span>
                                        </td>

                                        <td className="flex justify-center items-center w-[6%] !leading-none">
                                            <span className="py-3">
                                                Qty.
                                            </span>
                                        </td>

                                        <td className="flex justify-end items-center w-[15%] !leading-none">
                                            <span className="pr-1 py-3">
                                                Offer
                                            </span>
                                        </td>

                                        <td className="flex justify-end items-center w-[15%] !leading-none">
                                            <span className="pr-3 py-3">
                                                Options
                                            </span>
                                        </td>
                                    </thead>

                                    <tbody className="block justify-start items-center w-full text-base font-medium">
                                        {Object.keys(products).map((item, index) => <tr key={products[item]._id} className="flex justify-start items-center w-full h-16 first:border-t-[1.5px] border-t border-[#e5e5e5] bg-white hover:bg-[#f7f7f7] cursor-pointer">
                                            <td className="flex justify-start items-center w-[6%] h-full">
                                                <span className="pl-3 text-ellipsis overflow-hidden">
                                                    {index + 1}
                                                </span>
                                            </td>

                                            <td className="flex justify-start items-center w-[26%] h-full">
                                                <span className="pl-3 text-ellipsis overflow-hidden">
                                                    {products[item].name}
                                                </span>
                                            </td>

                                            <td className="flex justify-start items-center w-[15%] h-full">
                                                <span className="line-clamp-3 text-xs leading-tight">
                                                    {products[item].desc}
                                                </span>
                                            </td>

                                            <td className="flex justify-center items-center w-[7%] h-full">
                                                <span className="">
                                                    <Image className="flex justify-center items-center w-12 h-12 rounded"
                                                        width={100}
                                                        height={100}
                                                        src={products[item].img}
                                                        alt={products[item].url}
                                                    />
                                                </span>
                                            </td>

                                            <td className="flex justify-start items-center w-[10%] h-full">
                                                <span className="pl-3">
                                                    ₹{(products[item].price)?.toFixed(2)}
                                                </span>
                                            </td>

                                            <td className="flex justify-center items-center w-[6%] h-full">
                                                <span className="">
                                                    {products[item].qty}
                                                </span>
                                            </td>


                                            <td className="flex justify-end items-center w-[15%] h-full">
                                                <span className="pr-1 ">
                                                    {products[item].offer === 'buy-2-get-1-free' && (
                                                        <div className="flex justify-center items-center w-full h-full p-3 leading-none text-sm rounded-md bg-[#d7f5f5] text-[#00838a] font-medium no-outline">
                                                            Buy 2 get 1 Free
                                                        </div>
                                                    )}
                                                    {products[item].offer === '' && 'None'}
                                                </span>
                                            </td>

                                            <td className="flex justify-end items-center w-[15%] h-full">
                                                <span className="pr-3">
                                                    <Link href={`/product/${products[item].url}`}>
                                                        <button className="flex justify-center items-center w-full h-full p-3 leading-none rounded-md bg-[#eeeeee] hover:bg-[#e5e5e5] text-sm font-medium no-outline">
                                                            View Product
                                                        </button>
                                                    </Link>
                                                </span>
                                            </td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>}
                        </div>

                        <div className="block sm:block md:hidden lg:hidden xl:hidden justify-start items-center w-full p-4 sm:p-4 md:p-6 lg:p-6 xl:p-6 border-t border-[#e5e5e5] overflow-hidden">
                            {!(products === undefined || products === null || products == [] || products.length <= 0) && <div className="flex justify-center items-center w-full rounded-md overflow-hidden">
                                <div className="block justify-center items-center w-full h-full space-y-4">
                                    {Object.keys(products).map((item, index) => <div key={products[item]._id} className="flex justify-between items-start w-full h-auto p-1 space-x-2 border border-[#e5e5e5] bg-white hover:bg-[#f7f7f7] cursor-pointer rounded-md overflow-hidden">
                                        <div className="flex justify-start items-center w-[30%] h-full">
                                            <Image className="flex justify-center items-center w-24 h-24 rounded"
                                                width={100}
                                                height={100}
                                                src={products[item].img}
                                                alt={products[item].url}
                                            />
                                        </div>

                                        <div className="block justify-start items-center w-[70%] pr-1 py-2 h-full">
                                            <div className="flex justify-start items-center w-full text-base font-medium leading-none">
                                                {products[item].name}
                                            </div>

                                            <div className="flex justify-between items-center w-full mt-1.5 text-lg font-medium leading-none">
                                                <div className="flex justify-start items-center w-full text-lg font-medium leading-none">
                                                    ₹{(products[item].price)?.toFixed(2)}
                                                </div>

                                                <div className="flex justify-end items-center w-full text-base font-medium leading-none">
                                                    Qty. {products[item].qty}
                                                </div>
                                            </div>

                                            <div className="flex justify-start items-center w-full mt-1.5">
                                                {products[item].offer === 'buy-2-get-1-free' && (
                                                    <div className="flex justify-center items-center w-auto h-full p-1.5 leading-none text-sm rounded bg-[#d7f5f5] text-[#00838a] font-medium no-outline">
                                                        Buy 2 get 1 Free
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </div>}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}