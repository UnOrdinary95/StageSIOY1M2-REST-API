import { Request, Response } from "express";
import { deleteOneProduct, findAllProducts, findOneProduct, insertOneProduct, updateOneProduct } from "../models/productModel.js";

// CREATE
export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        const newProduct = await insertOneProduct(product);
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Erreur lors de la création du produit :", err);
        res.status(500).json({ error: "Impossible de créer le produit" });
    }
};

// READ
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await findAllProducts();
        res.status(200).json(products);
    } catch (err) {
        console.error("Erreur lors de la récupération des produits :", err);
        res.status(500).json({ error: "Erreur lors de la récupération des produits" });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
        const product = await findOneProduct(productId);
        res.status(200).json(product);
    } catch (err) {
        console.error("Erreur lors de la récupération du produit :", err);
        res.status(500).json({ error: "Erreur lors de la récupération du produit" });
    }
};

// UPDATE
export const updateProductById = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const productData = req.body;
    try {
        const updatedProduct = await updateOneProduct(productId, productData);
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error("Erreur lors de la mise à jour du produit :", err);
        res.status(500).json({ error: "Erreur lors de la mise à jour du produit" });
    }
};

// DELETE
export const deleteProductById = async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
        const result = await deleteOneProduct(productId);
        res.status(200).json(result);
    } catch (err) {
        console.error("Erreur lors de la suppression du produit :", err);
        res.status(500).json({ error: "Erreur lors de la suppression du produit" });
    }
};