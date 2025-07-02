import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import YAML from "yamljs";
import testRouter from "./routes/testRouter";
import userRouter from "./routes/userRouter";

const app = express();

app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load("src/docs/swagger.yaml");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/test", testRouter);
app.use("/users", userRouter);

export default app;