import { Router } from "express";
import { createUser, deleteUserById, getUserById, getUsers, updateUserById } from "../controllers/userController";

const userRouter = Router();

// CREATE
userRouter.post("/", createUser);

// READ
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);

// UPDATE
userRouter.put("/:id", updateUserById);

// DELETE
userRouter.delete("/:id", deleteUserById);

export default userRouter;