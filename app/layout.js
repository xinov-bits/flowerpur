"use client"

import { Figtree } from "next/font/google";
import "./globals.css";
const figtree = Figtree({ subsets: ["latin"] });
// export const metadata = {
//   title: "Flowerpur - Online Gift Delivery, Send Gifts Online",
//   description: "Online Gift Delivery, Send Gifts Online",
// };

// REACT & NEXT JS "" VERCEL
import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

// COMPONENTS
import Header from "../components/layout/Header";
import Footer from "@/components/layout/Footer";

// CRYPTO JS
import CryptoJS from "crypto-js";

// CONTEXT
import { GlobalProvider } from "./GlobalProvider";
import UserContext from "@/context/UserContext";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${figtree.className} overflow-x-hidden`}>
        <Analytics />

        <GlobalProvider>
          <Header />

          {children}

          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}