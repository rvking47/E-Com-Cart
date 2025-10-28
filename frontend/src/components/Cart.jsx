import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaCartShopping } from 'react-icons/fa6';
import Checkout from './Checkout';

const base_url = "http://localhost:4000";

const Cart = () => {
    const [cartItem, setCartItem] = useState([]);
    const [total, setTotal] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);

    const handleFetch = async () => {
        try {
            const result = await axios.get(`${base_url}/api/cart`, {
                validateStatus: () => true,
            });
            if (result.status === 200) {
                setCartItem(result.data.cartitems);
                setTotal(result.data.total);
            }
        } catch (err) {
            toast.error("Server Error!! " + err.message);
        }
    };

    const handleRemove = async (cartId) => {
        try {
            const result = await axios.delete(`${base_url}/api/cart/${cartId}`, {
                validateStatus: () => true,
            });
            if (result.status === 200) {
                toast.success(result.data.message);
                handleFetch();
            } else {
                toast.error("Failed to remove item!");
            }
        } catch (err) {
            toast.error("Server Error!! " + err.message);
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <>
            <div className="heading-product my-6">
                <h1 className="flex items-center justify-center gap-3 text-4xl font-extrabold text-gray-800 mb-8 text-center italic">
                    <FaCartShopping className="text-5xl" />
                    Cart List
                </h1>
                <Container>
                    <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                        <table className="min-w-full text-sm text-gray-700 border border-gray-200">
                            <thead className="bg-green-600 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">S.No</th>
                                    <th className="px-4 py-3 text-left">Product Name</th>
                                    <th className="px-4 py-3 text-left">Qty</th>
                                    <th className="px-4 py-3 text-left">Total</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItem.length > 0 ? (
                                    cartItem.map((val, index) => (
                                        <tr
                                            key={val._id}
                                            className="border-b hover:bg-gray-50 transition-all"
                                        >
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3 font-semibold">
                                                {val.productId.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {val.qty}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-green-600">
                                                ₹{val.productId.price * val.qty}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() => handleRemove(val._id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition-all duration-300 shadow-sm"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-6 text-gray-500 font-medium"
                                        >
                                            Your cart is empty
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {cartItem.length > 0 && (
                        <div className="flex justify-end mt-6">
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-right">
                                <h2 className="text-xl font-semibold text-gray-700">
                                    Total: <span className="text-indigo-600">₹{total}</span>
                                </h2>
                                <button
                                    onClick={() => setShowCheckout(true)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md transition-all shadow"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </Container>
            </div>
            <Checkout show={showCheckout} cartItems={cartItem}  handleClose={() => setShowCheckout(false)} total={total} />
            <Toaster />
        </>
    );
};

export default Cart;
