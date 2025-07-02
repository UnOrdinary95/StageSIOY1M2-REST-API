import { Router } from "express";
import { getProducts, getProductById, deleteProductById, createProduct, updateProductById } from "../controllers/productController";

const productRouter = Router();

// CREATE
productRouter.post("/", createProduct);

// READ
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);

// UPDATE
productRouter.put("/:id", updateProductById)

// DELETE
productRouter.delete("/:id", deleteProductById);

export default productRouter;