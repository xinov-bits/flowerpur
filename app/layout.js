"use client"

import { Figtree } from "next/font/google";
import "./globals.css";
const figtree = Figtree({ subsets: ["latin"] });

// export const metadata = {
//   title: "Flowerpur - Online Gift Delivery, Send Gifts Online",
//   description: "Online Gift Delivery, Send Gifts Online",
// };

// REACT & NEXT JS "" VERCEL
import React, { useState, useEffect, Suspense } from 'react';
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      <body className={`${figtree.className} overflow-x-hidden mt-[176px] sm:mt-[176px] md:mt-[112px] lg:mt-[112px] xl:mt-[112px] ${additionalMargin}`}>
        <Analytics />
        <SpeedInsights />

        <Suspense>
          <GlobalProvider>
            <Header />

            {children}

            <Footer />
          </GlobalProvider>
        </Suspense>
      </body>
    </html>
  );
}