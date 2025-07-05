import { ObjectId } from "mongodb";

export interface Product {
    _id?: ObjectId;
    name: string;
    price: number;
    inStock: boolean;
    description?: string;
    path: string;
}