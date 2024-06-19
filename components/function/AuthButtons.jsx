'use client';

// REACT JS
import React, { useState } from 'react'

// NEXT JS
import Link from 'next/link';

const AuthButtons = () => {
    return (
        <>
            <li className="relative flex flex-col justify-center items-center size-10 hover:bg-[#eeeeee] rounded-[--global-radius-full] cursor-pointer duration-100">
                <svg className="flex justify-center items-center size-6 !text-[#333]" width={20} height={20} fill="none">
                    <use
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xlinkHref="/on/demandware/svg/critical.svg#icon-my-account"
                    ></use>
                </svg>
            </li>
        </>
    )
}

export default AuthButtons