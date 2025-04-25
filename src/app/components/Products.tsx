import ProductsSlider from "@/app/ui/HomePage/ProductsSlider";
import { useTranslations } from "next-intl";

export default async function Products({ titleKey, products }: { titleKey: string, products: Product[] }) {

    const t = useTranslations('HomePage');

    return (
        <div className="mt-10">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{t(`${titleKey}`)}</h1>
                <button className="w-fit whitespace-nowrap cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md p-2">
                    {t('viewAll')}
                </button>
            </div>
            <ProductsSlider products={products} />
        </div>
    )
}
