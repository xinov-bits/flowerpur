import React from 'react';
import axios from 'axios';

interface RazorpayOrderResponse {
    id: string;
    currency: string;
    amount: number;
}

type Props = {
    products: Object,
    subTotal: Number,
}


const CheckoutButton = (props: Props) => {
    const initializeRazorpay = (): Promise<boolean> => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const makePayment = async () => {
        const res = await initializeRazorpay();
        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        try {
            // Make API call to the serverless API
            const response = await axios.post<RazorpayOrderResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/initiateOrder`, {
                taxAmt: props.subTotal
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;

            const options: RazorpayOptions = {
                key: process.env.RAZORPAY_KEY_ID as string, // Enter the Key ID generated from the Dashboard
                name: "Flowerpur",
                currency: data.currency,
                amount: data.amount,
                order_id: data.id,
                description: "Thank you for purchasing.",
                image: "/assets/Logo/logo_icon-dark__svg.svg",
                handler: function (response) {
                    alert("Razorpay Response: " + response.razorpay_payment_id);
                },
                prefill: {
                    name: "flowepur",
                    email: "flowerpur@gmail.com",
                    contact: '9811122686'
                },
                theme: {
                    "color": "#ffa800"
                }
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.log("Error during payment initialization:", error);
            alert("Failed to initiate payment. Please try again.");
        }
    };

    return (
        <>
            <button
                className="flex justify-between items-center w-full h-full px-4 bg-[--global-button-color-default] hover:bg-[--global-button-color-hover] rounded-[--global-radius-md] text-white font-bold cursor-pointer"
                onClick={makePayment}
            >
                <div className="flex justify-start items-center w-auto h-full">
                    Place Order
                </div>

                <div className="flex justify-start items-center w-auto h-full">
                    <div> ₹{props.subTotal.toFixed(2)} </div>
                </div>
            </button>
        </>
    );
};

interface RazorpayOptions {
    key: string;
    name: string;
    currency: string;
    amount: number;
    order_id: string;
    description: string;
    image: string;
    handler: (response: any) => void;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    theme: Object;
}

export default CheckoutButton;