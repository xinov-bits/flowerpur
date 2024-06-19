import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { Suspense } from "react";

export function GlobalProvider({ children }) {
    return <Suspense>
        <CartProvider>
            <UserProvider>
                    {children}
            </UserProvider>
        </CartProvider>
    </Suspense>
}