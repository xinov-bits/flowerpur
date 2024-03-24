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
import { usePathname, useRouter } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

// CONTEXT
import { GlobalProvider } from "./GlobalProvider";

// COMPONENTS
import Header from "@/components/layout/Header";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/layout/SplashScreen";
import MobileBar from "@/components/layout/MobileBar";

export default function RootLayout({ children }) {
  const router = useRouter();
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
      <body className={`${figtree.className} overflow-x-hidden mt-[194px] sm:mt-[194px] md:mt-[128px] lg:mt-[128px] xl:mt-[128px] pb-32 ${additionalMargin}`}>
        <Analytics />
        <SpeedInsights />

        <Suspense fallback={<SplashScreen />}>
          <GlobalProvider>
            <SplashScreen />

            <Header />
            <MobileHeader />
            
            <MobileBar />

            {children}

            <Footer />
          </GlobalProvider>
        </Suspense>
      </body>
    </html>
  );
}