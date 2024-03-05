'use client'

import React, { useEffect, useState } from 'react'

// NEXT JS
import Link from 'next/link'
import Image from "next/image";

// FRAMER MOTION
import { AnimatePresence, motion } from 'framer-motion';

// AXIOS
import axios from 'axios';

// COMPONENTS
import { InputField } from '@/components/core/InputField';

// SHADCN UI
import toast, { Toaster } from 'react-hot-toast';

const notify = (status, content) => toast.custom((t) => (
    <AnimatePresence>
        {t.visible && (<motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                // ease: 'linear',
                delay: 0,
                // duration: 0.1,
            }}
            className={
                `flex justify-between items-center max-w-72 w-full h-12 p-2 ${status === 'success' ? 'bg-[#F3F8F4]' : 'bg-[#FBF4F3]'} border ${status === 'success' ? 'border-[#117829]' : 'border-[#ad2314]'} rounded-full pointer-events-auto`
            }

            onClick={() => toast.dismiss(t.id)}
        >
            <div className="flex justify-start items-center w-auto h-full space-x-1 select-none">
                <div className="flex justify-end items-center w-auto h-full">
                    <div className="flex justify-center items-center w-6 h-full">
                        {status === 'success' && (
                            <svg className="flex justify-center items-center w-4 h-4 text-[#117829]">
                                <use xlinkHref="/on/demandware/svg/non-critical.svg#icon-check_dd"></use>
                            </svg>
                        )}
                        {status === 'error' && (
                            <svg className="flex justify-center items-center w-5 h-5 text-[#ad2314]">
                                <use xlinkHref="/on/demandware/svg/non-critical.svg#icon-close_dd"></use>
                            </svg>
                        )}
                    </div>
                </div>

                <div className={`flex justify-center items-center font-medium leading-none ${status === 'success' ? 'text-[#117829]' : 'text-[#ad2314]'}`}>
                    {content}
                </div>
            </div>
        </motion.div>)}
    </AnimatePresence>
))

const Page = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState(0);


    // SIGN UP
    const [signupLoading, setSignupLoading] = useState(false);

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name: userName,
            email: userEmail,
            phone: parseInt(userPhone)
        }


        setSignupLoading(true);

        setTimeout(async () => {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, [
                    userData
                ]);

                if (res.status === 200) {
                    notify('success', 'Account successfully created.');
                }
            } catch (error) {
                if (error.response.data?.details.includes('E11000 duplicate key error')) {
                    notify('error', 'Account already exists.');
                } else {
                    console.log('An error occurred while signing up:', error);
                }
            }

            setSignupLoading(false);
        }, 1500);
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full h-auto bg-white py-8 sm:py-8 md:py-8 lg:py-8 xl:py-8 text-[#494949]">
                <div className="flex flex-col w-full max-w-3xl h-auto px-6 sm:px-6 md:px-10 lg:px-10 xl:px-10">
                    <div className="flex flex-col justify-center items-center w-full select-none">
                        <div className="flex justify-start items-center w-full text-2xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-[#191919]">
                            Sign Up
                        </div>

                        <div className="flex justify-center items-center w-full h-full mt-6">
                            <form className="block justify-start items-center w-full h-full space-y-5" onSubmit={handleSignupSubmit}>
                                <div className="flex justify-start items-center w-full h-auto leading-none text-base font-medium">
                                    <InputField
                                        name={'sign_up-name'}
                                        type={'text'}
                                        placeholder={'Full Name'}
                                        change={[userName, setUserName]}
                                    />
                                </div>

                                <div className="flex justify-start items-center w-full h-auto leading-none text-base font-medium">
                                    <InputField
                                        name={'sign_up-email'}
                                        type={'email'}
                                        placeholder={'Email Address'}
                                        change={[userEmail, setUserEmail]}
                                    />
                                </div>

                                <div className="flex justify-start items-center w-full h-auto leading-none text-base font-medium">
                                    <InputField
                                        name={'sign_up-phone'}
                                        type={'tel'}
                                        placeholder={'Phone Number'}
                                        change={[userPhone, setUserPhone]}
                                    />
                                </div>


                                <div className="flex flex-col justify-start items-end w-full h-20 sm:h-20 md:h-20 lg:h-20 xl:h-20">
                                    <div className="flex justify-end items-center w-full h-auto mb-2.5 leading-none text-lg font-medium text-[#767676]">
                                        <div> or </div>
                                        &nbsp;
                                        <Link href="/auth/signin" className="underline text-[#292929] no-outline">
                                            sign in
                                        </Link>
                                    </div>

                                    {(!(
                                        userEmail === '' &&
                                        userEmail.length === 0 &&
                                        userPhone === '' &&
                                        userPhone.length === 0 &&
                                        userName === '' &&
                                        userName.length === 0)
                                        &&
                                        (
                                            userEmail.includes('@') &&
                                            userPhone.length === 10
                                        )
                                    ) ? <div className="flex justify-start items-center w-full h-full leading-none text-xl sm:text-xl md:text-base lg:text-base xl:text-base font-semibold">
                                        {!signupLoading ? <button className="flex justify-center items-center w-full h-full px-4 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] rounded-full text-white font-bold duration-75" type="submit">
                                            Continue to Sign Up
                                        </button>
                                            :
                                            <button className="flex justify-center items-center w-full h-full px-4 bg-[#085b45] hover:bg-[#09674d] active:bg-[#064434] rounded-full text-white font-bold duration-75" type="button">
                                                <svg className="animate-[spin_600ms_linear_infinite]" width={16} height={16}>
                                                    <use
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        xlinkHref="/on/demandware/svg/non-critical.svg#icon-spinner_dd"
                                                    ></use>
                                                </svg>
                                            </button>}
                                    </div>
                                        :
                                        <div className="flex justify-start items-center w-full h-full leading-none text-xl sm:text-xl md:text-base lg:text-base xl:text-base font-semibold">
                                            <button className="flex justify-center items-center w-full h-full px-4 bg-[#085b45] rounded-full text-white font-bold saturate-0 opacity-40" type="button">
                                                Continue to Sign Up
                                            </button>
                                        </div>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div>
        </>
    )
}

export default Page