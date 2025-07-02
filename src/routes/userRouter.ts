import { Router } from "express";
import { createUser, deleteUserById, getUserById, getUsers, updatedWishlistById, updateUserById, updateUserCartById, updateUserPurchaseHistoryById } from "../controllers/userController";

const userRouter = Router();

// CREATE
userRouter.post("/", createUser);

// READ
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);

// UPDATE
userRouter.put("/:id", updateUserById);
userRouter.patch("/:id/cart", updateUserCartById);
userRouter.patch("/:id/history", updateUserPurchaseHistoryById);
userRouter.patch("/:id/wishlist", updatedWishlistById);

// DELETE
userRouter.delete("/:id", deleteUserById);

export default userRouter;