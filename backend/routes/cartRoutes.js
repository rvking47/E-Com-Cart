import express from "express";
import { addTocart, getCart, removeFromCart } from "../controllers/cartController.js";

const cartRouter=express.Router();

cartRouter.post("/cart", addTocart);
cartRouter.get("/cart", getCart);
cartRouter.delete("/cart/:id", removeFromCart);

export default cartRouter;