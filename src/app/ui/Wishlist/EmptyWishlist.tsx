import Image from "next/image";
import { useTranslations } from "next-intl";

export default function EmptyWishlist() {
    const t = useTranslations('Wishlist');
    return (
        <div className="flex flex-col items-center h-screen ">
            <Image src="/images/wishlist.png" alt="empty-cart" width={300} height={300} 
            className="rotate-[-10deg] mb-4"  />
            <h1 className="text-2xl font-bold text-gray-500">{t('emptyWishlist')} !!</h1>
        </div>
    )
}
