import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

const checkout = async (req, res) => {
    try {
        const { cartItems, name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        const products = await Promise.all(
            cartItems.map((item) => productModel.findById(item.productId))
        );

        for (let i = 0; i < products.length; i++) {
            if (!products[i]) {
                return res.status(404).json({
                    message: `Product not found: ${cartItems[i].productId}`,
                });
            }
        }
        const total = products.reduce((acc, product, index) => {
            return acc + product.price * cartItems[index].qty;
        }, 0);
        const receipt = {
            customer: {
                name,
                email,
            },
            total,
            items: cartItems.map((item, index) => ({
                productName: products[index].name,
                quantity: item.qty,
                price: products[index].price,
                subtotal: products[index].price * item.qty,
            })),
            timestamp: new Date().toISOString(),
        };
        await cartModel.deleteMany({});
        res.status(200).json({
            message: "Checkout successful!",
            receipt,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { checkout };
