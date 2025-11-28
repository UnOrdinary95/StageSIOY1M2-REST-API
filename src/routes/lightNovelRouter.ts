import { Router } from "express";
import { getLightNovels, getLightNovelById, deleteLightNovelById, createLightNovel, updateLightNovelById } from "../controllers/lightNovelController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const lightNovelRouter = Router();

// CREATE
lightNovelRouter.post("/", authMiddleware, createLightNovel);

// READ
lightNovelRouter.get("/", getLightNovels);
lightNovelRouter.get("/:id", getLightNovelById);

// UPDATE
lightNovelRouter.put("/:id", authMiddleware, updateLightNovelById);

// DELETE
lightNovelRouter.delete("/:id", authMiddleware, deleteLightNovelById);

export default lightNovelRouter;
