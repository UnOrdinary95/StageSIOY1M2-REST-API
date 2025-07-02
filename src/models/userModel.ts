import { getDb } from "../config/db";
import { ObjectId } from "mongodb";
import { User } from "../interfaces/User";
import { CartItem } from "../interfaces/CartItem";
import { findOneProduct } from "./productModel";

const COLLECTION_NAME = "User";

// CREATE
export const insertOneUser = async (user: User) => {
    try {
        const db = getDb();

        if (user.cart) {
            await productExists(user.cart);
        }

        const result = await db.collection(COLLECTION_NAME).insertOne(user);
        return { ...user, _id: result.insertedId };
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la création de l'utilisateur");
    }
};

// READ
export const findAllUsers = async () => {
    try {
        const db = getDb();
        const users = await db.collection(COLLECTION_NAME).find().toArray();

        return users;

    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la récupération des utilisateurs");
    }
};

export const findOneUser = async (id: string) => {
    try {
        const db = getDb();
        const user = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        return user;
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
};

// UPDATE
export const updateOneUser = async (id: string, userData: Partial<User>) => {
    try {
        const db = getDb();

        if (userData.cart) {
            await productExists(userData.cart);
        }
        
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: userData }
        );
        if (result.matchedCount === 0) {
            throw new Error("Utilisateur non trouvé");
        }
        return { message: "Utilisateur mis à jour avec succès" };
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la mise à jour de l'utilisateur");
    }
};

export const patchCart = async (id: string, cart: CartItem[]) => {
    try {
        const db = getDb();

        if (cart) {
            await productExists(cart);
        }

        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: { cart } }
        );
        if (result.matchedCount === 0) {
            throw new Error("Utilisateur non trouvé");
        }
        return { message: "Panier mis à jour avec succès" };
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la mise à jour du panier de l'utilisateur");
    }
};

// DELETE
export const deleteOneUser = async (id: string) => {
    try {
        const db = getDb();
        const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            throw new Error("Utilisateur non trouvé");
        }
        return { message: "Utilisateur supprimé avec succès" };
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la suppression de l'utilisateur");
    }
};

// UTILS
async function productExists(cart: CartItem[]): Promise<void> {
    for (const item of cart) {
        await findOneProduct(item.productId);
    }
}