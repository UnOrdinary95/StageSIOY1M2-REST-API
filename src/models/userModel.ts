import { getDb } from "../config/db";
import { ObjectId } from "mongodb";

interface User {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
}

const COLLECTION_NAME = "User";

// CREATE
export const insertOneUser = async (user: User) => {
    try {
        const db = getDb();
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