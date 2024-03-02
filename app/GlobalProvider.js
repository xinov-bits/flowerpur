import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";

export function GlobalProvider({ children }) {
    return <CartProvider>
        <UserProvider>
            {children}
        </UserProvider>
    </CartProvider>;
}