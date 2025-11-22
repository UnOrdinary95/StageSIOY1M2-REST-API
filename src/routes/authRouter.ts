import { Router } from "express";
import { registerUser } from "../utils/registrationUtils.js";
import { loginUser } from "../utils/authentificationUtils.js";


const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;