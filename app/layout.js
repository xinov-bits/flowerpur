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
import { usePathname } from "next/navigation";

// COMPONENTS
import Header from "../components/layout/Header";
import Footer from "@/components/layout/Footer";

// CONTEXT
import { GlobalProvider } from "./GlobalProvider";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // SHOW HEADER
  const [isHeader, setIsHeader] = useState(true);
  const [additionalMargin, setAdditionalMargin] = useState(' ');

  useEffect(() => {
    setIsHeader(!(pathname?.includes('checkout')));
  }, [pathname]);

  useEffect(() => {
    isHeader === false ? setAdditionalMargin('!mt-0') : setAdditionalMargin('')
  }, [isHeader, pathname]);

  return (
    <html lang="en">
      <body className={`${figtree.className} overflow-x-hidden mt-[216px] sm:mt-[216px] md:mt-[144px] lg:mt-[144px] xl:mt-[144px] ${additionalMargin}`}>
        <Analytics />

        <GlobalProvider>
          <Suspense>
            <Header />

            {children}

            <Footer />
          </Suspense>
        </GlobalProvider>
      </body>
    </html>
  );
}