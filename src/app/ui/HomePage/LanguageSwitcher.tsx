
import Link from 'next/link';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
    const locale = useLocale(); // Get current locale
    const router = useRouter();
    const pathname = usePathname();
    // Define the opposite language
    const targetLocale = locale === 'en' ? 'ar' : 'en';

    const switchLanguage = () => {
        router.push(pathname, { locale: targetLocale });
    };

    return (
        <button
            onClick={switchLanguage}
            className="text-white px-3 py-1 cursor-pointer text-lg hover:text-gray-300">
            {locale === 'en' ? 'العربية' : 'English'}
        </button>
    );
}