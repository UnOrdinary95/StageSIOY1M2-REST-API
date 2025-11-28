import app from "./app.js";
import { connectDb } from "./config/db.js";
import { PORT } from "./constants.js";
import { logger } from "./utils/loggerUtils.js";

try {
    await connectDb();
    logger.info(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
    logger.info(`Accès à la documentation sur http://localhost:${PORT}/docs`);
    app.listen(PORT);
} catch (err) {
    logger.error('DB Connection', err);
    process.exit(1);
}
