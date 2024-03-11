import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { Suspense } from "react";

export function GlobalProvider({ children }) {
    return <CartProvider>
        <UserProvider>
            <Suspense>
                {children}
            </Suspense>
        </UserProvider>
    </CartProvider>;
}