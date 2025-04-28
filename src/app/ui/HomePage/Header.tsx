import { useTranslations } from 'next-intl';
import Searchbar from "@/app/ui/HomePage/Searchbar";

export default function Header() {
    const t = useTranslations('HomePage');
    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out transform shadow-lg scale-105'
        }`}>
            <Searchbar />
        </header>
    );
}
