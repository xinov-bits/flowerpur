'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext, useRef } from 'react'
import { deleteCookie, getCookie, getCookies, hasCookie, setCookie } from 'cookies-next'

// NEXT JS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

// FRAMER
import { motion, AnimatePresence } from "framer-motion";

// AXIOS
import axios from 'axios';

// CONTEXT
import CartContext from '@/context/CartContext';
import UserContext from '@/context/UserContext';

// GOOGLE MAPS AUTOCOMPLETE
import { getAutocompleteResults } from '@/utils/tomtomAutocomplete';


const SelectLocation = ({ isAddressChooser, setIsAddressChooser }) => {
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

    const router = useRouter();


    // ╭ ADDRESS
    // ╰──── setSearchResults([])
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const [additionalResults, setAdditionalResults] = useState([])

    useEffect(() => {
        results?.forEach((result) => {
            if (result?.address?.municipalitySubdivision?.includes(',')) {
                const subdivisions = result.address.municipalitySubdivision.split(',');

                if (subdivisions.length > 1) {
                    const isIdExists = additionalResults.some(item => item.id === result.id);

                    if (!isIdExists) {
                        setAdditionalResults(prevAdditionalResults => [
                            ...prevAdditionalResults,
                            {
                                id: result.id,
                                ffa: result.address.freeformAddress,
                                address: subdivisions,
                            }
                        ]);
                    }
                }
            }
        });
    }, [results])

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.trim() !== '') {
            const autocompleteResults = await getAutocompleteResults(value);
            setResults(autocompleteResults);
        } else {
            setResults([]);
        }
    }

    const [inputError, setInputError] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState('')
    const [resultsLoading, setResultsLoading] = useState(false)

    useEffect(() => {
        const handleInvalidInput = (e) => {
            e.target.setCustomValidity('');
            if (!e.target.validity.valid) {
                setInputError(true);
            }
        };

        const handleInput = (e) => {
            e.target.setCustomValidity('');
            setInputError(false);
        };

        const inputElement = document?.getElementById('delivery-postcode');

        inputElement?.addEventListener('invalid', handleInvalidInput);
        inputElement?.addEventListener('input', handleInput);

        return () => {
            inputElement?.removeEventListener('invalid', handleInvalidInput);
            inputElement?.removeEventListener('input', handleInput);
        };
    }, [query]);

    useEffect(() => {
        const addAddressToCookie = (address) => {
            setCookie('user_address', address)
        };

        if (selectedAddress !== '') {
            setResultsLoading(true)

            setTimeout(() => {
                addAddressToCookie(selectedAddress)
                setQuery('')
                setSelectedAddress('')

                router.push(`?rmd=${(Math.random() * 1000).toFixed(0)}`)

                setResultsLoading(false)
                setIsAddressChooser(false)
            }, 1000);
        }
    }, [selectedAddress])


    return (
        <>
            <AnimatePresence>
                {isAddressChooser && (
                    <div className="fixed z-[600] top-0 left-0 flex justify-center items-center xl:items-center w-full h-screen select-none duration-75">
                        <motion.div
                            className="absolute z-[600] top-0 left-0 flex justify-center items-center w-full h-full bg-[#262626] bg-opacity-80"
                            onClick={() => setIsAddressChooser(false)}

                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <motion.div className="relative z-[601] flex justify-center items-center w-[96%] sm:w-[96%] md:w-full lg:w-full xl:w-full max-w-sm h-auto mb-2 sm:mb-2 md:mb-0 lg:mb-0 xl:mb-0 text-[#191919]"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                        >
                            {(
                                getCookie('user_address') === '' ||
                                getCookie('user_address') === undefined ||
                                getCookie('user_address') === null
                            ) ? (
                                <div className="relative z-[200] flex flex-col justify-start items-center w-full h-auto py-4 bg-white rounded-lg">
                                    <div className="flex justify-start items-center w-full h-6 px-4">
                                        <svg
                                            className="flex justify-center items-center size-6 cursor-pointer"
                                            onClick={() => setIsAddressChooser(false)}
                                            width={24} height={24}
                                        >
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"
                                            ></use>
                                        </svg>
                                    </div>

                                    <div className="block justify-start items-center w-full mt-2 space-y-2">
                                        <div className="flex justify-start items-center w-full px-4 text-2xl font-bold leading-none">
                                            Deliver to
                                        </div>

                                        <div className="flex justify-start items-center w-full leading-none">
                                            <div className="relative flex flex-col justify-center items-center w-full h-auto rounded-md select-none">
                                                <div className="flex justify-center items-center w-full h-full px-4">
                                                    <label htmlFor="delivery-postcode" className="relative block justify-center items-center w-full h-full rounded-md select-none">
                                                        <div className="absolute left-0 flex justify-center items-center w-8 h-full">
                                                            {!resultsLoading ? (
                                                                <svg className="flex justify-center items-center size-4" width={16} height={16}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd"
                                                                    ></use>
                                                                </svg>
                                                            ) : (
                                                                <svg className="animate-[spin_600ms_linear_infinite]" width={16} height={16}>
                                                                    <use
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                                    ></use>
                                                                </svg>
                                                            )}
                                                        </div>

                                                        <input
                                                            className={`flex justify-center items-center w-full h-full p-3 pl-8 rounded-md ${inputError ? 'bg-[#fff0ed] hover:bg-[#fff0ed] ring-2 ring-[#b71000]' : 'bg-[#eeeeee] ring-0'} placeholder:text-[#191919] text-[#191919] font-medium hover:bg-[#e5e5e5] no-outline outline-none`}
                                                            type="text"
                                                            value={query}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter delivery address"
                                                            id="delivery-postcode"
                                                            name="delivery-postcode"
                                                            autoComplete='off'
                                                        />

                                                        {inputError && <div className="flex justify-start items-center w-auto mt-1.5 space-x-1 leading-none">
                                                            <svg className="flex justify-center items-center w-3.5 h-3.5" width={16} height={16}>
                                                                <use
                                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-error_dd"
                                                                ></use>
                                                            </svg>

                                                            <div> Delivery address is required </div>
                                                        </div>}
                                                    </label>
                                                </div>

                                                {(!resultsLoading && query !== '' && results.length > 0) && <div className="flex justify-center items-center w-full h-full mt-2">
                                                    <ul className="block items-center w-full h-[14rem] space-y-1 overflow-y-auto">
                                                        {results.filter((result) => {
                                                            if (result?.address?.municipalitySubdivision?.includes(',')) {
                                                                return result
                                                            }
                                                        }).map((result, index) => (
                                                            <ul key={index} className="flex flex-col justify-end items-center w-full">
                                                                {additionalResults.filter((k) => {
                                                                    if (k.id === result.id) {
                                                                        return k
                                                                    }
                                                                }).map((k, index) => (
                                                                    <div key={index} className="flex flex-col justify-end items-center w-full">
                                                                        {k.address.map((item, index) => <li key={index} className="flex justify-between items-center w-full h-auto min-h-12 py-1 px-4 bg-white hover:bg-[#eeeeee] group cursor-pointer" onClick={() => setSelectedAddress(`${item}, ${k.ffa}`)}>
                                                                            <div className="flex justify-center items-center size-8 bg-[#eeeeee] group-hover:bg-white rounded-[--global-radius-md]">
                                                                                <svg className="flex justify-center items-center size-4" width={16} height={16}>
                                                                                    <use
                                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd"
                                                                                    ></use>
                                                                                </svg>
                                                                            </div>

                                                                            <div className="flex flex-col justify-end items-center w-full">
                                                                                <div className="flex justify-end items-center w-full text-base font-medium text-right">
                                                                                    {item}
                                                                                </div>

                                                                                <div className="flex justify-end items-center w-full pl-4 text-xs text-[#494949] text-right">
                                                                                    {k.ffa}
                                                                                </div>
                                                                            </div>
                                                                        </li>)}
                                                                    </div>
                                                                ))}
                                                            </ul>
                                                        ))}

                                                        {results.filter((result) => {
                                                            if (!result?.address?.municipalitySubdivision?.includes(',')) {
                                                                return result
                                                            }
                                                        }).map((result, index) => (
                                                            <li key={index} className="flex justify-between items-center w-full h-auto min-h-12 py-1 px-4 bg-white hover:bg-[#eeeeee] group cursor-pointer" onClick={() => setSelectedAddress(result.address.freeformAddress)}>
                                                                <div className="flex justify-center items-center size-8 bg-[#eeeeee] group-hover:bg-white rounded-[--global-radius-md]">
                                                                    <svg className="flex justify-center items-center size-4" width={16} height={16}>
                                                                        <use
                                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd"
                                                                        ></use>
                                                                    </svg>
                                                                </div>

                                                                <div className="flex flex-col justify-end items-center w-full">
                                                                    {!(result.poi && result.address.municipalitySubdivision) ? (
                                                                        <div className="flex justify-end items-center w-full text-base font-medium text-right">
                                                                            {result.poi && result.poi.name}&nbsp;{result.address.municipalitySubdivision && result.address.municipalitySubdivision}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex justify-end items-center w-full text-base font-medium text-right">
                                                                            {`${result.poi.name}, ${result.address.municipalitySubdivision && result.address.municipalitySubdivision}`}
                                                                        </div>
                                                                    )}

                                                                    <div className="flex justify-end items-center w-full pl-4 text-xs text-[#494949] text-right">
                                                                        {`${result?.address?.freeformAddress}, ${result?.address?.countrySecondarySubdivision}`}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative z-[200] flex flex-col justify-start items-center w-full h-auto py-4 bg-white rounded-lg">
                                    <div className="flex justify-start items-center w-full h-6 px-4">
                                        <svg
                                            className="flex justify-center items-center size-6 cursor-pointer"
                                            onClick={() => setIsAddressChooser(false)}
                                            width={24} height={24}
                                        >
                                            <use
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"
                                            ></use>
                                        </svg>
                                    </div>

                                    <div className="block justify-start items-center w-full mt-2 space-y-2">
                                        <div className="flex justify-start items-center w-full px-4">
                                            <button className="flex justify-center items-center w-full py-3 rounded-lg bg-[#eeeeee] hover:bg-[#e5e5e5] no-outline"
                                                onClick={() => {
                                                    deleteCookie('user_address')
                                                    setIsAddressChooser(true)
                                                    setQuery('')
                                                    setSelectedAddress('')
                                                    router.push(`?rmd=${(Math.random() * 1000).toFixed(0)}`)
                                                }}
                                            >
                                                <div className="flex justify-start items-center w-10 h-4">
                                                    <svg className="flex justify-center items-center size-full" width={16} height={16}>
                                                        <use
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-pin_dd"
                                                        ></use>
                                                    </svg>
                                                </div>

                                                <div className="flex flex-col justify-start items-center w-full text-left">
                                                    <div className="flex justify-start items-center w-full font-bold text-base !leading-none">
                                                        {getCookie('user_address')}
                                                    </div>

                                                    <div className="flex justify-start items-center w-full mt-1 text-sm font-medium underline text-[#494949] !leading-none cursor-pointer">
                                                        Change your delivery address
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default SelectLocation