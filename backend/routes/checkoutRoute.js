import express from "express";
import { checkout } from "../controllers/checkoutController.js";

const checkrouter = express.Router();

checkrouter.post("/checkout", checkout);

export default checkrouter;
