import { getDb } from "../config/db.js";
import { ObjectId } from "mongodb";
import { Product, ProductDB } from "../interfaces/Product.js";
import { CartItem } from "../interfaces/CartItem.js";
import { convertObjectIdToProductIdStr, convertProductIdStrToObjectId } from "../utils/productUtils.js";

const COLLECTION_NAME = "Product";

// CREATE
export const insertOneProduct = async (product: Product): Promise<Product> => {
    try {
        const db = getDb();
        const productWithObjectId = convertProductIdStrToObjectId(product);
        const result = await db.collection<ProductDB>(COLLECTION_NAME).insertOne(productWithObjectId);
        return { ...product, _id: result.insertedId.toString() };
    } catch (err) {
        console.error("Erreur lors de la création du produit :", err);
        throw new Error("Erreur lors de la création du produit");
    }
};

// READ
export const findAllProducts = async (): Promise<Product[]> => {
    try {
        const db = getDb();
        const products = await db.collection<ProductDB>(COLLECTION_NAME).find().toArray();
        return products.map(product => convertObjectIdToProductIdStr(product));
    } catch (err) {
        console.error("Erreur lors de la récupération des produits :", err);
        throw new Error("Erreur lors de la récupération des produits");
    }
};

export const findOneProduct = async (id: string): Promise<Product> => {
    try {
        const db = getDb();
        const product = await db.collection<ProductDB>(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
        if (!product) {
            throw new Error("Produit non trouvé");
        }
        return convertObjectIdToProductIdStr(product);
    } catch (err) {
        console.error("Erreur lors de la récupération du produit :", err);
        throw new Error("Erreur lors de la récupération du produit");
    }
};

// UPDATE
export const updateOneProduct = async (id: string, productData: Partial<Product>): Promise<{ message: string }> => {
    try {
        const db = getDb();
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: productData }
        );
        if (result.matchedCount === 0) {
            throw new Error("Produit non trouvé");
        }
        return { message: "Produit mis à jour avec succès" };
    } catch (err) {
        console.error("Erreur lors de la mise à jour du produit :", err);
        throw new Error("Erreur lors de la mise à jour du produit");
    }
};

// DELETE
export const deleteOneProduct = async (id: string): Promise<{ message: string }> => {
    try {
        const db = getDb();
        const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            throw new Error("Produit non trouvé");
        }
        return { message: "Produit supprimé avec succès" };
    } catch (err) {
        console.error("Erreur lors de la suppression du produit :", err);
        throw new Error("Erreur lors de la suppression du produit");
    }
};

// UTILS
export async function productExists(cart: CartItem[]): Promise<void> {
    for (const item of cart) {
        await findOneProduct(item.productId);
    }
};
