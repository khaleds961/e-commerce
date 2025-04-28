'use client'
import { useSiteProperties } from '@/app/store/siteProperties';
import { fontMap } from '@/app/utils/fonts';

export default function Wrapper({ children }: { children: React.ReactNode }) {

    const siteProperties = useSiteProperties();
    const selectedFont = fontMap[siteProperties.fontFamily as keyof typeof fontMap] || fontMap['Poppins'];
    return (
        <div className={selectedFont.className}>
            {children}
        </div>
    )
}
