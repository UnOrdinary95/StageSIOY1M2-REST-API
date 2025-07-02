import { getDb } from "../config/db";
import { ObjectId } from "mongodb";

interface Product {
    _id?: ObjectId;
    name: string;
    price: number;
    inStock: boolean;
    description?: string;
}

const COLLECTION_NAME = "Product";

// CREATE
export const insertOneProduct = async (product: Product) => {
    try {
        const db = getDb();
        const result = await db.collection(COLLECTION_NAME).insertOne(product);
        return { ...product, _id: result.insertedId.toString() };
    } catch (err) {
        console.error("Erreur lors de la création du produit :", err);
        throw new Error("Erreur lors de la création du produit");
    }
};

// READ
export const findAllProducts = async () => {
    try {
        const db = getDb();
        // Exclure le champ 'description' de la projection
        const products = await db.collection(COLLECTION_NAME).find({}, { projection: { description: 0 } }).toArray();
        return products;
    } catch (err) {
        console.error("Erreur lors de la récupération des produits :", err);
        throw new Error("Erreur lors de la récupération des produits");
    }
};

export const findOneProduct = async (id: string) => {
    try {
        const db = getDb();
        const product = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
        if (!product) {
            throw new Error("Produit non trouvé");
        }
        return product;
    } catch (err) {
        console.error("Erreur lors de la récupération du produit :", err);
        throw new Error("Erreur lors de la récupération du produit");
    }
};

// UPDATE
export const updateOneProduct = async (id: string, productData: Partial<Product>) => {
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
export const deleteOneProduct = async (id: string) => {
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