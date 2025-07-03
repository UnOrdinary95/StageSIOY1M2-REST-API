import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token manquant ou mal formé" });
        return;
    }

    const token = authHeader.split(" ")[1]; // Enlève le "Bearer " du début

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded; // C'est le payload du token décodé
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalide ou expiré" });
        return;
    }
};
