import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    qty: {
        type: Number,
        default: 1,
        min: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const cartModel = mongoose.model("cartitem", Schema);

export default cartModel;