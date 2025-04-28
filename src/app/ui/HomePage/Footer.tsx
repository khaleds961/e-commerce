'use client'
import { useSiteProperties } from "@/app/store/siteProperties"
export default function Footer() {
    const { backgroundColor, textColor } = useSiteProperties();
    return (
        <div className="py-2 px-2 md:px-[40px]" style={{ backgroundColor: backgroundColor, color: textColor }}>
            <h1>Footer</h1>
        </div>
    )
}
