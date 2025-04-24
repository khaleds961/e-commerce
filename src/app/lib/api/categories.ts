import { _axios, _axiosServer } from "@/app/lib/axios";

export const GET_CATEGORIES = async (): Promise<Category[]> => {
    try {
        const response = await _axios.get("/categories");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        throw error;
    }
};


