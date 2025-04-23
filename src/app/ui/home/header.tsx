import { useTranslations } from 'next-intl';
import Searchbar from "./searchbar";

export default function Header() {
    const t = useTranslations('HomePage');
    return (
        <header className="bg-[#BE1C26] py-3 px-[40px] ">
            <Searchbar />
        </header>
    );
}
