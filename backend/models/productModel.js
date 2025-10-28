import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    description: {
        type: String, required: true
    },
    createdAt: {
        type: Date, default: Date.now
    }
});

const productModel = new mongoose.model("product", Schema);

export default productModel;