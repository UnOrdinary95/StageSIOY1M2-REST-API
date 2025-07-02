import { Request, Response } from "express";
import { deleteOneUser, findAllUsers, findOneUser, insertOneUser, updateOneUser } from "../models/userModel";

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