import { Request, Response } from "express";
import { deleteOneProduct, findAllProducts, findOneProduct, insertOneProduct, updateOneProduct } from "../models/productModel.js";
import { getAuthUser } from "../utils/authUserUtils.js";
import { Product } from "../interfaces/Product.js";
import { checkAdminAccess } from "../utils/authUserUtils.js";

// CREATE
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const currentUser = getAuthUser(req);

        if (!checkAdminAccess(currentUser, res)) return;

        const product: Product = req.body;
        const newProduct = await insertOneProduct(product);
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Erreur lors de la création du produit :", err);
        res.status(500).json({ error: "Impossible de créer le produit" });
    }
};

// READ
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await findAllProducts();
        res.status(200).json(products);
    } catch (err) {
        console.error("Erreur lors de la récupération des produits :", err);
        res.status(500).json({ error: "Erreur lors de la récupération des produits" });
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
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
export const updateProductById = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;
    const currentUser = getAuthUser(req);

    if (!checkAdminAccess(currentUser, res)) return;

    const productData: Partial<Product> = req.body;
    try {
        const updatedProduct = await updateOneProduct(productId, productData);
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error("Erreur lors de la mise à jour du produit :", err);
        res.status(500).json({ error: "Erreur lors de la mise à jour du produit" });
    }
};

// DELETE
export const deleteProductById = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;
    const currentUser = getAuthUser(req);

    if (!checkAdminAccess(currentUser, res)) return;

    try {
        const result = await deleteOneProduct(productId);
        res.status(200).json(result);
    } catch (err) {
        console.error("Erreur lors de la suppression du produit :", err);
        res.status(500).json({ error: "Erreur lors de la suppression du produit" });
    }
};
