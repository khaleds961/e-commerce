import { useTranslations } from 'next-intl';
import Searchbar from "@/app/ui/HomePage/Searchbar";

export default function Header() {
    const t = useTranslations('HomePage');
    return (
        <header className="bg-[#BE1C26] py-3 px-[40px] ">
            <Searchbar />
        </header>
    );
}
