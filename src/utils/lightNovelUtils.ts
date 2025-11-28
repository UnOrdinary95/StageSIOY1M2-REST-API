import { ObjectId } from "mongodb";
import { LightNovel, LightNovelDB } from "../interfaces/LightNovel.js";

// Fonction utilitaire pour convertir les champs d'ID string en ObjectId
export const convertLightNovelIdStrToObjectId = (lightNovel: LightNovel): LightNovelDB => {
    return {
        ...lightNovel,
        _id: lightNovel._id ? new ObjectId(lightNovel._id) : undefined
    };
};

// Fonction utilitaire pour convertir les champs d'ID ObjectId en string
export const convertObjectIdToLightNovelIdStr = (lightNovel: LightNovelDB): LightNovel => {
    return {
        ...lightNovel,
        _id: lightNovel._id?.toString()
    };
};