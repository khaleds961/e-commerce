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

export const GET_PRODUCT_BY_SLUG = async (slug: string) => {
    try {
        const response = await _axios.get(`/products/slug/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        throw error;
    }
}

export const SEARCH_PRODUCTS = async (search: string) => {
    try {
        const response = await _axios.get(`/products/?title=${search}`);
        return response;
    } catch (error) {
        console.error("Failed to search products:", error);
        throw error;
    }
}

export const GET_PRODUCTS_BY_CATEGORY = async (categorySlug: string, sort?: string, limit?: any, price_min?: any, price_max?: any) => {
    try {
        const params: Record<string, string> = {
            categorySlug
        };
        if (sort) params.sort = sort;
        if (limit) params.limit = limit;
        if (price_min) params.price_min = price_min;
        if (price_max) params.price_max = price_max;

        const queryString = Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        const response = await _axios.get(`/products/?${queryString}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch products by category:", error);
        throw error;
    }
}