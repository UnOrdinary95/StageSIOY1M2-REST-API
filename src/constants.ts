export const COLLECTIONS = {
    USER: "User",
    LIGHT_NOVEL: "LightNovel",
} as const;

const isProd = process.env.NODE_ENV == "PROD";
if (isProd) {
    console.log("Running in production mode");
}
else {
    console.log("Running in development mode");
}

export const PORT = isProd ? process.env.PORT : 3000;
export const JWT_SECRET = isProd ? process.env.JWT_SECRET : "739t8nBsBaWslYtENddDNKMJV/HF/Tk4ZqhPpD5FwCQ=";
export const URI = isProd ? process.env.MONGODB_URI : "mongodb://admin:password@mongodb:27017/novelya?authSource=admin";
