import { GET_CATEGORY_BY_SLUG } from "@/app/lib/api/categories";
import { GET_PRODUCTS_BY_CATEGORY } from "@/app/lib/api/products";
import CategoriesFilter from "@/app/ui/Categories/CategoriesFilter";
import Sorting from "@/app/ui/Categories/Sorting";
import { LoadingProvider } from '@/app/context/LoadingContext';
import Pagination from "@/app/components/Pagination";

export default async function Categories({ params, searchParams }: { params: { slug: string }, searchParams: { sort: string, display: any, price_min: any, price_max: any, page: any } }) {

    const { slug = 'clothes' } = await params;
    const category = await GET_CATEGORY_BY_SLUG(slug);
    const sort = await searchParams.sort;
    const display = await searchParams.display;
    const price_min = await searchParams.price_min;
    const price_max = await searchParams.price_max;
    const page = await searchParams.page;

    const products = await GET_PRODUCTS_BY_CATEGORY(slug, sort, display, price_min, price_max, page);
    const totalProducts = products.length;

    return (
        <main className="mx-auto px-4 py-8 mt-[50px]">
            <LoadingProvider>
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">

                    <div className="hidden md:block bg-white rounded-lg shadow-md p-4 col-span-1">
                        <CategoriesFilter products={products} />
                    </div>

                    <div className="col-span-3">
                        {/* display-sort-count */}
                        <Sorting totalProducts={totalProducts} category={category} products={products} />
                    </div>

                </div>

                {/* Pagination */}
                <Pagination totalProducts={totalProducts} />
            </LoadingProvider>

        </main>
    );
}
