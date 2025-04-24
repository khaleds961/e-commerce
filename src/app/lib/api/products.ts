import { _axios, _axiosServer } from "@/app/lib/axios";

export const GET_PRODUCTS = async (): Promise<Product[]> => {
    try {
        const response = await _axios.get("/products");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw error;
    }
}

