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


export const GET_CATEGORY_BY_SLUG = async (slug: string): Promise<Category> => {
    try {
        const response = await _axios.get(`/categories/slug/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch category:", error);
        throw error;
    }
};