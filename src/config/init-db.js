db = db.getSiblingDB("novelya"); // Bascule sur la base de données "novelya"

// Crée si ils n'existent pas déjà
db.createCollection("LightNovel");
db.createCollection("User");

// Création d'un index unique sur le champ "email" de la collection "User"
db.User.createIndex({ email: 1 }, { unique: true });
