import { Router } from "express";
import { createUser, deleteUserById, getUserById, getUsers, updatedWishlistById, updateUserById, updateUserCartById, updateUserPurchaseHistoryById } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

// CREATE
userRouter.post("/", authMiddleware, createUser);

// READ
userRouter.get("/", authMiddleware, getUsers);
userRouter.get("/:id", authMiddleware, getUserById);

// UPDATE
userRouter.put("/:id", authMiddleware, updateUserById);
userRouter.patch("/:id/cart", authMiddleware, updateUserCartById);
userRouter.patch("/:id/history", authMiddleware, updateUserPurchaseHistoryById);
userRouter.patch("/:id/wishlist", authMiddleware, updatedWishlistById);

// DELETE
userRouter.delete("/:id", authMiddleware, deleteUserById);

export default userRouter;