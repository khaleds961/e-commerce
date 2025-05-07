import { GET_CATEGORY_BY_SLUG } from "@/app/lib/api/categories";
import { GET_PRODUCTS_BY_CATEGORY } from "@/app/lib/api/products";
import Sorting from "@/app/ui/Categories/Sorting";

export default async function Categories({ params,searchParams }: { params: { slug: string },searchParams: { sort: string, display: any } }) {

    const { slug = 'clothes' } = params;
    const category = await GET_CATEGORY_BY_SLUG(slug);
    const products = await GET_PRODUCTS_BY_CATEGORY(slug,searchParams.sort,searchParams.display);
    const totalProducts = products.length;
    console.log(products);
    console.log({ category });

    return (
        <main className="mx-auto px-4 py-8 mt-[50px]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4 col-span-1">
                    <h2 className="text-lg font-bold">Category FILTERS</h2>
                </div>
                <div className="col-span-3">
                    {/* display-sort-count */}
                    <Sorting totalProducts={totalProducts} category={category} products={products} />
                </div>
            </div>
        </main>
    );
}
