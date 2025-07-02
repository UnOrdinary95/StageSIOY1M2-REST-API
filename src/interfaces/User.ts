import { ObjectId } from "mongodb";
import { CartItem } from "./CartItem";

export interface User {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
    cart?: CartItem[];
}