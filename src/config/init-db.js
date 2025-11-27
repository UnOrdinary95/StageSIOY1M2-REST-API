db = db.getSiblingDB("novelya"); // Bascule sur la base de données "novelya"

// Crée si ils n'existent pas déjà
db.createCollection("LightNovel");
db.createCollection("User");
