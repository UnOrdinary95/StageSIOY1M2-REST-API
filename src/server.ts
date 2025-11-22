import app from "./app.js";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

dotenv.config();

const PORT: string = process.env.PORT || "3000";

connectDb()
    .then(() => app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)))
    .catch((err) => {
        console.error('Erreur lors de la connexion à MongoDB', err);
        process.exit(1);
    });
