import { getDb } from "../config/db.js";
import { ObjectId } from "mongodb";
import { User, UserDB } from "../interfaces/User.js";
import { CartItem } from "../interfaces/CartItem.js";
import { PurchaseHistoryItem } from "../interfaces/PurchaseHistoryItem.js";
import { findOneProduct, productExists } from "./productModel.js";
import { convertObjectIdToUserIdStr, convertUserIdStrToObjectId } from "../utils/userUtils.js";
import { COLLECTIONS } from "../constants.js";

// CREATE
export const insertOneUser = async (user: User): Promise<User> => {
    try {
        const db = getDb();
        const userWithObjectId = convertUserIdStrToObjectId(user);
        const result = await db.collection(COLLECTIONS.USER).insertOne(userWithObjectId);
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
        const users = await db.collection<UserDB>(COLLECTIONS.USER).find().toArray();
        return users.map(user => convertObjectIdToUserIdStr(user));
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la récupération des utilisateurs");
    }
};

export const findOneUser = async (userID: string): Promise<User> => {
    try {
        const db = getDb();
        const user = await db.collection<UserDB>(COLLECTIONS.USER).findOne({ _id: new ObjectId(userID) });
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
export const updateOneUser = async (userID: string, userData: Partial<User>): Promise<User> => {
    try {
        const db = getDb();

        // Empêche la modification de l'_id
        const { _id, ...safeData } = userData;

        if (Object.keys(safeData).length === 0) {
            throw new Error("Aucune donnée à mettre à jour");
        }

        if (safeData.cart) {
            await productExists(safeData.cart);
        }

        const result = await db.collection(COLLECTIONS.USER).updateOne(
            { _id: new ObjectId(userID) },
            { $set: safeData }
        );
        if (result.matchedCount === 0) {
            throw new Error("Utilisateur non trouvé");
        }
        return await findOneUser(userID);
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la mise à jour de l'utilisateur");
    }
};

export const patchCart = async (userID: string, productID: string): Promise<CartItem[]> => {
    try {
        const db = getDb();
        const user = await findOneUser(userID);
        await findOneProduct(productID);

        let updatedCart: CartItem[] = user.cart ? [...user.cart] : [];

        if (user.cart?.some(item => item.productId === productID)) {
            updatedCart = updatedCart.filter(item => item.productId !== productID);
        } else {
            updatedCart.push({ productId: productID, quantity: 1 });
        }

        const result = await db.collection(COLLECTIONS.USER).updateOne(
            { _id: new ObjectId(userID) },
            { $set: { cart: updatedCart } }
        );

        if (result.matchedCount === 0) {
            throw new Error("Utilisateur non trouvé");
        }

        return updatedCart;
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la mise à jour du panier de l'utilisateur");
    }
};

export const clearCart = async (userID: string): Promise<void> => {
    try {
        const db = getDb();

        const result = await db.collection(COLLECTIONS.USER).updateOne(
            { _id: new ObjectId(userID) },
            { $set: { cart: [] } }
        );

        if (result.matchedCount === 0) {
            throw new Error("Utilisateur non trouvé");
        }
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la vidange du panier de l'utilisateur");
    }
};

export const patchPurchaseHistory = async (userID: string, cart: CartItem[]): Promise<PurchaseHistoryItem[]> => {
    try {
        const db = getDb();

        if (!cart || cart.length === 0) {
            throw new Error("Le panier ne peut pas être vide");
        }

        const user = await findOneUser(userID);

        let updatedHistory: PurchaseHistoryItem[] = user.purchaseHistory ? [...user.purchaseHistory] : [];
        updatedHistory.push({ cart, purchaseDate: new Date() });

        const result = await db.collection(COLLECTIONS.USER).updateOne(
            { _id: new ObjectId(userID) },
            { $set: { purchaseHistory: updatedHistory } }
        );

        if (result.matchedCount === 0) {
            throw new Error("Utilisateur non trouvé");
        }

        await clearCart(userID);

        return updatedHistory;
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la mise à jour de l'historique d'achats de l'utilisateur");
    }
};

export const patchWishlist = async (userID: string, productID: string): Promise<string[]> => {
    try {
        const db = getDb();
        const user = await findOneUser(userID);
        await findOneProduct(productID);

        let updatedWishlist = user.wishlist ? [...user.wishlist] : [];

        if (user.wishlist?.some(productId => productId === productID)) {
            updatedWishlist = updatedWishlist.filter(productId => productId !== productID);
        } else {
            updatedWishlist.push(productID);
        }

        const result = await db.collection(COLLECTIONS.USER).updateOne(
            { _id: new ObjectId(userID) },
            { $set: { wishlist: updatedWishlist } }
        );

        if (result.matchedCount === 0) {
            throw new Error("Utilisateur non trouvé");
        }

        return updatedWishlist;
    } catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la mise à jour de la liste de souhaits de l'utilisateur");
    }
};


// DELETE
export const deleteOneUser = async (userID: string): Promise<void> => {
    try {
        const db = getDb();
        const result = await db.collection(COLLECTIONS.USER).deleteOne({ _id: new ObjectId(userID) });
        if (result.deletedCount === 0) {
            throw new Error("Utilisateur non trouvé");
        }
    }
    catch (err) {
        console.error("Erreur : ", err);
        throw new Error("Erreur lors de la suppression de l'utilisateur");
    }
};
