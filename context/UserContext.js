'use client';

// REACT JS
import React, { useState, useEffect, useContext, createContext } from 'react'
import { useRouter } from "next/navigation"

// CRYPTO JS
import CryptoJS from 'crypto-js'

// CONTEXT
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const router = useRouter();

    const [user, setUser] = useState('');
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);

    useEffect(() => {
        if (
            localStorage.getItem('user') !== undefined &&
            localStorage.getItem('user') !== null &&
            localStorage.getItem('user') !== ''
        ) {
            setIsUserSignedIn(true);
        }
    }, [router])

    useEffect(() => {
        if (isUserSignedIn) {
            const AES_SECRET = '09182__signin__65701';

            const encUser = localStorage.getItem('user');

            let bytes = CryptoJS.AES.decrypt(encUser, AES_SECRET);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            setUser(JSON.stringify(decryptedData));
        }
    }, [isUserSignedIn])

    return (
        <UserContext.Provider
            value={{
                user,
                isUserSignedIn,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;