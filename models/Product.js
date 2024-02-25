const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    // desc: { type: String, required: true },

    dimg: { type: String, required: true },
    img1: { type: String, required: true },

    catagory: { type: String, required: true },
    subCatagory: { type: String, required: false },

    availableQty: { type: Number, required: true },

    price: { type: Number, required: true },

    sku: { type: Number, required: true, unique: true },

}, { timestamps: true });


mongoose.models = {}
export default mongoose.model("Product", ProductSchema);
// export default mongoose.models.Product || mongoose.model("Product", ProductSchema);