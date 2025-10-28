import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";

const base_url = "https://e-com-cart-5bca.onrender.com";

const Checkout = ({ show, handleClose, cartItems, total }) => {
    const [loading, setLoading] = useState(false);
    const [receipt, setReceipt] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleCheckout = async () => {
        if (!name || !email) {
            toast.error("Please enter your name and email");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(`${base_url}/api/checkout`, {
                name,
                email,
                cartItems,
            });
            if (response.status === 200) {
                toast.success(response.data.message, { duration: 3000 });
                setReceipt(response.data.receipt);
            } else {
                toast.error(response.data.message || "Checkout failed");
            }
        } catch (err) {
            toast.error("Server error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setReceipt(null);
        handleClose();
        window.location.reload();
    };

    return (
        <Modal show={show} onHide={handleModalClose} centered>
            {!receipt ? (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Checkout</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className="text-gray-700 mb-3">
                            Your total amount is <strong>₹{total}</strong>.
                        </p>
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                        <p>Are you sure you want to place the order?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="success"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Confirm Order"}
                        </Button>
                    </Modal.Footer>
                </>
            ) : (
                <>
                    <Modal.Header>
                        <Modal.Title>Order Receipt</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-gray-700 mb-2">
                            <strong>Name:</strong> {receipt.customer?.name}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Email:</strong> {receipt.customer?.email}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Total:</strong> ₹{receipt.total}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Date:</strong>{" "}
                            {new Date(receipt.timestamp).toLocaleString()}
                        </p>
                        <p className="text-green-600 font-semibold mt-3">
                            Your order has been placed successfully!
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleModalClose}>
                            Done
                        </Button>
                    </Modal.Footer>
                </>
            )}
        </Modal>
    );
};

export default Checkout;
