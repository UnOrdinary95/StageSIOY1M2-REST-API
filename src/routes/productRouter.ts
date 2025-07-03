import { Router } from "express";
import { getProducts, getProductById, deleteProductById, createProduct, updateProductById } from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";

const productRouter = Router();

// CREATE
productRouter.post("/", authMiddleware, createProduct);

// READ
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);

// UPDATE
productRouter.put("/:id", authMiddleware, updateProductById);

// DELETE
productRouter.delete("/:id", authMiddleware, deleteProductById);

export default productRouter;
