"use client"

import React, { useState, useEffect, useContext } from 'react'

// NEXT JS
import Link from 'next/link'
import Image from 'next/image'

// CRYPTO JS
import CryptoJS from 'crypto-js'

// AXIOS
import axios from 'axios';

// CONTEXT
import CartContext from '@/context/CartContext';

const Footer = () => {
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


  const footerMenu = [
    {
      name: 'Suggested Link',
      links: [
        'Shop For Birthday',
        'Shop For Anniversary',
        'Shop For Occasions',
        'Shop All Flowers',
        'Shop All Gifts',
      ]
    },
    {
      name: 'About Company',
      links: [
        'About Us',
        'Sell with Us',
        'Cancellation & Refunds',
        'Retail Stores',
      ]
    },
    {
      name: 'Policy Info',
      links: [
        'Terms and Conditions',
        'Privacy Policy',
        'Terms and Use',
        'Disclaimer',
      ]
    },
    {
      name: 'Help',
      links: [
        'Contact Us',
        'FAQs',
      ]
    },
  ]

  const lowerFooterMenu = [
    {
      name: 'Terms & Service',
      url: '/',
    },
    {
      name: 'Privacy',
      url: '/',
    },
    {
      name: 'Delivery Locations',
      url: '/',
    },
  ]

  return (
    <>
      {isHeader && <footer>
        <div className="block justify-start items-center w-full h-full mt-auto p-6 sm:p-6 md:p-10 lg:p-10 xl:p-10 bg-white border-t border-[#e5e5e5] overflow-x-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-y-4 sm:gap-y-4 md:gap-y-0 lg:gap-y-0 xl:gap-y-0 justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start items-start w-full h-full text-center sm:text-center md:text-left lg:text-left xl:text-left text-[#191919]">
            {footerMenu.map((k, index) => <div key={index} className="block justify-center items-center w-full">
              <div className="flex justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start items-center w-auto text-lg font-semibold leading-none">
                {k.name}
              </div>

              <ul className="block justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start items-center w-auto mt-2 font-medium leading-none text-[#767676]">
                {(k.links).map((link, index) => <li key={link} className="flex justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start items-center w-auto py-2 hover:underline hover:text-[#191919] cursor-pointer">
                  <Link href="/">
                    {link}
                  </Link>
                </li>)}
              </ul>
            </div>)}

            <div className="flex justify-center items-center w-full">
              <ul className="hidden sm:hidden md:block lg:block xl:block justify-start items-center w-full space-y-2">
                <li className="flex justify-end items-center w-full">
                  <Link href="/" className="flex justify-center items-center w-auto cursor-pointer no-outline duration-100">
                    <Image className="flex justify-center items-center w-full h-12"
                      width={120}
                      height={40}
                      src="/assets/footer/app-store-badge.svg"
                      alt="app store icon"
                    />
                  </Link>
                </li>

                <li className="flex justify-end items-center w-full">
                  <Link href="/" className="flex justify-center items-center w-auto cursor-pointer no-outline duration-100">
                    <Image className="flex justify-center items-center w-full h-12"
                      width={120}
                      height={40}
                      src="/assets/footer/google-play-badge.svg"
                      alt="google play icon"
                    />
                  </Link>
                </li>
              </ul>

              <ul className="flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-center w-full space-x-2">
                <li className="flex justify-center items-center w-full">
                  <Link href="/" className="flex justify-center items-center w-auto cursor-pointer no-outline duration-100">
                    <Image className="flex justify-center items-center w-full h-12"
                      width={120}
                      height={40}
                      src="/assets/footer/app-store-badge.svg"
                      alt="app store icon"
                    />
                  </Link>
                </li>

                <li className="flex justify-center items-center w-full">
                  <Link href="/" className="flex justify-center items-center w-auto cursor-pointer no-outline duration-100">
                    <Image className="flex justify-center items-center w-full h-12"
                      width={120}
                      height={40}
                      src="/assets/footer/google-play-badge.svg"
                      alt="google play icon"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center w-full h-full mt-8 text-[#191919]">
            <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-start items-center w-full space-x-4">
              <div className="flex justify-center items-center w-8 h-8 text-[#085b45] bg-[#f4fbeb] rounded-full">
                <Link className="no-outline" href={"/"}>
                  <svg className="flex justify-center items-center w-8 h-8" width={95} height={106}>
                    <use
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xlinkHref="/on/demandware/svg/logo.svg#logo_icon2"
                    ></use>
                  </svg>
                </Link>
              </div>


              <div className="flex justify-between items-center w-full">
                <ul className="flex justify-start items-center w-auto space-x-6 text-base">
                  {lowerFooterMenu.map((k, index) => <li key={index} className="flex justify-center items-center w-auto leading-none text-medium">
                    <Link href={k.url}>
                      {k.name}
                    </Link>
                  </li>)}

                  <li className="flex justify-center items-center w-auto leading-none text-medium">
                    © 2024 Flowerpur
                  </li>
                </ul>

                <div className="flex justify-end items-center w-auto text-base">
                  <ul className="flex justify-center items-center w-auto">
                    <li className="flex justify-center items-center w-8 h-8 space-x-2">
                      <Link href="/">
                        <svg className="flex justify-center items-center w-6 h-6 text-[#7f7f7f] hover:text-[#494949]" width={24} height={24}>
                          <use
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xlinkHref="/on/demandware/svg/footer.svg#icon-facebook"
                          ></use>
                        </svg>
                      </Link>
                    </li>

                    <li className="flex justify-center items-center w-8 h-8 text-[#7f7f7f] hover:text-[#494949]">
                      <Link href="/">
                        <svg className="flex justify-center items-center w-6 h-6" width={24} height={24}>
                          <use
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xlinkHref="/on/demandware/svg/footer.svg#icon-twitter"
                          ></use>
                        </svg>
                      </Link>
                    </li>

                    <li className="flex justify-center items-center w-8 h-8 text-[#7f7f7f] hover:text-[#494949]">
                      <Link href="/">
                        <svg className="flex justify-center items-center w-6 h-6" width={24} height={24}>
                          <use
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xlinkHref="/on/demandware/svg/footer.svg#icon-instagram"
                          ></use>
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="block sm:block md:hidden lg:hidden xl:hidden justify-center items-start w-full space-y-2">
              <div className="flex justify-center items-center w-full">
                <div className="flex justify-center items-center w-10 h-10 text-[#085b45] bg-[#f4fbeb] rounded-full">
                  <Link className="no-outline" href={"/"}>
                    <Image className="flex justify-center  items-center  size-[2.28rem]"
                      src="/assets/Logo/logo_icon__svg.svg"
                      width={117}
                      height={124}
                      alt="flowerpur logo mobile"
                    />
                  </Link>
                </div>
              </div>


              <div className="flex flex-col justify-center items-center w-full mt-2">
                <ul className="flex justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start items-center w-full space-x-4 text-base">
                  {lowerFooterMenu.map((k, index) => <li key={index} className="flex justify-center items-center w-auto leading-none text-medium">
                    <Link href={k.url}>
                      {k.name}
                    </Link>
                  </li>)}
                </ul>

                <div className="flex justify-end items-center w-full text-base">
                  <ul className="flex justify-center items-center w-full">
                    <li className="flex justify-center items-center w-auto leading-none text-medium">
                      © 2024 Flowerpur
                    </li>

                    <li className="flex justify-center items-center w-8 h-8 space-x-2">
                      <Link href="/">
                        <svg className="flex justify-center items-center w-6 h-6 text-[#7f7f7f] hover:text-[#494949]" width={24} height={24}>
                          <use
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xlinkHref="/on/demandware/svg/footer.svg#icon-facebook"
                          ></use>
                        </svg>
                      </Link>
                    </li>

                    <li className="flex justify-center items-center w-8 h-8 text-[#7f7f7f] hover:text-[#494949]">
                      <Link href="/">
                        <svg className="flex justify-center items-center w-6 h-6" width={24} height={24}>
                          <use
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xlinkHref="/on/demandware/svg/footer.svg#icon-twitter"
                          ></use>
                        </svg>
                      </Link>
                    </li>

                    <li className="flex justify-center items-center w-8 h-8 text-[#7f7f7f] hover:text-[#494949]">
                      <Link href="/">
                        <svg className="flex justify-center items-center w-6 h-6" width={24} height={24}>
                          <use
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xlinkHref="/on/demandware/svg/footer.svg#icon-instagram"
                          ></use>
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>}
    </>
  )
}

export default Footer