const mongoose = require('mongoose');

const CouponsSchema = new mongoose.Schema({

    code: { type: String, required: true, unique: true },
    
    discountType: { type: String, required: true },
    discountAmount: { type: String, required: true },
    
    expiry: { type: String, required: false, default: '' },

}, { timestamps: true });


mongoose.models = {}
export default mongoose.model("Coupons", CouponsSchema);
// export default mongoose.models.Coupons || mongoose.model("Coupons", CouponsSchema);