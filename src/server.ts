import app from "./app.js";
import { connectDb } from "./config/db.js";
import { PORT } from "./constants.js";

connectDb()
    .then(() => app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`)))
    .catch((err) => {
        console.error('Erreur lors de la connexion à MongoDB', err);
        process.exit(1);
    });
