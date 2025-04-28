'use client'
import { formatProductName } from "@/app/utils/formatProductName";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Categories({ categories }: { categories: Category[] }) {
  const t = useTranslations('HomePage')
  return (
    <>
      {categories && categories.length > 0 && (
        <>
          <h1 className="text-xl md:text-2xl font-bold">{t('categoriesTitle')}</h1>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 w-full mt-5">
            {categories.map((category) => (
              <div className="cursor-pointer flex flex-col items-center justify-center hover:scale-105 transition-all duration-300" key={category.id}>
                <div className="bg-[#F7F8F7] rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex flex-col items-center justify-center" key={category.id}>
                  <Image src='/images/perfume-product.png'
                    alt={category.name}
                    width={100} height={100}
                    className="w-3/4 h-3/4 object-contain"
                  />
                </div>
                <h2 className="capitalize mt-1 sm:mt-2 md:mt-3
                               text-xs sm:text-sm md:text-base
                               text-center font-medium
                               w-full max-w-[120px]">
                  {formatProductName(category.name)}
                </h2>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
