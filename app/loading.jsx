'use client';

// REACT JS
import React from 'react'

// NEXT JS
import Image from 'next/image';

// FRAMER
import { motion, AnimatePresence } from "framer-motion";

export default function Loading() {
    return (
        <>
            <div className="fixed z-[9999] top-0 left-0 justify-center items-center w-full h-full bg-white">
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <AnimatePresence>
                        <motion.div className="flex justify-center items-center size-full"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 0, opacity: 0 }}
                            transition={{
                                delay: 0,
                            }}
                        >
                            <Image className="flex justify-center items-center size-26"
                                width={110}
                                height={117}
                                src="/assets/Logo/logo_icon-dark__svg.svg"
                                alt=""
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </>
    )
}