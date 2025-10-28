import express from "express";
import { create, view } from "../controllers/productController.js";
import validationProduct from "../validators/validation.js";

const productRoute = express.Router();

productRoute.get("/products/view", view);
productRoute.post("/products/create", validationProduct, create);

export default productRoute;