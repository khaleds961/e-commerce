import { notFound } from "next/navigation"
import {  GET_PRODUCT_BY_SLUG } from "@/app/lib/api/products"
import ProductDetails from "@/app/ui/Products/ProductDetails"

export default async function ProductPage({params}: {params: {slug: string}}) {

    const {slug} = await params;
    const product = await GET_PRODUCT_BY_SLUG(slug);
    console.log(product);
    if (!product) {
        notFound();
    }

    return (
        <main className="container mx-auto px-4 py-8 mt-[50px]">
            <ProductDetails product={product} />
        </main>
    )
}
