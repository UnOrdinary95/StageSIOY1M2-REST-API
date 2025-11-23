import { ObjectId } from "mongodb";

// Type pour l'API (avec string)
export interface Product {
    _id?: string;
    name: string;
    price: number;
    inStock: boolean;
    description: string;
    path: string;
}

// Type interne pour MongoDB (avec ObjectId)
export interface ProductDB extends Omit<Product, '_id'> {
    _id?: ObjectId;
}