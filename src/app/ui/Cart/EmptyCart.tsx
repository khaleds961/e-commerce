import Image from "next/image";
import { useTranslations } from "next-intl";

export default function EmptyCart() {
    const t = useTranslations('Cart');
    return (
        <div className="flex flex-col items-center h-screen">
            <Image src="/images/empty-card.png" alt="empty-cart" width={300} height={300} 
            className="rotate-[-10deg] "  />
            <h1 className="text-2xl font-bold">{t('emptyCart')}</h1>
            <p className="text-gray-500">{t('emptyCartDescription')}</p>
        </div>
    )
}
