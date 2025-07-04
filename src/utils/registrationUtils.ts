import { Request, Response } from "express";
import { getDb } from "../config/db";
import bcrypt from "bcrypt";
import { User } from "../interfaces/User";

const COLLECTION_NAME = "User";

const createUser = async (user: User) => {
    try {
        const db = getDb();

        const existingUser = await db.collection(COLLECTION_NAME).findOne({ email: user.email });

        if (existingUser) {
            throw new Error("Email déjà utilisé");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        const newUser = {
            ...user,
            password: hashedPassword,
            isAdmin: false
        };

        const result = await db.collection(COLLECTION_NAME).insertOne(newUser);

        if (!result.insertedId) {
            throw new Error("Erreur lors de la création de l'utilisateur");
        }

        return {
            success: true,
            message: "Utilisateur créé avec succès",
            userId: result.insertedId,
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Erreur inconnue lors de la création de l'utilisateur",
        };
    }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const user: User = req.body;

    if (!user.email || !user.password || !user.name) {
        res.status(400).json({ success: false, message: "Tous les champs sont requis" });
        return;
    }

    try {
        const result = await createUser(user);
        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
        res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
};