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

export const GET_PRODUCT_BY_ID = async(id: number) => {
    try {
        const response = await _axios.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        throw error;
    }
}
