import { notFound } from "next/navigation"
import { GET_PRODUCT_BY_ID } from "@/app/lib/api/products"
import ProductDetails from "@/app/ui/Products/ProductDetails"

export default async function ProductPage({params}: {params: {id: number}}) {
    const product = await GET_PRODUCT_BY_ID(params.id);
    if (!product) {
        notFound();
    }

    return (
        <main className="container mx-auto px-4 py-8 mt-[50px]">
            <ProductDetails product={product} />
        </main>
    )
}
