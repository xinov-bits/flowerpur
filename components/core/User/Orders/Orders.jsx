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

    return (
        <>
            <div className="flex justify-start items-center w-full sm:w-full md:w-[80%] lg:w-[80%] xl:w-[80%] bg-white text-[#191919] select-none">
                {query.get('ref') === 'order_history' && <div className="block justify-start items-start w-full h-full">
                    <div className="block justify-start items-center w-full p-4 border-b border-[#e5e5e5]">
                        <div className="flex justify-start items-center w-full !leading-none text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold">
                            Order History
                        </div>

                        <div className="flex justify-start items-center w-full text-base font-normal text-[#494949]">
                            View your order history including your past orders.
                        </div>
                    </div>

                    <div className="block justify-start items-center w-full p-6 border-t border-[#e5e5e5] overflow-hidden">
                        {!(orders === undefined || orders === null || orders == [] || orders.length <= 0) && <div className="flex justify-center items-center w-full border border-[#e5e5e5] rounded-md shadow-[0px_0px_12px_6px] shadow-black/[0.025] overflow-hidden">
                            <table className="block justify-center items-center w-full bg-white rounded-md overflow-x-scroll">
                                <thead className="flex justify-start items-center w-[72rem] text-sm font-semibold">
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

                                <tbody className="block justify-start items-center w-[72rem] text-base font-semibold">
                                    {Object.keys(orders).map((order, index) => <tr key={orders[order]._id} className="flex justify-start items-center w-full h-16 border-t-2 border-[#e5e5e5] last:border-b-2 bg-white hover:bg-[#f7f7f7] cursor-pointer">
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
                                            <span className="pl-3">
                                                {orders[order].pincode}, {orders[order].city}, {orders[order].state}, {orders[order].address}
                                            </span>
                                        </td>

                                        <td className="flex justify-start items-center w-[11%] h-full capitalize">
                                            {orders[order].status === 'delivered' && (
                                                <span className="flex justify-center items-center pl-3 space-x-1 font-semibold text-[#00ab42]">
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
                                                <span className="flex justify-center items-center pl-3 space-x-1 font-semibold text-[#00838a]">
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
                                                <span className="flex justify-center items-center pl-3 space-x-1 font-semibold text-[#d91400]">
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
                                                <button className="flex justify-center items-center w-full h-full p-3 leading-none rounded-md bg-[#e5e5e5] hover:bg-[#d6d6d6] text-sm font-semibold">
                                                    View Products
                                                </button>
                                            </span>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>}
                    </div>
                </div>}
            </div>
        </>
    )
}