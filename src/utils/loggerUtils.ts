import { isProd } from "../constants.js";

export const logger = {
    error: (context: string, error: any) => {
        if (!isProd) {
            console.error(`[${context}] Error:`, error);
        }
    },
    info: (message: string) => {
        if (!isProd) {
            console.log(`[INFO] ${message}`);
        }
    }
};
