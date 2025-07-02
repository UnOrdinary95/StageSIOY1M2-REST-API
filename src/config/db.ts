import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const URI: string = process.env.MONGO_URI || "";
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

export const getDb = (): Db => {
    if (!db) throw new Error("Base de données non connectée");
    return db;
};
