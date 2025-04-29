import { useTranslations } from 'next-intl';
import Searchbar from "@/app/ui/HomePage/Searchbar";
import ScrollAware from '@/app/components/ScrollAware';

export default function Header() {
    const t = useTranslations('HomePage');
    return (
        <ScrollAware className="fixed top-0 left-0 w-full z-50" position="top">
        <header className='w-full bg-white shadow-md'>
            <Searchbar />
        </header>
        </ScrollAware>
    );
}
