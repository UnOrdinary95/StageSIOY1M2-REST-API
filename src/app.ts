import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import YAML from "yamljs";

import testRouter from "./routes/testRouter.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load("src/docs/swagger.yaml");
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/test", testRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/", authRouter);

export default app;