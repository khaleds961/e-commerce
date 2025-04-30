import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ProductProperties({ titleKey, properties, onSelect }: { titleKey: string, properties: any[], onSelect: (property: string) => void }) {
    const t = useTranslations('Product');
    const [selectedProperty, setSelectedProperty] = useState<string>('');

    const handleSelect = (property: string) => {
        setSelectedProperty(property);
        onSelect(property);
    }
    
    return (
        <div>
            <h1 className='text-md font-bold my-2'>{t(titleKey)}</h1>
            <div className='flex gap-2'>
                {properties.map((property, index) => (
                    <div key={index} className={`capitalize w-fit border border-gray-300 rounded-md p-2 hover:bg-[#B9D2E7] hover:text-[#0171DD] cursor-pointer transition-colors 
                ${selectedProperty === property ? 'bg-[#B9D2E7] text-[#0171DD]' : ''}`}
                        onClick={() => handleSelect(property)}>{property}</div>
                ))}
            </div>
        </div>
    )
}

