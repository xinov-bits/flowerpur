const mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    stars: { type: Number, required: true, default: 5 },
    email: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true, default: 'The Product was good, as expected.' },
    
    pname: { type: String, required: true },
    img: { type: String, required: false, default: '' },

    approved: { type: Boolean, required: false, default: false },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("Review", ReviewSchema);
// export default mongoose.models.Address || mongoose.model("Review", ReviewSchema);