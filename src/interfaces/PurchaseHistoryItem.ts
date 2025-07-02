import { CartItem } from "./CartItem";

export interface PurchaseHistoryItem {
    cart: CartItem[];
    purchaseDate: Date;
}