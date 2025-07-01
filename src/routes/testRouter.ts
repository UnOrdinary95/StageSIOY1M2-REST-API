import { Router } from "express";
import { sayHello } from "../controllers/testController";

const testRouter = Router();

testRouter.get("/", sayHello);

export default testRouter;