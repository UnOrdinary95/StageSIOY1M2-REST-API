import { Router } from "express";
import { registerUser } from "../utils/registrationUtils";
import { loginUser } from "../utils/authentificationUtils";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;