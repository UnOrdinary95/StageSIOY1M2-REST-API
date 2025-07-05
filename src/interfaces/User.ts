import { ObjectId } from "mongodb";
import { CartItem } from "./CartItem";
import { PurchaseHistoryItem } from "./PurchaseHistoryItem";
import { WishlistItem } from "./WishlistItem";

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