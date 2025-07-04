import { Request, Response } from "express";
import { deleteOneUser, findAllUsers, findOneUser, insertOneUser, patchCart, patchPurchaseHistory, patchWishlist, updateOneUser } from "../models/userModel";
import { CartItem } from "../interfaces/CartItem";

// CREATE
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const newUser = await insertOneUser(user);
        res.status(201).json(newUser);
    } catch (err) {
        console.error("Erreur lors de la création de l'utilisateur :", err);
        res.status(500).json({ error: "Impossible de créer l'utilisateur" });
    }
};

// READ
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await findAllUsers();
        res.status(200).json(users);
    }
    catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err);
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const user = await findOneUser(userId);
        res.status(200).json(user);
    }
    catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
};

// UPDATE
export const updateUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userData = req.body;
    try {
        const updatedUser = await updateOneUser(userId, userData);
        res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
    }
};

export const updateUserCartById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const cart: CartItem[] = req.body.cart;
    try {
        const updatedUser = await patchCart(userId, cart);
        res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error("Erreur lors de la mise à jour du panier de l'utilisateur :", err);
        res.status(500).json({ error: "Erreur lors de la mise à jour du panier de l'utilisateur" });
    }
};

export const updateUserPurchaseHistoryById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const cart: CartItem[] = req.body.cart;
    try {
        const updatedHistory = await patchPurchaseHistory(userId, cart);
        res.status(200).json(updatedHistory);
    }
    catch (err) {
        console.error("Erreur lors de la mise à jour de l'historique d'achats de l'utilisateur :", err);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'historique d'achats de l'utilisateur" });
    }
};

export const updatedWishlistById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const productId = req.body.productId;
    try {
        const updatedWishlist = await patchWishlist(userId, productId);
        res.status(200).json(updatedWishlist);
    }
    catch (err) {
        console.error("Erreur lors de la mise à jour de la wishlist de l'utilisateur :", err);
        res.status(500).json({ error: "Erreur lors de la mise à jour de la wishlist de l'utilisateur" });
    }
};

// DELETE
export const deleteUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const result = await deleteOneUser(userId);
        res.status(200).json(result);
    }
    catch (err) {
        console.error("Erreur lors de la suppression de l'utilisateur :", err);
        res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
    }
};