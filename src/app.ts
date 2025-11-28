import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from 'swagger-ui-express';
import YAML from "yamljs";

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

app.use(cors());
// app.use(cors({origin: 'https://example.com'})); 
app.use(express.json());

const swaggerDocument = YAML.load("src/docs/swagger.yaml");

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/test", testRouter);
app.use("/users", userRouter);
app.use("/lightnovels", lightNovelRouter);
app.use("/", authLimiter, authRouter); // Applique le rate limiter uniquement aux routes d'authentification

export default app;