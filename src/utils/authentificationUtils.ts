import { Request, Response } from "express";
import { getDb } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenPayload } from "../interfaces/TokenPayload";

dotenv.config();

const COLLECTION_NAME = "User";
const JWT_SECRET = process.env.JWT_SECRET || "";

export const connect = async (email: string, password: string) => {
    const db = getDb();
    const user = await db.collection(COLLECTION_NAME).findOne({ email });

    if (!user) {
        throw new Error("Identifiants invalides");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Identifiants invalides");
    }

    const payload: TokenPayload = {
        userId: user._id?.toString(),
        email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    return { token, userId: user._id?.toString(), email: user.email };
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ success: false, message: "Email et mot de passe sont requis" });
        return;
    }

    try {
        const result = await connect(email, password);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        res.status(401).json({ success: false, message: error instanceof Error ? error.message : "Erreur inconnue lors de la connexion" });
    }
};