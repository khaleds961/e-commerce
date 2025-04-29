import { useTranslations } from 'next-intl';

export default function ProductProperties({ titleKey, properties }: { titleKey: string, properties: any[] }) {
    const t = useTranslations('Product');
    console.log(titleKey);
    
    return (
        <div>
            <h1 className='text-md font-bold my-2'>{t(titleKey)}</h1>
            <div className='flex gap-2'>
                {properties.map((property, index) => (
                <div key={index} className='capitalize w-fit border border-gray-300 rounded-md p-2 hover:bg-[#B9D2E7] hover:text-[#0171DD] cursor-pointer transition-colors'>{property}</div>
                ))}
            </div>
        </div>
    )
}

