import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../interfaces/TokenPayload.js";
import { JWT_SECRET } from "../constants.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token manquant ou mal formé" });
        return;
    }

    // Extraction du token
    // "Bearer xyz123" → ["Bearer", "xyz123"] → "xyz123"
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalide ou expiré" });
        return;
    }
};
