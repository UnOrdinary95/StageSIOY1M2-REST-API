import app from "./app";
import dotenv from "dotenv";
import { connectDb } from "./config/db";

dotenv.config();

const PORT: string = process.env.PORT || "3000";

connectDb()
    .then(() => app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)))
    .catch((err) => {
        console.error('Erreur lors de la connexion à MongoDB', err);
        process.exit(1);
    });
