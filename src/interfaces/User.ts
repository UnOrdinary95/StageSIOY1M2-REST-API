import { ObjectId } from "mongodb";
import { CartItem } from "./CartItem.js";
import { PurchaseHistoryItem } from "./PurchaseHistoryItem.js";
import { WishlistItem } from "./WishlistItem.js";

export interface User {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    cart: CartItem[];
    purchaseHistory: PurchaseHistoryItem[];
    wishlist: WishlistItem[];
}