import ProductsSlider from "@/app/ui/HomePage/ProductsSlider";
import { GET_PRODUCTS } from "../lib/api/products";

export default async function Products() {
    const products = await GET_PRODUCTS();
    const limitedProducts = products.slice(0, 20);
    console.log({limitedProducts});
    
    return (
        <div className="mt-10">
            <h1 className="text-2xl font-bold">Today's Best Deals</h1>
            <ProductsSlider products={limitedProducts} />
        </div>
    )
}
