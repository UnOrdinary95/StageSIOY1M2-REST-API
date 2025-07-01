import express from "express";
import cors from "cors";
import testRouter from "./routes/testRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/test", testRouter);

export default app;