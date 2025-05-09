import ProductsSlider from "@/app/ui/template-2/ProductsSlider";
import { useTranslations } from "next-intl";

export default async function Products({ titleKey, products }: { titleKey: string, products: Product[] }) {
    const t = useTranslations('HomePage');

    return (
        <div className="mt-10 w-full mx-auto items-center justify-center ">
            <div>
            <ProductsSlider products={products} />
            </div>
            
        </div>
    );
}