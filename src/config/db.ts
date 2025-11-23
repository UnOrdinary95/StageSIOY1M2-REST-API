import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
import { URI } from "../constants.js";

dotenv.config();
if (!URI) {
    console.error("Erreur : URI MongoDB manquant !");
    process.exit(1);
}

const client = new MongoClient(URI);
let db: Db | null = null;

export const connectDb = async () => {
    try {
        await client.connect();
        db = client.db();
        console.log("MongoDB connecté");
    } catch (err) {
        console.error("Connexion échouée:", err);
        process.exit(1);
    }
};

// Singleton pour obtenir l'instance de la base de données
export const getDb = (): Db => {
    if (!db) throw new Error("Base de données non connectée");
    return db;
};
