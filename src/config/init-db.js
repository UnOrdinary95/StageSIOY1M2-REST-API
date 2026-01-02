db = db.getSiblingDB("admin");

// Crée l'utilisateur root si n'existe pas
if (!db.getUser("admin")) {
    db.createUser({
        user: "admin",
        pwd: process.env.MONGO_PASSWORD || "changeme",
        roles: [{ role: "root", db: "admin" }],
    });
    print("Admin user created successfully");
}

// Bascule sur la base de données "novelya"
db = db.getSiblingDB("novelya");

// Crée si ils n'existent pas déjà
db.createCollection("LightNovel");
db.createCollection("User");

// Création d'un index unique sur le champ "email" de la collection "User"
db.User.createIndex({ email: 1 }, { unique: true });

// Création d'un index sur le champ "genres" de la collection "LightNovel" (pour les recherches par genre)
db.LightNovel.createIndex({ genres: 1 });
