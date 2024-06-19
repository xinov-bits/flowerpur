const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },

    cart: { type: Object, required: true, default: {} },

    key: { type: String, required: true, unique: true },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("User", UserSchema);
// export default mongoose.models.User || mongoose.model("User", UserSchema);