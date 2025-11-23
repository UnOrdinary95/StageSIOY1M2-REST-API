import { ObjectId } from "mongodb";
import { User, UserDB } from "../interfaces/User.js";

// Fonction utilitaire pour convertir les champs d'ID string en ObjectId
export const convertUserIdStrToObjectId = (user: User): UserDB => {
    return {
        ...user,
        _id: user._id ? new ObjectId(user._id) : undefined
    }
};

// Fonction utilitaire pour convertir les champs d'ID ObjectId en string
export const convertObjectIdToUserIdStr = (user: UserDB): User => {
    return {
        ...user,
        _id: user._id?.toString()
    }
};
