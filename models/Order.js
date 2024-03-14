const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    products: { type: Object, required: true },
    amount: { type: Number, required: true },
    
    pincode: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },

    transactionId: { type: String, default: "" },
    orderId: { type: String, required: true },
    paymentInfo: { type: String, default: '' },
    status: { type: String, required: true, default: 'Initiated' },
    deliveryStatus: { type: String, required: true, default: 'unshipped' },

    invoiceNumber: { type: String, required: true },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("Order", OrderSchema);