import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Flowerpur - Online Gift Delivery, Send Gifts Online",
  description: "Online Gift Delivery, Send Gifts Online",
};

// REACT & NEXT JS "" VERCEL
import { Analytics } from "@vercel/analytics/react"

// COMPONENTS
import Header from "../components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${figtree.className} overflow-x-hidden`}>
        {/* ANALYTICS */}
        <Analytics/>

        {/* HEADER */}
        <Header />

        {children}
      </body>
    </html>
  );
}
