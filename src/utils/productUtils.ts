import { ObjectId } from "mongodb";
import { Product, ProductDB } from "../interfaces/Product.js";

// Fonction utilitaire pour convertir les champs d'ID string en ObjectId
export const convertProductIdStrToObjectId = (product: Product): ProductDB => {
    return {
        ...product,
        _id: product._id ? new ObjectId(product._id) : undefined
    };
};

// Fonction utilitaire pour convertir les champs d'ID ObjectId en string
export const convertObjectIdToProductIdStr = (product: ProductDB): Product => {
    return {
        ...product,
        _id: product._id?.toString()
    };
};