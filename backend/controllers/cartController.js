import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

const addTocart = async (req, res) => {
    try {
        const { productId, qty } = req.body;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        let cartitem = await cartModel.findOne({ productId });
        if (cartitem) {
            cartitem.qty += qty;
            await cartitem.save();
            return res.status(200).json({
                message: "Product quantity updated in cart",
                cartitem,
            });
        }
        const newcartitem = new cartModel({ productId, qty });
        await newcartitem.save();

        return res.status(201).json({
            message: "Added to cart!",
            cartitem: newcartitem,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getCart = async (req, res) => {
    try {
        const cartitems = await cartModel.find().populate("productId");
        if (cartitems.length === 0) {
            return res.status(404).json({ message: "Cart is empty" })
        }
        const total = cartitems.reduce(
            (sum, item) => sum + item.productId.price * item.qty,
            0
        );
        res.status(200).json({ cartitems, total });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await cartModel.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        res.status(200).json({ message: "Product removed from cart" })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export { addTocart, getCart, removeFromCart };