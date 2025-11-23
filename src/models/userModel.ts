import { getDb } from "../config/db.js";
import { ObjectId } from "mongodb";
import { User, UserDB } from "../interfaces/User.js";
import { CartItem } from "../interfaces/CartItem.js";
import { PurchaseHistoryItem } from "../interfaces/PurchaseHistoryItem.js";
import { findOneProduct, productExists } from "./productModel.js";
import { convertObjectIdToUserIdStr, convertUserIdStrToObjectId } from "../utils/userUtils.js";

const COLLECTION_NAME = "User";

// CREATE
export const insertOneUser = async (user: User): Promise<User> => {
    try {
        const db = getDb()
        const userWithObjectId = convertUserIdStrToObjectId(user);
        const result = await db.collection(COLLECTION_NAME).insertOne(userWithObjectId);
        return { ...user, _id: result.insertedId.toString() };
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la création de l'utilisateur");
    }
};

// READ
export const findAllUsers = async (): Promise<User[]> => {
    try {
        const db = getDb();
        const users = await db.collection<UserDB>(COLLECTION_NAME).find().toArray();
        return users.map(user => convertObjectIdToUserIdStr(user));
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la récupération des utilisateurs");
    }
};

export const findOneUser = async (id: string): Promise<User> => {
    try {
        const db = getDb();
        const user = await db.collection<UserDB>(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }
        return convertObjectIdToUserIdStr(user);
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
};

// UPDATE
export const updateOneUser = async (id: string, userData: Partial<User>): Promise<{ message: string }> => {
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

export const patchCart = async (idUser: string, idProduct: string): Promise<{ message: string }> => {
    try {
        const db = getDb();
        const user = await findOneUser(idUser);
        await findOneProduct(idProduct);

        let updatedCart: CartItem[] = user.cart ? [...user.cart] : [];
        let added = true;

        if (user.cart?.some(item => item.productId === idProduct)) {
            updatedCart = updatedCart.filter(item => item.productId !== idProduct);
            added = false;
        } else {
            updatedCart.push({ productId: idProduct, quantity: 1 });
        }

        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(idUser) },
            { $set: { cart: updatedCart } }
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

export const patchPurchaseHistory = async (id: string, cart: CartItem[]): Promise<{ message: string }> => {
    try {
        const db = getDb();

        const user = await findOneUser(id);

        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        let updatedHistory: PurchaseHistoryItem[] = user.purchaseHistory ? [...user.purchaseHistory] : [];
        updatedHistory.push({ cart, purchaseDate: new Date() });

        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: { purchaseHistory: updatedHistory } }
        );

        if (result.matchedCount === 0) throw new Error("Utilisateur non trouvé");

        // TODO: MAJ du panier de l'utilisateur à un tableau vide

        return { message: "Historique d'achats mis à jour avec succès" };
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la mise à jour de l'historique d'achats de l'utilisateur");
    }
};

export const patchWishlist = async (id: string, productIdBody: string): Promise<{ message: string }> => {
    try {
        const db = getDb();
        const user = await findOneUser(id);
        await findOneProduct(productIdBody);

        let updatedWishlist = user.wishlist ? [...user.wishlist] : [];
        let added = true;

        if (user.wishlist?.some(productId => productId === productIdBody)) {
            updatedWishlist = updatedWishlist.filter(productId => productId !== productIdBody);
            added = false;
        } else {
            updatedWishlist.push(productIdBody);
        }

        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: { wishlist: updatedWishlist } }
        );

        if (result.matchedCount === 0) {
            throw new Error("Utilisateur non trouvé");
        }

        if (!added) {
            return { message: "Produit retiré de la liste de souhaits" };
        }

        return { message: "Liste de souhaits mise à jour avec succès" };
    } catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la mise à jour de la liste de souhaits de l'utilisateur");
    }
};


// DELETE
export const deleteOneUser = async (id: string): Promise<{ message: string }> => {
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
