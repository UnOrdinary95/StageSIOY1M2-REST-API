import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from 'swagger-ui-express';
import YAML from "yamljs";
import { COVERS_DIR } from "./constants.js";
import multer from "multer";
import { isProd } from "./constants.js";
import cookieParser from "cookie-parser";

import testRouter from "./routes/testRouter.js";
import userRouter from "./routes/userRouter.js";
import lightNovelRouter from "./routes/lightNovelRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(helmet()); // Permet la sécurisation des en-têtes HTTP

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10 // 10 tentatives
});


const origin = isProd ? 'https://novelya.unordinary.dev' : 'http://localhost:4200';
app.use(cors({
    origin: origin,
    credentials: true // Autorise l'envoi des cookies
}));

app.use(express.json()); // Ajoute Content-Type: application/json automatiquement
app.use(cookieParser()); // Parse les cookies

const swaggerDocument = YAML.load("src/docs/swagger.yaml");

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/test", testRouter);
app.use("/users", userRouter);
app.use("/lightnovels", lightNovelRouter);
app.use("/covers", express.static(COVERS_DIR)); // Service de fichiers statiques pour les couvertures
app.use("/", authLimiter, authRouter); // Applique le rate limiter uniquement aux routes d'authentification

// Middleware d'erreur global pour multer et autres
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof multer.MulterError || err.message?.includes("Seuls les fichiers image")) {
        res.status(400).json({ error: err.message });
    } else {
        next(err);
    }
});

export default app;