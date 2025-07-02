import { ObjectId } from "mongodb";
import { CartItem } from "./CartItem";
import { PurchaseHistoryItem } from "./PurchaseHistoryItem";

export interface User {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
    cart?: CartItem[];
    purchaseHistory?: PurchaseHistoryItem[];
}